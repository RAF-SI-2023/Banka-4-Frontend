import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { getMe } from 'utils/getMe';
import { makeGetRequest, makeApiRequest } from 'utils/apiRequest';
import { Employee, UserRoutes } from "utils/types";

interface Ponuda {
  id: number;
  sellerId: number;
  ticker: string;
  sellerApproval: boolean;
  banksApproval: boolean;
  buyerId: number;
  quantityToBuy: number;
  priceOffer: number;
  razlogOdbijanja: string;
  datumKreiranja: number;
  datumRealizacije: number;
  opis: string;
}

const MojePonude: React.FC = () => {
  const [ponude, setPonude] = useState<Ponuda[]>([]);
  const [istorija, setIstorija] = useState<Ponuda[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [selectedPonuda, setSelectedPonuda] = useState<number | null>(null);
  const [userId, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [opis, setOpis] = useState<string>("");
  const [openAccept, setOpenAccept] = useState<boolean>(false);

  useEffect(() => {
    const fetchPonude = async () => {
      const me = getMe();
      if (!me) {
        setError('Korisnik nije pronađen');
        setLoading(false);
        return;
      }

      let prim = 0;
      if (me.permission !== 0) {
        try {
          const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;
          setId(worker.firmaId);
          prim = worker.firmaId;
        } catch (error) {
          console.error('Greška prilikom učitavanja radnika:', error);
          setError('Greška prilikom učitavanja radnika');
          setLoading(false);
          return;
        }
      } else {
        setId(me.id);
        prim = me.id;
      }

      try {
        const response = await makeGetRequest(`/otc/pending-otc-offers/${prim}`);
        setPonude(response);
      } catch (error) {
        console.error('Greška prilikom učitavanja ponuda:', error);
        setError('Greška prilikom učitavanja ponuda');
      } finally {
        setLoading(false);
      }
    };

    fetchPonude();
  }, []);

  const handleConfirmAccept = async () => {
    try {
      const me = getMe();
      if (!me) return;

      const data = {
        userId: userId,
        otcId: selectedPonuda,
        accept: true,
        opis: opis
      };

      await makeApiRequest(`/otc/resolve-otc`, 'POST', data);
      window.location.reload();

      // const updatedPonude = ponude.map((ponuda) =>
      //   ponuda.id === selectedPonuda ? { ...ponuda, status: 'Prihvaćeno' } : ponuda
      // );
      // setPonude(updatedPonude);
      // setIstorija([...istorija, { ...ponude.find((ponuda) => ponuda.id === id)!, status: 'Prihvaćeno' }]);
    } catch (error) {
      console.error('Greška prilikom prihvatanja ponude:', error);
      setError('Greška prilikom prihvatanja ponude');
    }
  };

  const handleAccept = (id: number) => {
    setSelectedPonuda(id);
    setOpenAccept(true);
  };

  const handleReject = (id: number) => {
    setSelectedPonuda(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReason('');
  };
  const handleCloseAccept = () => {
    setOpenAccept(false);
    setOpis("");
  };

  const handleConfirmReject = async () => {
    try {
      const me = getMe();
      if (!me || selectedPonuda === null) return;

      const data = {
        userId: userId,
        otcId: selectedPonuda,
        accept: false,
        razlog: reason 
      };

      await makeApiRequest(`/otc/resolve-otc`, 'POST', data);

      // const updatedPonude = ponude.map((ponuda) =>
      //   ponuda.id === selectedPonuda ? { ...ponuda, status: 'Odbijeno', reason } : ponuda
      // );
      // setPonude(updatedPonude);
      // setIstorija([...istorija, { ...ponude.find((ponuda) => ponuda.id === selectedPonuda)!, status: 'Odbijeno', reason }]);
      handleClose();
    } catch (error) {
      console.error('Greška prilikom odbijanja ponude:', error);
      setError('Greška prilikom odbijanja ponude');
    }
  };

  if (loading) {
    return <p>Učitavanje ponuda...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seller name</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Seller approval</TableCell>
              <TableCell>Bank approval</TableCell>
              <TableCell>Buyer name</TableCell>
              <TableCell>Quantity to buy</TableCell>
              <TableCell>Price offer</TableCell>
              <TableCell>Creation date</TableCell>
              <TableCell>Napomena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ponude.map((ponuda) => (
              <TableRow key={ponuda.id}>
                <TableCell>{ponuda.sellerId}</TableCell>
                <TableCell>{ponuda.ticker}</TableCell>
                <TableCell>{ponuda.sellerApproval ? "Prihvacen" : "Nije prihvacen"}</TableCell>
                <TableCell>{ponuda.banksApproval ? "Prihvacen" : "Nije prihvacen"}</TableCell>
                <TableCell>{ponuda.buyerId}</TableCell>
                <TableCell>{ponuda.quantityToBuy}</TableCell>
                <TableCell>{ponuda.priceOffer}</TableCell>
                <TableCell>{new Date(ponuda.datumKreiranja).toLocaleTimeString("en-de")}</TableCell>
                <TableCell>{ponuda.opis ?? ""}</TableCell>
                <TableCell>
                  {!ponuda.sellerApproval ?
                    <Button onClick={() => handleAccept(ponuda.id)}>Prihvati</Button> : null
                  }
                  {!ponuda.sellerApproval ?
                    <Button onClick={() => handleReject(ponuda.id)}>Odbij</Button> : null
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={openAccept} onClose={handleCloseAccept}>
        <DialogTitle>Prihvati Ponudu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Unesite opis.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Opis"
            type="text"
            fullWidth
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAccept}>Odustani</Button>
          <Button onClick={handleConfirmAccept}>Potvrdi</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Odbij Ponudu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Unesite razlog za odbijanje ponude.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Razlog"
            type="text"
            fullWidth
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={handleConfirmReject}>Potvrdi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MojePonude;
