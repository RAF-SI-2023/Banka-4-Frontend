import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { RACUNI_PLACEHOLDER, RacunType } from 'korisnici/data/Racuni';
import { getMe } from 'utils/getMe';
import { getJWT, makeGetRequest } from 'utils/apiRequest';


interface PaymentFormProps {
    onSave: (data: any) => void;
    navigate: (screen: string) => void;
}

type SifraPlacanjaTip = {
    id: number;
    naziv: string;
};

const sifrePlacanja: { [key: number]: SifraPlacanjaTip } = {
    289: {
        id: 289,
        naziv: "Transakcije po nalogu građana"
    }
};

function svrhaPlacanjaIliTekstSifrePlacanja(svrhaPlacanja: string, sifraPlacanja: number): string {
    if (svrhaPlacanja) {
        return svrhaPlacanja;
    }
    if (sifrePlacanja[sifraPlacanja]) {
        return sifrePlacanja[sifraPlacanja].naziv;
    }
    return "";
}

export const FormaZaPlacanje: React.FC<PaymentFormProps> = ({ onSave, navigate }) => {
    const [racuni, setRacuni] = useState<RacunType[]>(RACUNI_PLACEHOLDER);
    const [selectedRacun, setSelectedRacun] = useState(0);
    const [racun, setRacun] = useState<RacunType>(racuni[0]);
    const [nazivPrimaoca, setNazivPrimaoca] = useState('');
    const [racunPrimaoca, setRacunPrimaoca] = useState('');
    const [iznos, setIznos] = useState('');
    const [pozivNaBroj, setPozivNaBroj] = useState('');
    const [sifraPlacanja, setSifraPlacanja] = useState<number>(289);
    const [svrhaPlacanja, setSvrhaPlacanja] = useState("");

    useEffect(() => {
        const gett = async () => {
            const jwt = getJWT();
            const me = getMe();

            if (!me) return;
            console.log("IDKOR " + me.id);
            const rac = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${me.id}`)
            // @ts-ignore
            setRacuni(rac.map(e => ({ naziv: "Racun", broj: e.brojRacuna, raspolozivo: e.raspolozivoStanje })))
        }
        gett();
    }, [])

    useEffect(() => {
        if (racuni.length > 0) {
            setSelectedRacun(0);
        }
    }, [racuni]);

    useEffect(() => {
        setRacun(racuni[selectedRacun]);
    }, [selectedRacun])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!racun)
            return;
        event.preventDefault();
        localStorage.setItem("uplataPodaci", JSON.stringify({
            racunPosiljaoca: racun.broj,
            nazivPrimaoca,
            racunPrimaoca,
            iznos,
            pozivNaBroj,
            sifraPlacanja,
            svrhaPlacanja: svrhaPlacanjaIliTekstSifrePlacanja(svrhaPlacanja, sifraPlacanja)
        }))
        localStorage.removeItem("prenosPodaci");
        navigate("verifikacija")
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <TextField
                margin="normal"
                required
                fullWidth
                id="nazivPrimaoca"
                label="Naziv Primaoca"
                name="nazivPrimaoca"
                autoComplete="naziv-primaoca"
                value={nazivPrimaoca}
                onChange={(e) => setNazivPrimaoca(e.target.value)}
            />
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
            <TextField
                margin="normal"
                required
                fullWidth
                id="racunPrimaoca"
                label="Račun Primaoca"
                name="racunPrimaoca"
                autoComplete="racun-primaoca"
                value={racunPrimaoca}
                onChange={(e) => setRacunPrimaoca(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="pozivNaBroj"
                label="Poziv na broj"
                name="pozivNaBroj"
                autoComplete="poziv-na-broj"
                value={pozivNaBroj}
                onChange={(e) => setPozivNaBroj(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="sifra-placanja-label">Šifra Plaćanja</InputLabel>
                <Select
                    labelId="sifra-placanja-label"
                    id="sifraPlacanja"
                    value={sifraPlacanja.toString()}
                    label="Šifra Plaćanja"
                    onChange={(event: SelectChangeEvent) => setSifraPlacanja(Number(event.target.value))}
                >
                    {Object.values(sifraPlacanja).map((sifra) => (
                        <MenuItem key={sifra.id} value={sifra.id}>{sifra.naziv}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                margin="normal"
                required
                fullWidth
                id="svrhaPlacanja"
                label="Svrha Placanja"
                name="svrhaPlacanja"
                autoComplete="svrha-placanja"
                value={svrhaPlacanja}
                onChange={(e) => setSvrhaPlacanja(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Plati
            </Button>
        </Box>
    );
};
