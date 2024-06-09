import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NovaUplata, NoviPrenosSredstava } from '../types/Types';
import { isNovaUplata, isNoviPrenosSredstava } from 'korisnici/utils/korisniciUtils';

import { makeApiRequest } from 'utils/apiRequest';
import { getMe } from 'utils/getMe';
import { BankRoutes, UserRoutes } from 'utils/types';
import Swal from 'sweetalert2';
import { Context } from 'App';

const PrikazPodataka: React.FC<{ podaci: NovaUplata | NoviPrenosSredstava }> = ({ podaci }) => {
    return <div>Placeholder za prikaz podataka</div>;
};

const VerifikacijaPlacanja = () => {
    const [verifikacioniKod, setVerifikacioniKod] = useState('');
    const [podaci, setPodaci] = useState<NovaUplata | NoviPrenosSredstava | null>(null)
    const ctx = useContext(Context);

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
        const me = getMe();
        if (!me) return;
        const email = me.sub;

        try {
            const resultOtp = await makeApiRequest(`${UserRoutes.validate_otp}?email=${email}&password=${verifikacioniKod}`, "POST", {}, false, true)
            if (resultOtp) {
                const res = await resultOtp.text()
                if ("Valid OTP" !== res)
                    ctx?.setErrors(['Our Error: Oigrešan kod']);
            } else {
            }
        }
        catch (e) {
            ctx?.setErrors(['Our Error: Oigrešan kod']);
        }

        let currentUrl = window.location.href;
        const shouldAppend = currentUrl.indexOf('?') !== -1;
        if (isNovaUplata(podaci)) {
            const data = await makeApiRequest(BankRoutes.transaction_new_payment, "POST", podaci, false, true)
            const success = data ? 1 : 0;
            localStorage.removeItem("uplataPodaci")
            currentUrl = currentUrl + (shouldAppend ? '&' : '?') + "success=" + success
        }
        else if (isNoviPrenosSredstava(podaci)) {
            const data = await makeApiRequest(BankRoutes.transaction_new_transfer, "POST", podaci, false, true)
            const success = data ? 1 : 0;
            localStorage.removeItem("prenosPodaci")
            currentUrl = currentUrl + (shouldAppend ? '&' : '?') + "success=" + success + "&prenos=1"
        }
        window.location.href = currentUrl;
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
