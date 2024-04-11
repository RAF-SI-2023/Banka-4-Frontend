import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import { BankRoutes } from 'utils/types';
import { useNavigate } from 'react-router-dom';

export default function DodajKarticu() {
    const navigate = useNavigate();
    const [imena, setImena] = useState(['greska']);
    const [name, setIme] = useState('greska');
    const [type, setVrsta] = useState('debitna');
    const [bankAccountNumber, setBrojRacuna] = useState('');
    const [cardLimit, setLimit] = useState('5000000');
    const [error, setError] = useState('');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        makeGetRequest(BankRoutes.cards_names).then(result => {
            if (!result)
                return;

            setImena(result.name.split(","));
            setIme(result.name.split(",")[0]);
        }).catch(_ => { })
    }, [])

    useEffect(() => {
        const validateForm = () => {
            return (
                (name ? true : false) &&
                (type ? true : false) &&
                bankAccountNumber.length === 18 &&
                (cardLimit ? true : false) && !isNaN(Number(cardLimit))
            );
        };

        setFormValid(validateForm());
    }, [type, bankAccountNumber, cardLimit, name]);

    const validirajPodatke = () => {
        if (!name) return 'Odaberite tip kartice';
        if (!type) return 'Morate odabrati vrstu kartice';
        if (bankAccountNumber.length !== 18) return 'Broj računa mora imati 18 cifara';
        if (!cardLimit || isNaN(Number(cardLimit))) return 'Limit mora biti broj';
        return '';
    };

    const handleKreiraj = async () => {
        setError('');

        const error = validirajPodatke();
        if (error) {
            setError(error);
            return;
        }

        const uspesno = await makeApiRequest(BankRoutes.cards_create, 'POST', { name, type, bankAccountNumber, cardLimit }, false, true);
        if (await uspesno.text() == "Uspesno kreirana kartica") {
            Swal.fire({
                icon: 'success',
                title: 'Uspešno kreirana kartica!',
            }).then(() => {
                navigate(-1)
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Greška pri kreiranju kartice',
                text: uspesno?.message || 'Pokušajte ponovo kasnije',
            });
        }
    };
    return (
        <div style={{ padding: '20px' }}>
            <FormControl fullWidth>
                <InputLabel id="vrsta-label">Vrsta kartice</InputLabel>
                <Select
                    labelId="vrsta-label"
                    value={type}
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
                    value={name}
                    label="Tip kartice"
                    onChange={(e) => setIme(e.target.value)}
                >
                    {imena?.map(e => <MenuItem value={e}>{e}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Broj računa"
                value={bankAccountNumber}
                onChange={(e) => setBrojRacuna(e.target.value)}
                margin="normal"
                error={bankAccountNumber.length > 0 && bankAccountNumber.length !== 18}
                helperText={bankAccountNumber.length > 0 && bankAccountNumber.length !== 18 ? 'Broj računa mora imati 18 cifara' : ''}
            />
            <TextField
                fullWidth
                label="Limit"
                type="number"
                value={cardLimit}
                onChange={(e) => setLimit(e.target.value)}
                margin="normal"
                error={cardLimit.length > 0 && isNaN(Number(cardLimit))}
                helperText={cardLimit.length > 0 && isNaN(Number(cardLimit)) ? 'Limit mora biti broj' : ''}
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
