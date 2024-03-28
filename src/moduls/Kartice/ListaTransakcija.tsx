import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TransakcijaKarticePrikaz } from '../../utils/types';

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
                <TableHead>
                    <TableRow>
                        <TableCell>Naziv primaoca</TableCell>
                        <TableCell align="right">Broj računa primaoca</TableCell>
                        <TableCell align="right">Iznos</TableCell>
                        <TableCell align="right">Šifra plaćanja</TableCell>
                        <TableCell align="right">Poziv na broj</TableCell>
                        <TableCell align="right">Svrha plaćanja</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Datum i vreme transakcije</TableCell>
                        <TableCell align="right">Datum i vreme izvršavanja</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transakcije.map((transakcija) => (
                        <TableRow key={transakcija.id}>
                            <TableCell component="th" scope="row">
                                {transakcija.nazivPrimaoca}
                            </TableCell>
                            <TableCell align="right">{transakcija.brojRacunaPrimaoca}</TableCell>
                            <TableCell align="right">{transakcija.iznos}</TableCell>
                            <TableCell align="right">{transakcija.sifraPlacanja}</TableCell>
                            <TableCell align="right">{transakcija.pozivNaBroj}</TableCell>
                            <TableCell align="right">{transakcija.svrhaPlacanja}</TableCell>
                            <TableCell align="right">{transakcija.status}</TableCell>
                            <TableCell align="right">{formatDate(transakcija.vremeTransakcije)}</TableCell>
                            <TableCell align="right">{formatDate(transakcija.vremeIzvrsavanja)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListaTransakcija;
