import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getJWT, makeGetRequest } from 'utils/apiRequest';
import { getMe } from 'utils/getMe';
import { RACUNI_PLACEHOLDER, RacunType } from 'korisnici/data/Racuni';

type UplataDTO = {
    racunPosiljaoca: string;
    nazivPrimaoca: string;
    racunPrimaoca: string;
    iznos: number;
    pozivNaBroj: number;
    sifraPlacanja: number;
    svrhaPlacanja: string;
    status: 'U obradi' | 'uspeh' | 'neuspeh';
    vremeTransakcije: string;
    vremeIzvrsavanja: string;
};

const transactions: UplataDTO[] = [
    // Example transaction data
    {
        racunPosiljaoca: '123-4567890123-45',
        nazivPrimaoca: 'John Doe',
        racunPrimaoca: '321-9876543210-54',
        iznos: 1500,
        pozivNaBroj: 12345,
        sifraPlacanja: 289,
        svrhaPlacanja: 'Donation',
        status: 'uspeh',
        vremeTransakcije: '2023-01-01T12:00:00',
        vremeIzvrsavanja: '2023-01-01T12:05:00',
    },
    {
        racunPosiljaoca: '123-4567890124-46',
        nazivPrimaoca: 'John Does',
        racunPrimaoca: '321-9876543210-54',
        iznos: 1501,
        pozivNaBroj: 12345,
        sifraPlacanja: 289,
        svrhaPlacanja: 'Donation',
        status: 'uspeh',
        vremeTransakcije: '2023-01-01T12:00:00',
        vremeIzvrsavanja: '2023-01-01T12:05:00',
    },
    // Add more transactions as needed
];

const PregledPlacanja = () => {
    const [racuni, setRacuni] = useState<RacunType[]>(RACUNI_PLACEHOLDER);
    const [selectedRacun, setSelectedRacun] = useState(0);
    const [racun, setRacun] = useState<RacunType>(racuni[0]);
    const [placanja, setPlacanja] = useState<UplataDTO[]>([]);


    useEffect(() => {

        const gett = async () => {
            const jwt = getJWT();
            const me = getMe();

            if (!me) return;
            const rac: { brojRacuna: string, raspolozivoStanje: number }[] = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${me.id}`)
            setRacuni(rac.map(e => ({ naziv: "Racun", broj: e.brojRacuna, raspolozivo: e.raspolozivoStanje })))
        }
        gett();
    }, [])

    useEffect(() => {
        const func = async () => {
            const br = racun.broj.replace(/\-/g, '');
            const jwt = getJWT();
            const me = getMe();

            if (!me) return;
            try {
                const result = await makeGetRequest(`/transaction/getAllUplateByBrojRacuna/${br}`);
                setPlacanja(result);
            } catch (e) {
                console.log("NE RADI")
                console.log(e);
            }
        }
        func();
    }, [racun])

    useEffect(() => {
        setRacun(racuni[selectedRacun]);
    }, [selectedRacun])

    return (
        <>
            {racun && <FormControl fullWidth margin="normal">
                <InputLabel id="select-racun-label">Izaberi račun</InputLabel>
                <Select
                    labelId="select-racun-label"
                    id="selectRacun"
                    value={selectedRacun}
                    label="Izaberi račun"
                    onChange={(e) => setSelectedRacun(Number(e.target.value))}
                >
                    {racuni.map((racun, index) => (
                        <MenuItem key={index} value={index}>{`${racun.naziv} - ${racun.broj} (${racun.raspolozivo} RSD)`}</MenuItem>
                    ))}
                </Select>
            </FormControl>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Broj računa pošiljaoca</TableCell>
                            <TableCell align="right">Naziv primaoca</TableCell>
                            <TableCell align="right">Broj računa primaoca</TableCell>
                            <TableCell align="right">Iznos</TableCell>
                            <TableCell align="right">Poziv na broj</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Datum i vreme transakcije</TableCell>
                            <TableCell align="right">Vreme izvršavanja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {placanja.map((trans) => (
                            <TableRow key={trans.racunPosiljaoca} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {trans.racunPosiljaoca}
                                </TableCell>
                                <TableCell align="right">{trans.nazivPrimaoca}</TableCell>
                                <TableCell align="right">{trans.racunPrimaoca}</TableCell>
                                <TableCell align="right">{trans.iznos}</TableCell>
                                <TableCell align="right">{trans.pozivNaBroj}</TableCell>
                                <TableCell align="right">{trans.status}</TableCell>
                                <TableCell align="right">{trans.vremeTransakcije}</TableCell>
                                <TableCell align="right">{trans.vremeIzvrsavanja}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default PregledPlacanja;
