import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { makeGetRequest } from 'utils/apiRequest';
import { getMe } from 'utils/getMe';
import { RACUNI_PLACEHOLDER, RacunType } from 'korisnici/data/Racuni';

import { ScrollContainer } from 'utils/tableStyles';

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
function formatDate(date: string | null): string {
    if (date == null) {
      return "";
    }
  
    const dateObj = /^\d+$/.test(date) ? new Date(Number(date)) : new Date(date);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false  
    };
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  }

  
const PregledPlacanja = () => {
    const [racuni, setRacuni] = useState<RacunType[]>(RACUNI_PLACEHOLDER);
    const [selectedRacun, setSelectedRacun] = useState(0);
    const [racun, setRacun] = useState<RacunType>(racuni[0]);
    const [placanja, setPlacanja] = useState<UplataDTO[]>([]);


    useEffect(() => {

        const gett = async () => {
            const me = getMe();

            if (!me) return;
            const rac: { brojRacuna: string, raspolozivoStanje: number }[] = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${me.id}`)
            setRacuni(rac?.map(e => ({ naziv: "Racun", broj: e.brojRacuna, raspolozivo: e.raspolozivoStanje })))
        }
        gett();
    }, [])

    useEffect(() => {
        const func = async () => {
            const br = racun.broj.replace(/-/g, '');
            const me = getMe();

            if (!me) return;
            try {
                const result = await makeGetRequest(`/transaction/getAllUplateByBrojRacuna/${br}`);
                setPlacanja(result);
            } catch (e) {
            }
        }
        func();
    }, [racun])

    useEffect(() => {
        setRacun(racuni[selectedRacun]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {racuni?.map((racun, index) => (
                        <MenuItem key={index} value={index}>{`${racun.naziv} - ${racun.broj} (${racun.raspolozivo} RSD)`}</MenuItem>
                    ))}
                </Select>
            </FormControl>}
            <ScrollContainer>
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
                        {placanja?.map((trans) => (
                            <TableRow key={trans.racunPosiljaoca} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {trans.racunPosiljaoca}
                                </TableCell>
                                <TableCell align="right">{trans.nazivPrimaoca}</TableCell>
                                <TableCell align="right">{trans.racunPrimaoca}</TableCell>
                                <TableCell align="right">{trans.iznos}</TableCell>
                                <TableCell align="right">{trans.pozivNaBroj}</TableCell>
                                <TableCell align="right">{trans.status}</TableCell>
                                <TableCell align="right">{formatDate(trans.vremeTransakcije)}</TableCell>
                                <TableCell align="right">{formatDate(trans.vremeIzvrsavanja)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollContainer>
        </>
    );
};

export default PregledPlacanja;
