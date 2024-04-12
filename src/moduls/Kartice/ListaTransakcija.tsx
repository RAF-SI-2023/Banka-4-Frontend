import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TransakcijaKarticePrikaz } from '../../utils/types';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from 'utils/tableStyles';
import ScrollableTableBody from 'utils/ScrollableTableBody';

interface TransactionListProps {
    transakcije: TransakcijaKarticePrikaz[];
}
const ListaTransakcija: React.FC<TransactionListProps> = ({ transakcije }) => {
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <StyledTableHead>
                    <StyledTableRow>
                        <StyledHeadTableCell>Naziv primaoca</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Broj računa primaoca</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Iznos</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Šifra plaćanja</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Poziv na broj</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Svrha plaćanja</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Status</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Datum i vreme transakcije</StyledHeadTableCell>
                        <StyledHeadTableCell align="right">Datum i vreme izvršavanja</StyledHeadTableCell>
                    </StyledTableRow>
                </StyledTableHead>
            </Table>
            <ScrollableTableBody>
                <TableBody>
                    {transakcije.length > 0 ? (
                        transakcije.map((transakcija) => (
                            <StyledTableRow key={transakcija.id}>
                                <StyledTableCell component="th" scope="row">
                                    {transakcija.nazivPrimaoca}
                                </StyledTableCell>
                                <StyledTableCell align="right">{transakcija.brojRacunaPrimaoca}</StyledTableCell>
                                <StyledTableCell align="right">{transakcija.iznos}</StyledTableCell>
                                <StyledTableCell align="right">{transakcija.sifraPlacanja}</StyledTableCell>
                                <StyledTableCell align="right">{transakcija.pozivNaBroj}</StyledTableCell>
                                <StyledTableCell align="right">{transakcija.svrhaPlacanja}</StyledTableCell>
                                <StyledTableCell align="right">{transakcija.status}</StyledTableCell>
                                <StyledTableCell align="right">{formatDate(transakcija.vremeTransakcije)}</StyledTableCell>
                                <StyledTableCell align="right">{formatDate(transakcija.vremeIzvrsavanja)}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell style={{ textAlign: 'center' }} colSpan={9}>Trenutno nema transakcija</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </ScrollableTableBody>
        </TableContainer>
    );
};

export default ListaTransakcija;
