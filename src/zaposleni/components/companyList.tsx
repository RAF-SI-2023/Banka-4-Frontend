import * as React from 'react';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { Company, CompanyListProps } from '../../utils/types';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import ScrollableTableBody from 'utils/ScrollableTableBody';

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
    const handleSelect = (event: any) => {
        // const id = event.currentTarget.id;
        // navigate(`/korisnik?id=${id}`)
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Naziv</StyledHeadTableCell>
                        <StyledHeadTableCell>Broj telefona</StyledHeadTableCell>
                        <StyledHeadTableCell>Broj faksa</StyledHeadTableCell>
                        <StyledHeadTableCell>Pib</StyledHeadTableCell>
                        <StyledHeadTableCell>Maticni broj</StyledHeadTableCell>
                        <StyledHeadTableCell>Sifra delatnosti</StyledHeadTableCell>
                        <StyledHeadTableCell>Registarski broj</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>       
            </Table>
            <ScrollableTableBody>
                    <TableBody>
                        {companies?.map((company: Company) => (
                            <StyledTableRow key={company.maticniBroj} id={company.maticniBroj} onClick={handleSelect}>
                                <StyledTableCell>{company.nazivPreduzeca}</StyledTableCell>
                                <StyledTableCell>{company.brojTelefona}</StyledTableCell>
                                <StyledTableCell>{company.brojFaksa}</StyledTableCell>
                                <StyledTableCell>{company.pib}</StyledTableCell>
                                <StyledTableCell>{company.maticniBroj}</StyledTableCell>
                                <StyledTableCell>{company.sifraDelatnosti}</StyledTableCell>
                                <StyledTableCell>{company.registarskiBroj}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </ScrollableTableBody>
        </TableContainer>
    );
};

export default CompanyList;