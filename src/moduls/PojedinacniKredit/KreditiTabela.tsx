import React from 'react';
import { KreditPojedinacni } from '../../utils/types';
import { TableContainer, Table, TableBody, Paper } from '@mui/material';
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
            <StyledTableCell>{kredit.type}</StyledTableCell>
            <StyledTableCell>{kredit.bankAccountNumber}</StyledTableCell>
            <StyledTableCell>{kredit.amount}</StyledTableCell>
            <StyledTableCell>{kredit.loanTerm}</StyledTableCell>
            <StyledTableCell>{kredit.nominalInterestRate}</StyledTableCell>
            <StyledTableCell>{kredit.effectiveInterestRate}</StyledTableCell>
            <StyledTableCell>{new Date(kredit.contractDate).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell>{new Date(kredit.loanMaturityDate).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell>{kredit.installmentAmount}</StyledTableCell>
            <StyledTableCell>{new Date(kredit.nextInstallmentDate).toLocaleDateString()}</StyledTableCell>
            <StyledTableCell>{kredit.remainingDebt}</StyledTableCell>
            <StyledTableCell>{kredit.prepayment}</StyledTableCell>
            <StyledTableCell>{kredit.currency}</StyledTableCell>
            
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KreditiTabela;
