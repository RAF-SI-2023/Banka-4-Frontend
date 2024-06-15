import React from 'react';
import { Kredit } from './../../utils/types';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
`;

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHead = styled(TableHead)`
  background-color: #f5f5f5;
`;

const StyledHeadTableCell = styled(TableCell)`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
`;

const StyledTableCell = styled(TableCell)`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

interface TabelaProps {
  krediti: Kredit[];
  onClickRed: (kredit: Kredit) => void;
}

const Tabela: React.FC<TabelaProps> = ({ krediti, onClickRed }) => {
  return (
    <ScrollContainer>
      <StyledTableContainer>

 
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <StyledHeadTableCell>Vrsta kredita</StyledHeadTableCell>
              <StyledHeadTableCell>Iznos kredita</StyledHeadTableCell>
              <StyledHeadTableCell>Svrha kredita</StyledHeadTableCell>
              <StyledHeadTableCell>Iznos mesečne plate</StyledHeadTableCell>
              <StyledHeadTableCell>Zaposlen za stalno</StyledHeadTableCell>
              <StyledHeadTableCell>Period zaposlenja kod trenutnog poslodavca</StyledHeadTableCell>
              <StyledHeadTableCell>Ekspozitura</StyledHeadTableCell>
              <StyledHeadTableCell>Status</StyledHeadTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {krediti.map((kredit, index) => (
              <StyledTableRow key={index} onClick={() => onClickRed(kredit)}>
                <StyledTableCell>{kredit.type}</StyledTableCell>
                <StyledTableCell>{kredit.amount}</StyledTableCell>
                <StyledTableCell>{kredit.loanPurpose}</StyledTableCell>
                <StyledTableCell>{kredit.salary}</StyledTableCell>
                <StyledTableCell>{kredit.permanentEmployee ? "True" : "False"}</StyledTableCell>
                <StyledTableCell>{kredit.currentEmploymentPeriod}</StyledTableCell>
                <StyledTableCell>{kredit.branchOffice}</StyledTableCell>
                <StyledTableCell>{kredit.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </ScrollContainer>
  );
}

export default Tabela;
