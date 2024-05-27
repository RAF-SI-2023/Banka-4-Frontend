import * as React from 'react';
import { TableContainer, Table, TableBody, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Company, CompanyListProps } from '../../utils/types';
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
    const navigate = useNavigate();

    const handleSelect = (company: Company) => {
        navigate('/firma', { state: { company } });
    };

    return (
        <ScrollContainer>
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
                <TableBody>
                    {companies?.map((company: Company) => (
                        <StyledTableRow key={company.maticniBroj} id={company.maticniBroj} onClick={() => handleSelect(company)}>
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
            </Table>
        </ScrollContainer>
    );
};

export default CompanyList;
