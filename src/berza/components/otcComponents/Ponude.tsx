import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, TextField
} from '@mui/material';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getMe } from 'utils/getMe';
import { makeGetRequest, makeApiRequest } from 'utils/apiRequest';
import { Account, BankRoutes, Employee, UserRoutes } from "utils/types";

const ButtonTab = styled(Button)`
  background-color: #AC190C !important;
  color: white !important;
  border-color: #EF2C1A !important;
  &:hover {
    background-color: #EF2C1A !important;
  }
`;

interface Ponuda {
  stockId: number;
  ticker: string;
  quantity: number;
}

interface NewPonuda {
  ticker: string;
  quantity: number;
}

interface Ticker {
  id: number;
  ticker: string;
  quantity: number;
  currentBid: number;
  currentAsk: number;
  publicQuantity: number;
}

const Ponude: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openOffer, setOpenOffer] = useState(false);
  const [newPonuda, setNewPonuda] = useState<NewPonuda>({ ticker: '', quantity: 0 });
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  const [otcData, setOtcData] = useState<Ponuda[]>([]);
  const [priceOffered, setPriceOffered] = useState(0);
  const [selectedPonuda, setSelectedPonuda] = useState<Ponuda | null>(null);
  const [offerQuantity, setOfferQuantity] = useState(0);
  const [userId, setId] = useState(0);

  useEffect(() => {
    let prim = 0;
    const fetchTickers = async () => {
      const me = getMe();
      if (!me) return;

      if (me.permission !== 0) {
        const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;
        setId(worker.firmaId);
        prim = worker.firmaId;
      } else {
        setId(me.id);
        prim = me.id;
      }

      try {
        const response = await makeGetRequest(`/user-stocks/${prim}`);
        if (!response) {
          return;
        }
        setTickers(response.map((ticker: Ticker) => ({
          id: ticker.id,
          ticker: ticker.ticker,
          quantity: ticker.quantity,
          currentBid: ticker.currentBid,
          currentAsk: ticker.currentAsk
        })));
      } catch (error) {
        console.error('Error fetching tickers:', error);
      }
    };

    const fetchAllPublicOTC = async () => {
      try {
        const response = await makeGetRequest(`/otc/all-public-otc/${prim}`);
        if (!response) {
          return;
        }
        setOtcData(response);
      } catch (error) {
        console.error('Error fetching all public OTC data:', error);
      }
    };

    fetchTickers();
    // fetchAllPublicOTC();
  }, []);

  useEffect(() => {
    const fetchAllPublicOTC = async () => {
      try {
        const response = await makeGetRequest(`/otc/all-public-otc/${userId}`);
        if (!response) {
          return;
        }
        setOtcData(response);
      } catch (error) {
        console.error('Error fetching all public OTC data:', error);
      }
    };

    fetchAllPublicOTC();
  }, [userId])

  const handleOpen = (ticker: string = '') => {
    setNewPonuda({ ticker, quantity: 0 });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTicker(null);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const selectedTicker = tickers.find(ticker => ticker.ticker === e.target.value);
    setNewPonuda({ ticker: e.target.value, quantity: 0 });
    setSelectedTicker(selectedTicker || null);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPonuda(prevState => ({
      ...prevState,
      quantity: Math.min(Number(e.target.value), selectedTicker ? selectedTicker.quantity : 0)
    }));
  };

  const handleOfferQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferQuantity(Number(e.target.value));
  };

  const handleSubmit = async () => {
    try {
      if (!selectedTicker || !getMe()?.id || newPonuda.quantity <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Greška',
          text: 'Nisu svi podaci ispravno uneseni.'
        });
        return;
      }

      const data = {
        userId: userId,
        stockId: selectedTicker.id,
        quantity: newPonuda.quantity,
      };

      const response = await makeApiRequest(`/otc/place-otc-public`, "POST", data);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Uspeh',
          text: 'Ponuda je uspešno postavljena.'
        }).then(() => {
          window.location.reload();  // Refresh the page after successful submission
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Greška',
          text: 'Neuspešno postavljanje ponude.'
        });
      }

      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Greška',
        text: 'Došlo je do greške prilikom postavljanja ponude.'
      });
      console.error('Error placing offer:', error);
    }
  };

  const handleOpenOfferDialog = (ponuda: Ponuda) => {
    setSelectedPonuda(ponuda);
    setOfferQuantity(ponuda.quantity); // Set the default offer quantity to the selected ponuda's quantity
    setOpenOffer(true);
  };

  const handleCloseOfferDialog = () => {
    setOpenOffer(false);
    setPriceOffered(0);
    setSelectedPonuda(null);
    setOfferQuantity(0);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceOffered(Number(e.target.value));
  };

  const handleMakeOffer = async () => {
    if (!selectedPonuda || offerQuantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Greška',
        text: 'Nisu svi podaci ispravno uneseni.'
      });
      console.error('No selected ponuda or invalid offer quantity');
      return;
    }

    const data = {
      stockId: selectedPonuda.stockId,
      buyerId: userId,
      ticker: selectedPonuda.ticker,
      quantity: offerQuantity,
      priceOffered: priceOffered
    };

    try {
      const response = await makeApiRequest(`/otc/make-offer-for-otc`, "PUT", data);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Uspeh',
          text: 'Ponuda je uspešno postavljena.'
        }).then(() => {
          window.location.reload();  // Refresh the page after successful submission
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Greška',
          text: 'Neuspešno postavljanje ponude.'
        });
      }

      handleCloseOfferDialog();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Greška',
        text: 'Došlo je do greške prilikom postavljanja ponude.'
      });
      console.error('Error making offer:', error);
    }
  };

  return (
    <div>
      <ButtonTab id="dodajponudu" variant="contained" color="primary" onClick={() => handleOpen()} style={{ margin: '20px 0' }}>
        Dodaj ponudu
      </ButtonTab>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Količina</TableCell>
              <TableCell>Akcija</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otcData.map((ponuda, index) => (
              <TableRow key={ponuda.stockId}>
                <TableCell>{ponuda.ticker}</TableCell>
                <TableCell>{ponuda.quantity}</TableCell>
                <TableCell>
                  <ButtonTab id={`postaviponudu-${index}`}
                    variant="contained"
                    onClick={() => handleOpenOfferDialog(ponuda)}
                    style={{ marginRight: '10px' }}
                  >
                    Postavi ponudu
                  </ButtonTab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj Ponudu</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="ticker-label">Ticker</InputLabel>
            <Select
              id="ticker"
              labelId="ticker-label"
              name="ticker"
              value={newPonuda.ticker}
              onChange={handleSelectChange}
            >
              {tickers.map((ticker, index) => (
                <MenuItem data-testid={`ticker-${index}`} key={ticker.ticker} value={ticker.ticker}>
                  {ticker.ticker}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedTicker && (
            <div style={{ marginTop: '20px' }}>
              <p>Ticker: {selectedTicker.ticker}</p>
              <p>Quantity: {selectedTicker.quantity}</p>
              <p>Public Quantity: {selectedTicker.publicQuantity}</p>
              <p>Current Bid: {selectedTicker.currentBid}</p>
              <p>Current Ask: {selectedTicker.currentAsk}</p>
              <TextField
                id="amount"
                margin="dense"
                label="Količina"
                type="number"
                fullWidth
                value={newPonuda.quantity}
                onChange={handleQuantityChange}
                inputProps={{
                  min: 0,
                  max: selectedTicker.quantity,
                  step: 1,
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonTab onClick={handleClose} color="secondary">
            Odustani
          </ButtonTab>
          <ButtonTab id="submit" onClick={handleSubmit} color="primary">
            Napravi
          </ButtonTab>
        </DialogActions>
      </Dialog>

      <Dialog open={openOffer} onClose={handleCloseOfferDialog}>
        <DialogTitle>Unesi cenu ponude</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="price"
            margin="dense"
            label="Cena"
            type="number"
            fullWidth
            value={priceOffered}
            onChange={handlePriceChange}
          />
          <TextField
            id="quantity"
            margin="dense"
            label="Količina"
            type="number"
            fullWidth
            value={offerQuantity}
            onChange={handleOfferQuantityChange}
            inputProps={{
              min: 0,
              max: selectedPonuda ? selectedPonuda.quantity : 0,
              step: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <ButtonTab onClick={handleCloseOfferDialog} color="secondary">
            Odustani
          </ButtonTab>
          <ButtonTab id="ponudi" onClick={handleMakeOffer} color="primary">
            Završi
          </ButtonTab>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Ponude;
