import { getMe } from '../../utils/getMe';
import Tabela from './TabelaKrediti';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankRoutes, Kredit } from './../../utils/types';
import { makeApiRequest, makeGetRequest } from 'utils/apiRequest';

const auth = getMe();
let emailKorisnikov = "";

if (auth) {
    emailKorisnikov = auth.sub;

} else {
    console.error("Nije moguće dobiti informacije o korisniku.");
}

function Zaposlen() {
    const [krediti, setKrediti] = useState<Kredit[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await makeGetRequest(`${BankRoutes.credit_all}/not_approved`)
            setKrediti(data)
        }
        fetchData()
    }, []);

    const navigate = useNavigate();

    const odobri = async (index: number) => {
        const kredit = krediti[index];
        const data = await makeApiRequest(BankRoutes.credit_approve, "POST", { id: kredit.id })
        console.log(`Odobren kredit za: ${kredit.type}`);
        console.log(data);

    };

    const odbij = async (index: number) => {
        const kredit = krediti[index];
        const data = await makeApiRequest(BankRoutes.credit_deny, "POST", { id: kredit.id })
        console.log(`Odbijen kredit za: ${kredit.type}`);
        console.log(data);
    };


    const handleRedClick = (kredit: Kredit) => {
        localStorage.setItem('selectedKredit', JSON.stringify(kredit));
        navigate(`/pojedinacniKredit`);
    };

    return (
        <div>
            <p>Email adresa: {emailKorisnikov}</p>
            <Tabela krediti={krediti} onClickRed={handleRedClick} />
            {krediti.map((kredit, index) => (
                <div key={index}>
                    <button onClick={() => odobri(index)}>Odobri</button>
                    <button onClick={() => odbij(index)}>Odbij</button>
                </div>
            ))}
        </div>
    );

}

export default Zaposlen;
