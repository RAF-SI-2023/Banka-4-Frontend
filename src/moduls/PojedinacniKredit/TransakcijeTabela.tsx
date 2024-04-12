import React from 'react';
import { Transakcija } from '../../utils/types';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import ScrollableTableBody from 'utils/ScrollableTableBody';

const TransakcijeTabela = ({ transakcije }: { transakcije: Transakcija[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <StyledTableHead>
          <StyledTableRow>
            <StyledHeadTableCell>Naziv primaoca</StyledHeadTableCell>
            <StyledHeadTableCell>Broj računa primaoca</StyledHeadTableCell>
            <StyledHeadTableCell>Iznos</StyledHeadTableCell>
            <StyledHeadTableCell>Poziv na broj</StyledHeadTableCell>
            <StyledHeadTableCell>Status</StyledHeadTableCell>
            <StyledHeadTableCell>Vreme transakcije</StyledHeadTableCell>
            <StyledHeadTableCell>Šifra plaćanja</StyledHeadTableCell>
            <StyledHeadTableCell>Svrha plaćanja</StyledHeadTableCell>
            <StyledHeadTableCell>Vreme izvršavanja</StyledHeadTableCell>
          </StyledTableRow>
        </StyledTableHead>
      </Table>
      <ScrollableTableBody>
        <TableBody>
          {transakcije?.map((transakcija, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{transakcija.nazivPrimaoca}</StyledTableCell>
              <StyledTableCell>{transakcija.racunPrimaoca}</StyledTableCell>
              <StyledTableCell>{transakcija.iznos}</StyledTableCell>
              <StyledTableCell>{transakcija.pozivNaBroj}</StyledTableCell>
              <StyledTableCell>{transakcija.status}</StyledTableCell>
              <StyledTableCell>{transakcija.vremeTransakcije}</StyledTableCell>
              <StyledTableCell>{transakcija.sifraPlacanja}</StyledTableCell>
              <StyledTableCell>{transakcija.svrhaPlacanja}</StyledTableCell>
              <StyledTableCell>{transakcija.vremeIzvrsavanja}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </ScrollableTableBody>
    </TableContainer>
  );
};

export default TransakcijeTabela;