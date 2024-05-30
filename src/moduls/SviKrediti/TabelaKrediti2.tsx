import React, { ReactNode } from 'react';
import { Kredit } from './../../utils/types';
import { TableContainer, Table, TableBody, TableRow } from '@mui/material';
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead } from '../../utils/tableStyles';

import styled from 'styled-components'; // Importuj styled-components

// Definiši stilizovanu komponentu za tabelu
const StyledTableContainer = styled(TableContainer)`
    margin-top: 2% !important; // Postavi željenu marginu
    margin-bottom: 10% !important; // Postavi željenu marginu
`;

interface TabelaProps {
    krediti: Kredit[];
    onClickRed: (kredit: Kredit) => void;
    children?: (kredit: Kredit) => ReactNode;
}

const StyledTableCell1 = styled(StyledTableCell)`
    &:hover {
        background-color: initial;
    }
    &:hover:not(:last-child) { /* Primijeni hover efekat na sve osim na poslednju ćeliju */
        background-color: #f2f2f2;
    }
`;

const StyledTableCell2 = styled(StyledTableCell)`
    border: none !important; // Ukloni sve granice za ćelije
    border-left: 1px solid black !important; // Dodaj granicu samo na lijevu stranu
    &:hover {
        background-color: white !important; // Isključi hover efekat za ćelije
    }
`;

const StyledTableRow = styled(TableRow)`
    &:last-child {
        border-bottom: none !important;
    }
`;
const Tabela: React.FC<TabelaProps> = ({ krediti, onClickRed, children }) => {
    return (
        <div>
            <ScrollContainer>
                {/* Upotrijebi stilizovanu komponentu umjesto TableContainer */}
                <StyledTableContainer>
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
                            {krediti?.map((kredit, index) => (
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
