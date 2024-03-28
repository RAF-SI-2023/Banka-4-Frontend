import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import { BankRoutes } from 'utils/types';

export default function DodajKarticu() {
    const [imena, setImena] = useState(['greska']);
    const [ime, setIme] = useState('greska');
    const [vrsta, setVrsta] = useState('debitna');
    const [brojRacuna, setBrojRacuna] = useState('');
    const [limit, setLimit] = useState('5000000');
    const [error, setError] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        makeGetRequest("/cards/allNames").then(result => {
            if (!result)
                return;

            setImena(result.name.split(","));
            setIme(result.name.split(",")[0]);
        }).catch(_ => { })
    }, [])

    useEffect(() => {
        const validateForm = () => {
            return (
                (ime ? true : false) &&
                (vrsta ? true : false) &&
                brojRacuna.length === 18 &&
                (limit ? true : false) && !isNaN(Number(limit))
            );
        };

        setFormValid(validateForm());
    }, [vrsta, brojRacuna, limit, ime]);

    const validirajPodatke = () => {
        if (!ime) return 'Odaberite tip kartice';
        if (!vrsta) return 'Morate odabrati vrstu kartice';
        if (brojRacuna.length !== 18) return 'Broj računa mora imati 18 cifara';
        if (!limit || isNaN(Number(limit))) return 'Limit mora biti broj';
        return '';
    };

    const handleKreiraj = async () => {
        setError('');

        const error = validirajPodatke();
        if (error) {
            setError(error);
            return;
        }

        const uspesno = await makeApiRequest(BankRoutes.cards_create, 'POST', { ime, vrsta, brojRacuna, limit });
        if (uspesno?.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Uspešno kreirana kartica!',
            }).then(() => {
                window.location.href = '/kartice';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Greška pri kreiranju kartice',
                text: uspesno?.message || 'Pokušajte ponovo kasnije',
            });
        }
    };
    // @ts-ignore
    return (
        // @ts-ignore
        <div style={{ padding: '20px' }}>
            <FormControl fullWidth>
                <InputLabel id="vrsta-label">Vrsta kartice</InputLabel>
                <Select
                    labelId="vrsta-label"
                    value={vrsta}
                    label="Vrsta kartice"
                    onChange={(e) => setVrsta(e.target.value)}
                >
                    <MenuItem value="kreditna">Kreditna</MenuItem>
                    <MenuItem value="debitna">Debitna</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{ marginTop: 20 }} fullWidth>
                <InputLabel id="tip-label">Ime kartice</InputLabel>
                <Select
                    labelId="tip-label"
                    value={ime}
                    label="Tip kartice"
                    onChange={(e) => setIme(e.target.value)}
                >
                    {imena.map(e => <MenuItem value={e}>{e}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Broj računa"
                value={brojRacuna}
                onChange={(e) => setBrojRacuna(e.target.value)}
                margin="normal"
                error={brojRacuna.length > 0 && brojRacuna.length !== 18}
                helperText={brojRacuna.length > 0 && brojRacuna.length !== 18 ? 'Broj računa mora imati 18 cifara' : ''}
            />
            <TextField
                fullWidth
                label="Limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                margin="normal"
                error={limit.length > 0 && isNaN(Number(limit))}
                helperText={limit.length > 0 && isNaN(Number(limit)) ? 'Limit mora biti broj' : ''}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleKreiraj}
                disabled={!formValid}
            >
                Kreiraj
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
