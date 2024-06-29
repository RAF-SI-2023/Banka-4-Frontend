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

const Placanje: React.FC = () => {
    // Dodati pravu navigaciju
    const [selectedOption, setSelectedOption] = useState('novoPlacanje');
    const [defaultProps, setDefaultProps] = useState<Object>({})

    const ctx = useContext(Context);
    useEffect(() => {
        const uplataPodaci = JSON.parse(localStorage.getItem("uplataPodaci") || "null");
        const prenosPodaci = JSON.parse(localStorage.getItem("prenosPodaci") || "null");
        if (uplataPodaci && isNovaUplata(uplataPodaci)) {
            setSelectedOption("verifikacija")
        }
        else if (prenosPodaci && isNoviPrenosSredstava(prenosPodaci)) {
            setSelectedOption("verifikacija")
        }
        let currentUrl = new URL(window.location.href);
        let success = currentUrl.searchParams.get('success');
        let prenos = currentUrl.searchParams.get('prenos');

        if (success === '1') {
            if (prenos)
                ctx?.setErrors(['Our Success: Uspešan prenos']);
            else
                ctx?.setErrors(['Our Success: Uspešno plaćanje']);
        } else if (success === '0') {
            if (prenos)
                ctx?.setErrors(['Our Success: Neuspešan prenos']);
            else
                ctx?.setErrors(['Our Error: Neuspešno plaćanje']);
        }
    }, [])

    const navigate = (screen: string) => {
        setSelectedOption(screen);
    }

    return (
        <Container maxWidth="md" sx={{mt:4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Upravljanje Plaćanjima
            </Typography>
            {(selectedOption === 'verifikacija') ? <VerifikacijaPlacanja /> : <DropdownMenu selected={selectedOption} onSelect={setSelectedOption} />}
            {selectedOption === 'novoPlacanje' && <FormaZaPlacanje defaultProps={defaultProps} navigate={navigate} onSave={data => console.log(data)} />}
            {(selectedOption === 'prenos') && <FormaZaPrenos navigate={navigate} onSave={data => console.log(data)} />}
            {(selectedOption === 'primaociPlacanja') && <PrimaociPlacanja setSelectedOption={setSelectedOption} setDefaultProps={setDefaultProps}></PrimaociPlacanja>}
            {(selectedOption === 'pregledPlacanja') && <PregledPlacanja></PregledPlacanja>}
        </Container>
    );
};

export default Placanje;
