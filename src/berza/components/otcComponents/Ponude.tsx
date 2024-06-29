import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, TextField
} from '@mui/material';
import styled from 'styled-components';
import { getMe } from 'utils/getMe';
import { makeGetRequest, makeApiRequest } from 'utils/apiRequest';

const ButtonTab = styled(Button)`
  background-color: #AC190C !important;
  color: white !important;
  border-color: #EF2C1A !important;
  &:hover {
    background-color: #EF2C1A !important;
  }
`;

interface Ponuda {
  otcId: number;
  ticker: string;
  quantity: number;
}

interface NewPonuda {
  ticker: string;
  quantity: number;
}

interface Ticker {
  ticker: string;
  quantity: number;
  currentBid: number;
  currentAsk: number;
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

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const me = getMe();
        if (!me) return;

        const response = await makeGetRequest(`/user-stocks/-1`);
        
        setTickers(response.map((ticker: Ticker) => ({
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
        const response = await makeGetRequest(`/otc/all-public-otc`);
        setOtcData(response);
      } catch (error) {
        console.error('Error fetching all public OTC data:', error);
      }
    };

    fetchTickers();
    fetchAllPublicOTC();
  }, []);

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
        console.error('Selected ticker, user ID or quantity is not defined');
        return;
      }
  
      const data = {
        userId: -1,
        ticker: selectedTicker.ticker,
        quantity: newPonuda.quantity,
      };
  
      const response = await makeApiRequest(`/otc/place-otc-public`, "POST", data);
  
      if (response.status === 200) {
        console.log('Offer successfully placed:', response.data);
        window.location.reload();  // Refresh the page after successful submission
      } else {
        console.error('Failed to place offer:', response);
      }
  
      handleClose();
    } catch (error) {
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
      console.error('No selected ponuda or invalid offer quantity');
      return;
    }

    const data = {
      otcId: selectedPonuda.otcId,
      sellerId: -1,
      buyerId: getMe()?.id,
      ticker: selectedPonuda.ticker,
      quantity: offerQuantity, // Use the user-specified quantity here
      priceOffered: priceOffered
    };

    try {
      const response = await makeApiRequest(`/otc/make-offer-for-otc`, "PUT", data);

      if (response.status === 200) {
        console.log('Offer successfully made:', response.data);
        window.location.reload();  // Refresh the page after successful submission
      } else {
        console.error('Failed to make offer:', response);
      }

      handleCloseOfferDialog();
    } catch (error) {
      console.error('Error making offer:', error);
    }
  };

  return (
    <div>
      <ButtonTab variant="contained" color="primary" onClick={() => handleOpen()} style={{ margin: '20px 0' }}>
        Dodaj ponudu
      </ButtonTab>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Količina</TableCell>
              <TableCell>Akcija</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otcData.map((ponuda) => (
              <TableRow key={ponuda.otcId}>
                <TableCell>{ponuda.otcId}</TableCell>
                <TableCell>{ponuda.ticker}</TableCell>
                <TableCell>{ponuda.quantity}</TableCell>
                <TableCell>
                  <ButtonTab
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
              labelId="ticker-label"
              name="ticker"
              value={newPonuda.ticker}
              onChange={handleSelectChange}
            >
              {tickers.map((ticker) => (
                <MenuItem key={ticker.ticker} value={ticker.ticker}>
                  {ticker.ticker}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedTicker && (
            <div style={{ marginTop: '20px' }}>
              <p>Ticker: {selectedTicker.ticker}</p>
              <p>Quantity: {selectedTicker.quantity}</p>
              <p>Current Bid: {selectedTicker.currentBid}</p>
              <p>Current Ask: {selectedTicker.currentAsk}</p>
              <TextField
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
          <ButtonTab onClick={handleSubmit} color="primary">
            Napravi
          </ButtonTab>
        </DialogActions>
      </Dialog>

      <Dialog open={openOffer} onClose={handleCloseOfferDialog}>
        <DialogTitle>Unesi cenu ponude</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Cena"
            type="number"
            fullWidth
            value={priceOffered}
            onChange={handlePriceChange}
          />
          <TextField
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
          <ButtonTab onClick={handleMakeOffer} color="primary">
            Završi
          </ButtonTab>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Ponude;
