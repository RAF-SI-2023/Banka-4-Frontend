import React from 'react';
import { Kredit } from './../../utils/types';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import ScrollableTableBody from 'utils/ScrollableTableBody';

interface TabelaProps {
    krediti: Kredit[];
    onClickRed: (kredit: Kredit) => void;
}

const Tabela: React.FC<TabelaProps> = ({ krediti, onClickRed }) => {
    return (
        <TableContainer component={Paper}>
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
            </Table>
            <ScrollableTableBody>
                <TableBody>
                    {krediti?.map((kredit, index) => (
                        <StyledTableRow key={index} onClick={() => onClickRed(kredit)}>
                            <StyledTableCell>{kredit.type}</StyledTableCell>
                            <StyledTableCell>{kredit.amount}</StyledTableCell>
                            <StyledTableCell>{kredit.loanPurpose}</StyledTableCell>
                            <StyledTableCell>{kredit.salary}</StyledTableCell>
                            <StyledTableCell>{kredit.permanentEmployee ? "True" : "False"}</StyledTableCell>
                            <StyledTableCell>{kredit.currentEmploymentPeriod}</StyledTableCell>
                            <StyledTableCell>{kredit.branchOffice}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </ScrollableTableBody>
        </TableContainer>
    );
}

export default Tabela;
