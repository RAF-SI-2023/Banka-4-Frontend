import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { NoviPrenosSredstava } from '../types/Types';
import { RACUNI_PLACEHOLDER, RacunType, getRacunByBroj } from 'korisnici/data/Racuni';
import { getJWT, makeGetRequest } from 'utils/apiRequest';
import { getMe } from 'utils/getMe';

interface TransferFormProps {
    onSave: (data: NoviPrenosSredstava) => void;
    navigate: (screen: string) => void;
}

export const FormaZaPrenos: React.FC<TransferFormProps> = ({ onSave, navigate }) => {
    const [racuni, setRacuni] = useState<RacunType[]>(RACUNI_PLACEHOLDER);
    const [selectedRacunPosiljaoca, setSelectedRacunPosiljaoca] = useState('');
    const [selectedRacunPrimaoca, setSelectedRacunPrimaoca] = useState('');
    const [iznos, setIznos] = useState('');

    useEffect(() => {
        const gett = async () => {
            const me = getMe();

            if (!me) return;
            const rac: { brojRacuna: string, raspolozivoStanje: number }[] = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${me.id}`)
            setRacuni(rac.map(e => ({ naziv: "Racun", broj: e.brojRacuna, raspolozivo: e.raspolozivoStanje })))
        }
        gett();
    }, [])

    useEffect(() => {
        // This assumes the first account in the list is selected by default for both sender and recipient
        // Adjust as necessary
        if (racuni.length > 0) {
            setSelectedRacunPosiljaoca(racuni[0].broj);
            setSelectedRacunPrimaoca(racuni[0].broj);
        }
    }, [racuni]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem("prenosPodaci", JSON.stringify({
            racunPosiljaoca: selectedRacunPosiljaoca,
            racunPrimaoca: selectedRacunPrimaoca,
            iznos: parseInt(iznos)
        }))
        localStorage.removeItem("uplataPodaci");
        navigate("verifikacija")
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="select-racun-posiljaoca-label">Izaberi račun pošiljaoca</InputLabel>
                <Select
                    labelId="select-racun-posiljaoca-label"
                    id="selectRacunPosiljaoca"
                    value={selectedRacunPosiljaoca}
                    label="Izaberi račun pošiljaoca"
                    onChange={(e) => setSelectedRacunPosiljaoca(e.target.value)}
                >
                    {racuni.map((racun, index) => (
                        <MenuItem key={index} value={racun.broj}>{`${racun.naziv} - ${racun.broj} (${racun.raspolozivo} RSD)`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="select-racun-primaoca-label">Izaberi račun primaoca</InputLabel>
                <Select
                    labelId="select-racun-primaoca-label"
                    id="selectRacunPrimaoca"
                    value={selectedRacunPrimaoca}
                    label="Izaberi račun primaoca"
                    onChange={(e) => setSelectedRacunPrimaoca(e.target.value)}
                >
                    {racuni.map((racun, index) => (
                        <MenuItem key={index} value={racun.broj}>{`${racun.naziv} - ${racun.broj} (${racun.raspolozivo} RSD)`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                margin="normal"
                required
                fullWidth
                id="iznos"
                label="Iznos"
                name="iznos"
                type="number"
                autoComplete="iznos"
                value={iznos}
                onChange={(e) => setIznos(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Izvrši prenos
            </Button>
        </Box>
    );
};
