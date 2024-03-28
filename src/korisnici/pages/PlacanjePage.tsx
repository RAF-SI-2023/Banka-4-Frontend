import React, { useEffect, useState } from 'react';
import { DropdownMenu } from '../components/DropdownMenu';
import { FormaZaPlacanje } from '../components/FormaZaPlacanje';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import VerifikacijaPlacanja from '../components/VerifikacijaPlacanja';
import { FormaZaPrenos } from '../components/FormaZaPrenos';
import { PrimaociPlacanja } from '../components/PrimaociPlacanja';
import PregledPlacanja from '../components/PregledPlacanja';
import { isNovaUplata, isNoviPrenosSredstava } from 'korisnici/utils/korisniciUtils';

const Placanje: React.FC = () => {
    // Dodati pravu navigaciju
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        const uplataPodaci = JSON.parse(localStorage.getItem("uplataPodaci") || "null");
        const prenosPodaci = JSON.parse(localStorage.getItem("prenosPodaci") || "null");
        if (uplataPodaci && isNovaUplata(uplataPodaci)) {
            setSelectedOption("verifikacija")
        }
        else if (prenosPodaci && isNoviPrenosSredstava(prenosPodaci)) {
            setSelectedOption("verifikacija")
        }
    }, [])

    const navigate = (screen: string) => {
        setSelectedOption(screen);
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Upravljanje Plaćanjima
            </Typography>
            {(selectedOption === 'verifikacija') ? <VerifikacijaPlacanja /> : <DropdownMenu onSelect={setSelectedOption} />}
            {selectedOption === 'novoPlacanje' && <FormaZaPlacanje navigate={navigate} onSave={data => console.log(data)} />}
            {(selectedOption === 'prenos') && <FormaZaPrenos navigate={navigate} onSave={data => console.log(data)} />}
            {(selectedOption === 'primaociPlacanja') && <PrimaociPlacanja></PrimaociPlacanja>}
            {(selectedOption === 'pregledPlacanja') && <PregledPlacanja></PregledPlacanja>}
        </Container>
    );
};

export default Placanje;
