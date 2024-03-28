import React from 'react';
import { Kredit } from './../../utils/types';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';

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
                        <StyledHeadTableCell>Ročnost</StyledHeadTableCell>
                        <StyledHeadTableCell>Ekspozitura</StyledHeadTableCell>
                        <StyledHeadTableCell>Status</StyledHeadTableCell>
                    </StyledTableRow>
                </StyledTableHead>
                <TableBody>
    {krediti.length > 0 && krediti.map((kredit, index) => (
        <StyledTableRow key={index} onClick={() => onClickRed(kredit)}>
            <StyledTableCell>{kredit && kredit.type ? kredit.type : 'N/A'}</StyledTableCell>
            <StyledTableCell>{kredit && kredit.amount ? kredit.amount : 'N/A'}</StyledTableCell>
            <StyledTableCell>{kredit && kredit.loanPurpose ? kredit.loanPurpose : 'N/A'}</StyledTableCell>
            <StyledTableCell>{kredit && kredit.salary ? kredit.salary : 'N/A'}</StyledTableCell>
            <StyledTableCell>{kredit && kredit.permanentEmployee ? kredit.permanentEmployee : 'N/A'}</StyledTableCell>
            <StyledTableCell>{kredit && kredit.currentEmploymentPeriod ? kredit.currentEmploymentPeriod : 'N/A'}</StyledTableCell>
            <StyledTableCell>{kredit && kredit.branchOffice ? kredit.branchOffice : 'N/A'}</StyledTableCell>
            <StyledTableCell>{kredit && kredit.status ? kredit.status : 'N/A'}</StyledTableCell>
        </StyledTableRow>
    ))}
    {krediti.length === 0 && (
        <StyledTableRow>
            <StyledTableCell colSpan={9}>Nema dostupnih kredita.</StyledTableCell>
        </StyledTableRow>
    )}
</TableBody>


            </Table>
        </TableContainer>
    );
}

export default Tabela;
