import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import styled from 'styled-components';

const ButtonTab = styled(Button)`
  background-color: #AC190C!important;
  color: white!important;
border-color: #EF2C1A!important;
  &:hover{
    background-color: #EF2C1A!important;
  }
`


const Ponude = () => {
  // Ovo bi trebalo zameniti stvarnim podacima iz API-a
  const ponude = [
    { id: 1, korisnik: 'Korisnik A', firma: 'Firma A', detalji: 'Detalji ponude A' },
    { id: 2, korisnik: 'Korisnik B', firma: 'Firma B', detalji: 'Detalji ponude B' },
    // Dodajte više podataka po potrebi
  ];

  const [open, setOpen] = useState(false);
  const [newPonuda, setNewPonuda] = useState({ myOfferId: '', ticker: '', amount: '', price: '' });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPonuda({ ...newPonuda, [name]: value });
  };

  const handleSubmit = () => {
    // Ovdje dodajte logiku za slanje ponude na server
    console.log(newPonuda);
    // Zatvorite dialog nakon slanja podataka
    handleClose();
  };

  return (
    <div>
      <ButtonTab variant="contained" color="primary" onClick={handleOpen} style={{ margin: '20px 0' }}>
        Napravi Ponudu
      </ButtonTab>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Korisnik</TableCell>
              <TableCell>Firma</TableCell>
              <TableCell>Detalji</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ponude.map((ponuda) => (
              <TableRow key={ponuda.id}>
                <TableCell>{ponuda.id}</TableCell>
                <TableCell>{ponuda.korisnik}</TableCell>
                <TableCell>{ponuda.firma}</TableCell>
                <TableCell>{ponuda.detalji}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj Ponudu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="My Offer ID"
            name="myOfferId"
            type="number"
            fullWidth
            value={newPonuda.myOfferId}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Ticker"
            name="ticker"
            type="text"
            fullWidth
            value={newPonuda.ticker}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            value={newPonuda.amount}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={newPonuda.price}
            onChange={handleChange}
          />
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
    </div>
  );
};

export default Ponude;
