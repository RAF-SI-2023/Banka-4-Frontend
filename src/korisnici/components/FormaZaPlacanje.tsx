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
import { makeGetRequest } from 'utils/apiRequest';


interface PaymentFormProps {
    onSave: (data: any) => void;
    navigate: (screen: string) => void;
    defaultProps: { [key: string]: any };
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

export const FormaZaPlacanje: React.FC<PaymentFormProps> = ({ onSave, navigate, defaultProps }) => {
    const [racuni, setRacuni] = useState(RACUNI_PLACEHOLDER);
    const [selectedRacun, setSelectedRacun] = useState(defaultProps.selectedRacun || 0);
    const [racun, setRacun] = useState<RacunType>({ naziv: "Dragos", broj: '265-0000001234123-12', raspolozivo: 100.11 });
    const [nazivPrimaoca, setNazivPrimaoca] = useState(defaultProps.nazivPrimaoca || '');
    const [racunPrimaoca, setRacunPrimaoca] = useState(defaultProps.racunPrimaoca || '');
    const [iznos, setIznos] = useState('');
    const [pozivNaBroj, setPozivNaBroj] = useState(defaultProps.pozivNaBroj || '');
    const [sifraPlacanja, setSifraPlacanja] = useState<number>(defaultProps.sifraPlacanja || 289);
    const [svrhaPlacanja, setSvrhaPlacanja] = useState("");
    const [errors, setErrors] = useState({ racunPrimaoca: '', iznos: '', pozivNaBroj: '' });


    useEffect(() => {
        const gett = async () => {
            const me = getMe();

            if (!me) return;
            const rac: { brojRacuna: string, raspolozivoStanje: number }[] = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${me.id}`)
            setRacuni(() => rac?.map(e => ({ naziv: "Racun", broj: e.brojRacuna, raspolozivo: e.raspolozivoStanje })))
        }
        gett();
    }, [])

    useEffect(() => {
        if (racuni?.length > 0) {
            setSelectedRacun(() => 0);
            setRacun(() => racuni[0]);
        }
    }, [racuni]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { racunPrimaoca: '', iznos: '', pozivNaBroj: '' };

        if (!/^\d{18}$/.test(racunPrimaoca)) {
            newErrors.racunPrimaoca = 'Račun primaoca mora imati tačno 18 cifara.';
            isValid = false;
        }

        if (!(parseFloat(iznos) > 0)) {
            newErrors.iznos = 'Morate uneti iznos.';
            isValid = false;
        }
        else if (parseFloat(iznos) > racun.raspolozivo) {
            newErrors.iznos = 'Nemate dovoljno sredstava';
            isValid = false;
        }

        if (pozivNaBroj && !/^\d+$/.test(pozivNaBroj)) {
            newErrors.pozivNaBroj = 'Poziv na broj mora biti prazan ili sadržati samo cifre.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!racun)
            return;
        if (validateForm()) {
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
        }
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
                    onChange={(e) => {
                        setSelectedRacun(Number(e.target.value))
                        setRacun(racuni[Number(e.target.value)])
                    }}
                >
                    {racuni?.map((racun, index) => (
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
                error={!!errors.iznos}
                helperText={errors.iznos}
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
                error={!!errors.racunPrimaoca}
                helperText={errors.racunPrimaoca}
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
                error={!!errors.pozivNaBroj}
                helperText={errors.pozivNaBroj}
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
                    {Object.values(sifrePlacanja)?.map((sifra) => (
                        <MenuItem key={sifra.id} value={sifra.id}>{sifra.id} -{sifra.naziv}</MenuItem>
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
            <Button id="submitbuttonpaymentform" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Plati
            </Button>
        </Box>
    );
};
