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

const MojePonude: React.FC = () => {
  const [ponude, setPonude] = useState<Ponuda[]>([]);
  const [istorija, setIstorija] = useState<Ponuda[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [selectedPonuda, setSelectedPonuda] = useState<number | null>(null);
  const [userId, setId] = useState(0);


  useEffect(() => {
    const fetchPonude = async () => {

      const me = getMe();
      if (!me) return;

      let prim =0;
      if (me.permission !== 0) {
        const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;
        setId(worker.firmaId);
        prim = worker.firmaId;
       }
       else
       {
        setId(me.id);
        prim = me.id;
       }

      try {
        const me = getMe();
        if (!me) return;

        const response = await makeGetRequest(`/otc/pending-otc-offers/${prim}`);
        setPonude(response);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchPonude();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      const me = getMe();
      if (!me) return;

      const data = {
        userId: userId,
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
      console.error('Error accepting offer:', error);
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
        userId: userId,
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
      console.error('Error rejecting offer:', error);
    }
  };

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

export default MojePonude;
