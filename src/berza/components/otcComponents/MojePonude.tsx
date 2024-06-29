import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableRow, Paper, 
  Button, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, TextField 
} from '@mui/material';

interface Ponuda {
  id: number;
  korisnik: string;
  firma: string;
  detalji: string;
  status: string | null;
  reason?: string;
}

const MojePonude: React.FC = () => {
  const [ponude, setPonude] = useState<Ponuda[]>([
    { id: 1, korisnik: 'Korisnik A', firma: 'Firma A', detalji: 'Detalji ponude A', status: null },
    { id: 2, korisnik: 'Korisnik B', firma: 'Firma B', detalji: 'Detalji ponude B', status: null },
    // Dodajte više podataka po potrebi
  ]);

  const [istorija, setIstorija] = useState<Ponuda[]>([
    { id: 3, korisnik: 'Korisnik C', firma: 'Firma C', detalji: 'Detalji ponude C', status: 'Prihvaćeno' },
    { id: 4, korisnik: 'Korisnik D', firma: 'Firma D', detalji: 'Detalji ponude D', status: 'Odbijeno' },
    // Dodajte više podataka po potrebi
  ]);

  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [selectedPonuda, setSelectedPonuda] = useState<number | null>(null);

  const handleAccept = (id: number) => {
    const updatedPonude = ponude.map((ponuda) =>
      ponuda.id === id ? { ...ponuda, status: 'Prihvaćeno' } : ponuda
    );
    setPonude(updatedPonude);
    setIstorija([...istorija, { ...ponude.find((ponuda) => ponuda.id === id)!, status: 'Prihvaćeno' }]);
  };

  const handleReject = (id: number) => {
    setSelectedPonuda(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReason('');
  };
  

  const handleConfirmReject = () => {
    const updatedPonude = ponude.map((ponuda) =>
      ponuda.id === selectedPonuda ? { ...ponuda, status: 'Odbijeno', reason } : ponuda
    );
    setPonude(updatedPonude);
    setIstorija([...istorija, { ...ponude.find((ponuda) => ponuda.id === selectedPonuda)!, status: 'Odbijeno', reason }]);
    handleClose();
  };

  return (
    <div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Korisnik</TableCell>
              <TableCell>Firma</TableCell>
              <TableCell>Detalji</TableCell>
              <TableCell>Akcije</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ponude.filter((ponuda) => !ponuda.status).map((ponuda) => (
              <TableRow key={ponuda.id}>
                <TableCell>{ponuda.id}</TableCell>
                <TableCell>{ponuda.korisnik}</TableCell>
                <TableCell>{ponuda.firma}</TableCell>
                <TableCell>{ponuda.detalji}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAccept(ponuda.id)}>Prihvati</Button>
                  <Button onClick={() => handleReject(ponuda.id)}>Odbij</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Korisnik</TableCell>
              <TableCell>Firma</TableCell>
              <TableCell>Detalji</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {istorija.map((ponuda) => (
              <TableRow key={ponuda.id}>
                <TableCell>{ponuda.id}</TableCell>
                <TableCell>{ponuda.korisnik}</TableCell>
                <TableCell>{ponuda.firma}</TableCell>
                <TableCell>{ponuda.detalji}</TableCell>
                <TableCell>{ponuda.status}</TableCell>
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
