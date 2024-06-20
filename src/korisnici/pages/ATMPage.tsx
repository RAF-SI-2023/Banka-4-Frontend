import React, { useContext, useEffect, useState } from 'react';
import { DropdownMenu } from '../components/DropdownMenu';
import { FormaZaPlacanje } from '../components/FormaZaPlacanje';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import VerifikacijaPlacanja from '../components/VerifikacijaPlacanja';
import { FormaZaPrenos } from '../components/FormaZaPrenos';
import { PrimaociPlacanja } from '../components/PrimaociPlacanja';
import PregledPlacanja from '../components/PregledPlacanja';
import { isNovaUplata, isNoviPrenosSredstava } from 'korisnici/utils/korisniciUtils';
import { Context } from 'App';
import { RACUNI_PLACEHOLDER, RacunType } from 'korisnici/data/Racuni';
import { getMe } from 'utils/getMe';
import { getJWT, makeApiRequest, makeGetRequest } from 'utils/apiRequest';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { UserRoutes } from 'utils/types';

const ATMPage: React.FC = () => {
    const [racuni, setRacuni] = useState(RACUNI_PLACEHOLDER);
    const [selectedRacun, setSelectedRacun] = useState(0);
    const [racun, setRacun] = useState<RacunType>({ naziv: "Dragos", broj: '265-0000001234123-12', raspolozivo: 100.11 });
    const [iznos, setIznos] = useState('');
    const [errors, setErrors] = useState({ iznos: '' });
    const [isplata2, setIsplata2] = useState("false");
    const ctx = useContext(Context);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { racunPrimaoca: '', iznos: '', pozivNaBroj: '' };
        const isplata = (isplata2 == 'true') ? true : false

        if (!(parseFloat(iznos) > 0)) {
            newErrors.iznos = 'Iznos mora da bude pozitivan i morate da ga unesete.';
            isValid = false;
        }
        else if (isplata && parseFloat(iznos) > racun.raspolozivo) {
            newErrors.iznos = 'Nemate dovoljno sredstava za isplatu.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onClick = async () => {
        const isplata = (isplata2 == 'true') ? true : false
        if (!racun)
            return;
        if (validateForm()) {
            const brojRacuna = racun.broj;
            // iznos

            try {
                const data = await makeApiRequest(UserRoutes.atm, "POST", { brojRacuna, stanje: isplata ? -iznos : iznos }, false, true);
                let res = await data.text();
                if (res == 'true') {
                    racuni[selectedRacun].raspolozivo = racuni[selectedRacun].raspolozivo + (isplata ? -iznos : +iznos);
                    setRacuni([...racuni])
                    setRacun({ ...racun })
                    ctx?.setErrors(['Our Success: Uspešna uplata na račun']);
                }

                else
                    ctx?.setErrors(['Our Error: Neuspešna uplata na račun']);
            }
            catch (e) {
                ctx?.setErrors(['Our Error: Neuspešna uplata na račun']);
                console.log(e);
            }

        }
    };

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

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                ATM
            </Typography>{racun && <FormControl fullWidth margin="normal">
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

            <FormControl component="fieldset" margin="normal">
                <RadioGroup
                    row
                    aria-label="transakcija"
                    name="transakcija"
                    value={isplata2}
                    onChange={(e) => setIsplata2(e.target.value)}
                >
                    <FormControlLabel value={"false"} control={<Radio />} label="Uplata" />
                    <FormControlLabel value={"true"} control={<Radio />} label="Isplata" />
                </RadioGroup>
            </FormControl>
            <Button onClick={onClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {(isplata2 == 'true') ? "Is" : "U"}plati
            </Button>

        </Container>
    );
};

export default ATMPage;
