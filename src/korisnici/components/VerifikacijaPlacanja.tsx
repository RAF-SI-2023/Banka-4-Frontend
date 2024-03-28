import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NovaUplata, NoviPrenosSredstava } from '../types/Types';
import { isNovaUplata, isNoviPrenosSredstava } from 'korisnici/utils/korisniciUtils';

import { getJWT, makeApiRequest } from 'utils/apiRequest';
import { getMe } from 'utils/getMe';
import { BankRoutes, UserRoutes } from 'utils/types';

const PrikazPodataka: React.FC<{ podaci: NovaUplata | NoviPrenosSredstava }> = ({ podaci }) => {
    return <div>Placeholder za prikaz podataka</div>;
};

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
            const resultOtp = await makeApiRequest(`${UserRoutes.validate_otp}?email=${email}&password=${verifikacioniKod}`, "POST", {}, false, true)
            if ("Valid OTP" != await resultOtp.text())
                return alert("LOS OTP"); // FRONTEND PROVERAVA
        }
        catch (e) {
            return alert("LOS OTP"); // FRONTEND PROVERAVA
        }

        if (isNovaUplata(podaci)) {
            const data = await makeApiRequest(BankRoutes.transaction_new_payment, "POST", podaci, false, true)
            const rac = await data.text()
            console.log(rac);
            localStorage.removeItem("uplataPodaci")
        }
        else if (isNoviPrenosSredstava(podaci)) {
            const data = await makeApiRequest(BankRoutes.transaction_new_transfer, "POST", podaci, false, true)
            const rac = await data.text()
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
