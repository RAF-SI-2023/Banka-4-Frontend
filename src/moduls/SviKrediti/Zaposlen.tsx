import { getMe } from '../../utils/getMe';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankRoutes, Kredit } from './../../utils/types';
import { makeApiRequest, makeGetRequest } from 'utils/apiRequest';
import Tabela2 from './TabelaKrediti2';

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

    const odobri = async (kredit: Kredit) => {
        const data = await makeGetRequest(BankRoutes.credit_approve+"/"+kredit.id)
        console.log(`Odobren kredit za: ${kredit.id}`);
       

    };

    const odbij = async (kredit: Kredit) => {
        const data = await makeGetRequest(BankRoutes.credit_deny +"/"+kredit.id)
        console.log(`Odbijen kredit za: ${kredit.id}`);
      
    };

    const handleRedClick = (kredit: Kredit) => {
       
       
    };

    return (
        <div>
            <p>Email adresa: {emailKorisnikov}</p>
            <Tabela2 krediti={krediti} onClickRed={handleRedClick}>
                {(kredit) => (
                    <>
                        <button onClick={() => odobri(kredit)}>Odobri</button>
                        <button onClick={() => odbij(kredit)}>Odbij</button>
                    </>
                )}
            </Tabela2>
        </div>
    );

}

export default Zaposlen;
