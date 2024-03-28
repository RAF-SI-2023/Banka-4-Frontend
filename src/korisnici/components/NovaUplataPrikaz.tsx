import React, { useState } from 'react';
import { Typography, Box, Paper, Stack } from '@mui/material';
import { NovaUplata } from '../types/Types';
import { RACUNI_PLACEHOLDER, RacunType, getRacunByBroj } from 'korisnici/data/Racuni';

const PlacanjePodaciPrikaz: React.FC<{ podaci: NovaUplata }> = ({ podaci }) => {
    const [racuni, setRacuni] = useState<RacunType[]>(RACUNI_PLACEHOLDER);
    const racun = getRacunByBroj(racuni, podaci.racunPosiljaoca);
    if (!racun) return <div></div>

    return (
        <Paper elevation={3} sx={{ padding: '20px', margin: '20px 0' }}>
            <Typography variant="h6" gutterBottom>
                Detalji Plaćanja
            </Typography>
            <Box sx={{ marginTop: '10px' }}>
                <Stack spacing={2}>
                    <Typography>Račun: {racun.naziv} - {racun.broj}</Typography>
                    <Typography>Naziv primaoca: {podaci.nazivPrimaoca}</Typography>
                    <Typography>Račun primaoca: {podaci.racunPrimaoca}</Typography>
                    <Typography>Iznos: {podaci.iznos}</Typography>
                    <Typography>Poziv na broj: {podaci.pozivNaBroj}</Typography>
                    <Typography>Šifra plaćanja: {podaci.sifraPlacanja}</Typography>
                    <Typography>Svrha plaćanja: {podaci.svrhaPlacanja}</Typography>
                </Stack>
            </Box>
        </Paper>
    );
};

export default PlacanjePodaciPrikaz;
