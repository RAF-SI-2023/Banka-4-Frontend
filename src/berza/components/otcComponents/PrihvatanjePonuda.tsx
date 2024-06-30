import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField
} from '@mui/material';
import { getMe } from 'utils/getMe'; // Importujte getMe funkciju
import { makeGetRequest, makeApiRequest } from 'utils/apiRequest'; // Importujte funkciju za API zahteve
import { Account, BankRoutes, Employee, UserRoutes } from "utils/types";

interface Ponuda {
  otcId: number;
  ticker: string;
  quantity: number;
  status: string | null;
  reason?: string;
}

const PrihvatanjePonuda: React.FC = () => {
  const [ponude, setPonude] = useState<Ponuda[]>([]);
  const [istorija, setIstorija] = useState<Ponuda[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [selectedPonuda, setSelectedPonuda] = useState<number | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [firmaId, setFirmaId] = useState<number | null>(null); // Dodato za čuvanje firmaId
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      const me = getMe();
      if (!me) {
        setError('Korisnik nije pronađen');
        setLoading(false);
        return;
      }

      const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;
      if (worker) {
        setFirmaId(worker.firmaId); // Sačuvaj firmaId u stanju komponente
      }
    } catch (error) {
      console.error('Greška prilikom učitavanja naloga:', error);
      setError('Greška prilikom učitavanja naloga');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchPonude = async () => {
    try {
      if (!firmaId) {
        setLoading(false);
        return; // Ako firmaId nije dostupan, ne nastavljaj
      }

      const response = await makeGetRequest(`/otc/pending-otc-offers/bank`);
      setPonude(response);
    } catch (error) {
      console.error('Greška prilikom učitavanja ponuda:', error);
      setError('Greška prilikom učitavanja ponuda');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPonude();
  }, [firmaId]);

  const handleAccept = async (id: number) => {
    try {
      const me = getMe();
      if (!me) return;

      const data = {
        userId: firmaId, // Koristi firmaId umesto statičkog -1
        otcId: id,
        accept: true,
      };

      await makeApiRequest(`/otc/resolve-otc`, 'POST', data);

      const updatedPonude = ponude.map((ponuda) =>
        ponuda.otcId === id ? { ...ponuda, status: 'Prihvaćeno' } : ponuda
      );
      setPonude(updatedPonude);
      setIstorija([...istorija, { ...ponude.find((ponuda) => ponuda.otcId === id)!, status: 'Prihvaćeno' }]);
    } catch (error) {
      console.error('Greška prilikom prihvatanja ponude:', error);
      setError('Greška prilikom prihvatanja ponude');
    }
  };

  const handleReject = (id: number) => {
    setSelectedPonuda(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReason('');
  };

  const handleConfirmReject = async () => {
    try {
      const me = getMe();
      if (!me || selectedPonuda === null) return;

      const data = {
        userId: firmaId, // Koristi firmaId umesto statičkog -1
        otcId: selectedPonuda,
        accept: false,
      };

      await makeApiRequest(`/otc/resolve-otc`, 'POST', data);

      const updatedPonude = ponude.map((ponuda) =>
        ponuda.otcId === selectedPonuda ? { ...ponuda, status: 'Odbijeno', reason } : ponuda
      );
      setPonude(updatedPonude);
      setIstorija([...istorija, { ...ponude.find((ponuda) => ponuda.otcId === selectedPonuda)!, status: 'Odbijeno', reason }]);
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
              <TableCell>ID</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Količina</TableCell>
              <TableCell>Akcije</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ponude.filter((ponuda) => !ponuda.status).map((ponuda) => (
              <TableRow key={ponuda.otcId}>
                <TableCell>{ponuda.otcId}</TableCell>
                <TableCell>{ponuda.ticker}</TableCell>
                <TableCell>{ponuda.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAccept(ponuda.otcId)}>Prihvati</Button>
                  <Button onClick={() => handleReject(ponuda.otcId)}>Odbij</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

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

export default PrihvatanjePonuda;
