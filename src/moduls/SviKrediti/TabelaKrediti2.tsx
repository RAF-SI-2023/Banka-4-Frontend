import React, { ReactNode } from 'react';
import { Kredit } from './../../utils/types';
import { TableContainer, Table, TableBody, TableRow } from '@mui/material';
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead } from '../../utils/tableStyles';

import styled from 'styled-components';
import { AppBar, Tabs, Tab } from '@mui/material';

const TableWrapper = styled.div`
  width: 100%;
  display: flex!important;
  justify-content: center;
`
const StyledTable = styled.div`
  display: flex;
  max-width: 1200px;
  flex-grow: 1;
  flex-direction: column;
`

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;
  & > * > * {
    display: flex !important;
    justify-content: space-between !important;
    margin: 6px !important;
  }

  /* Dodaj stil za aktivni tab i donju crtu */
  .MuiTabs-indicator {  /* Zameni sa odgovarajućom CSS klasom ako je drugačija */
    background-color: red; /* Boja donje crte */
  }
`

// Define a styled component for the table container
const StyledTableContainer = styled(TableContainer)`
    margin-top: 2%;
    margin-bottom: 10%;
`;

// Define styled components for table cells with specific styles
const StyledTableCell1 = styled(StyledTableCell)`
    &:hover:not(:last-child) {
        background-color: #f2f2f2;
    }
`;

const StyledTableCell2 = styled(StyledTableCell)`
    border: none !important;
    border-left: 1px solid black !important;
`;

// Define a styled component for table rows
const StyledTableRow = styled(TableRow)`
    &:last-child {
        border-bottom: none !important;
    }
`;

interface TabelaProps {
    krediti: Kredit[];
    onClickRed: (kredit: Kredit) => void;
    children?: (kredit: Kredit) => ReactNode;
}

const Tabela: React.FC<TabelaProps> = ({ krediti, onClickRed, children }) => {
    return (
        <div>
            <ScrollContainer>
                <StyledTableContainer>
                <AppBar position="static" >
                    <StyledTabs value={0}>
                        <Tab label="Krediti" style={{ color: 'red' }}/>
                    

                    </StyledTabs>
                    </AppBar>
                    <Table>
                        <StyledTableHead>
                            <StyledTableRow>
                                <StyledHeadTableCell>Vrsta kredita</StyledHeadTableCell>
                                <StyledHeadTableCell>Iznos kredita</StyledHeadTableCell>
                                <StyledHeadTableCell>Svrha kredita</StyledHeadTableCell>
                                <StyledHeadTableCell>Iznos mesečne plate</StyledHeadTableCell>
                                <StyledHeadTableCell>Zaposlen za stalno</StyledHeadTableCell>
                                <StyledHeadTableCell>Period zaposlenja kod trenutnog poslodavca</StyledHeadTableCell>
                                <StyledHeadTableCell>Ekspozitura</StyledHeadTableCell>
                            </StyledTableRow>
                        </StyledTableHead>
                        <TableBody>
                            {krediti.map((kredit, index) => (
                                <StyledTableRow key={index} onClick={() => onClickRed(kredit)}>
                                    <StyledTableCell1>{kredit.type}</StyledTableCell1>
                                    <StyledTableCell1>{kredit.amount}</StyledTableCell1>
                                    <StyledTableCell1>{kredit.loanPurpose}</StyledTableCell1>
                                    <StyledTableCell1>{kredit.salary}</StyledTableCell1>
                                    <StyledTableCell1>{kredit.permanentEmployee ? "True" : "False"}</StyledTableCell1>
                                    <StyledTableCell1>{kredit.currentEmploymentPeriod}</StyledTableCell1>
                                    <StyledTableCell1>{kredit.branchOffice}</StyledTableCell1>
                                    <StyledTableCell2>{children && children(kredit)}</StyledTableCell2>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </ScrollContainer>
        </div>
    );
}

export default Tabela;
