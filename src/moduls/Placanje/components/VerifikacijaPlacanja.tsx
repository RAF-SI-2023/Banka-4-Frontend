import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NovaUplata, NoviPrenosSredstava, isNovaUplata, isNoviPrenosSredstava } from '../datatypes/Types';
import { getJWT } from '../../../utils/apiRequest';
import { getMe } from '../../../utils/getMe';

const PrikazPodataka: React.FC<{ podaci: NovaUplata | NoviPrenosSredstava }> = ({ podaci }) => {
    return <div>Placeholder za prikaz podataka</div>;
};


const url = "http://api.stamenic.work:8080/api";
const VerifikacijaPlacanja = () => {
    const [verifikacioniKod, setVerifikacioniKod] = useState('');
    const [podaci, setPodaci] = useState<NovaUplata | NoviPrenosSredstava | null>(null)

    useEffect(() => {
        const uplataPodaci = JSON.parse(localStorage.getItem("uplataPodaci") || "null");
        const prenosPodaci = JSON.parse(localStorage.getItem("prenosPodaci") || "null");
        if (uplataPodaci && isNovaUplata(uplataPodaci)) {
            setPodaci(uplataPodaci);
        }
        else if (prenosPodaci && isNoviPrenosSredstava(prenosPodaci)) {
            setPodaci(prenosPodaci);
        }
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const jwt = getJWT();
        const me = getMe();
        if (!me) return;
        const email = me.sub;

        try {
            const resultOtp = await fetch(`${url}/validate-otp?email=${email}&password=${verifikacioniKod}`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + jwt },
                method: "POST"
            })
            if ("Valid OTP" != await resultOtp.text())
                return alert("LOS OTP"); // FRONTEND PROVERAVA
        }
        catch (e) {
            return alert("LOS OTP"); // FRONTEND PROVERAVA
        }

        if (isNovaUplata(podaci)) {
            const result = await fetch(`${url}/transaction/nova-uplata`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + jwt },
                method: "POST",
                body: JSON.stringify(podaci)
            })
            const rac = await result.text();
            console.log(rac);
            localStorage.removeItem("uplataPodaci")
        }
        else if (isNoviPrenosSredstava(podaci)) {
            const result = await fetch(`${url}/transaction/novi-prenos`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + jwt },
                method: "POST",
                body: JSON.stringify(podaci)
            })
            const rac = await result.text();
            console.log(rac);
            localStorage.removeItem("prenosPodaci")
        }
        window.location.reload()
    };

    if (podaci == null) {
        return <div></div>
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <PrikazPodataka podaci={podaci} />
            <TextField
                margin="normal"
                required
                fullWidth
                id="verifikacioniKod"
                label="Verifikacioni Kod"
                name="verifikacioniKod"
                autoComplete="verifikacioni-kod"
                autoFocus
                value={verifikacioniKod}
                onChange={(e) => setVerifikacioniKod(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Nastavi
            </Button>
        </Box>
    );
};

export default VerifikacijaPlacanja;
