import React from 'react';
import { KreditPojedinacni } from '../../utils/types';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';

const KreditiTabela = ({ kredit }: { kredit: KreditPojedinacni }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <StyledTableHead>
          <StyledTableRow>
            <StyledHeadTableCell>Naziv kredita</StyledHeadTableCell>
            <StyledHeadTableCell>Broj kredita</StyledHeadTableCell>
            <StyledHeadTableCell>Iznos kredita</StyledHeadTableCell>
            <StyledHeadTableCell>Period otplate</StyledHeadTableCell>
            <StyledHeadTableCell>Nominalna kamatna stopa</StyledHeadTableCell>
            <StyledHeadTableCell>Efektivna kamatna stopa</StyledHeadTableCell>
            <StyledHeadTableCell>Datum ugovaranja</StyledHeadTableCell>
            <StyledHeadTableCell>Datum dospeća kredita</StyledHeadTableCell>
            <StyledHeadTableCell>Iznos rate</StyledHeadTableCell>
            <StyledHeadTableCell>Datum sledeće rate</StyledHeadTableCell>
            <StyledHeadTableCell>Preostalo dugovanje</StyledHeadTableCell>
            <StyledHeadTableCell>Iznos pretplate/dugovanja</StyledHeadTableCell>
            <StyledHeadTableCell>Valuta kredita</StyledHeadTableCell>
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>{kredit.naziv}</StyledTableCell>
            <StyledTableCell>{kredit.broj}</StyledTableCell>
            <StyledTableCell>{kredit.iznos}</StyledTableCell>
            <StyledTableCell>{kredit.period}</StyledTableCell>
            <StyledTableCell>{kredit.nominalnaKamatnaStopa}</StyledTableCell>
            <StyledTableCell>{kredit.efektivnaKamatnaStopa}</StyledTableCell>
            <StyledTableCell>{kredit.datumUgovaranja}</StyledTableCell>
            <StyledTableCell>{kredit.datumDospeca}</StyledTableCell>
            <StyledTableCell>{kredit.iznosRate}</StyledTableCell>
            <StyledTableCell>{kredit.datumSledeceRate}</StyledTableCell>
            <StyledTableCell>{kredit.preostaloDugovanje}</StyledTableCell>
            <StyledTableCell>{kredit.iznosPretplate}</StyledTableCell>
            <StyledTableCell>{kredit.valuta}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KreditiTabela;
