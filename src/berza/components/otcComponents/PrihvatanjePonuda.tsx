import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';

const PrihvatanjePonuda = () => {
  // Ovo bi trebalo zameniti stvarnim podacima iz API-a
  const ponude = [
    { id: 1, korisnik: 'Korisnik A', firma: 'Firma A', detalji: 'Detalji ponude A' },
    { id: 2, korisnik: 'Korisnik B', firma: 'Firma B', detalji: 'Detalji ponude B' },
    // Dodajte više podataka po potrebi
  ];

  const handleAccept = (id: number) => {
    // Ovdje dodajte logiku za prihvatanje ponude

    console.log(id);
  };

  const handleReject = (id: number) => {
    console.log(id);
    // Ovdje dodajte logiku za odbijanje ponude
  };

  return (
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
          {ponude.map((ponuda) => (
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
  );
};

export default PrihvatanjePonuda;
