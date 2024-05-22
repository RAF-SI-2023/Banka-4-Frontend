import { getMe } from '../../utils/getMe';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankRoutes, EmployeePermissionsV2, Kredit } from './../../utils/types';
import { makeApiRequest, makeGetRequest } from 'utils/apiRequest';
import Tabela2 from './TabelaKrediti2';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { hasPermission } from 'utils/permissions';

export const ButtonStyle = styled(Button)`
    margin: 5px !important;
  
`;

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
        const data = await makeGetRequest(BankRoutes.credit_approve + "/" + kredit.id)
        console.log(`Odobren kredit za: ${kredit.id}`);


    };

    const odbij = async (kredit: Kredit) => {
        const data = await makeGetRequest(BankRoutes.credit_deny + "/" + kredit.id)
        console.log(`Odbijen kredit za: ${kredit.id}`);

    };

    const handleRedClick = (kredit: Kredit) => {


    };

    const auth = getMe();

    return (
        <div>
            <Tabela2 krediti={krediti} onClickRed={handleRedClick}>
                {(kredit) => (
                    <>
                        {auth ? (hasPermission(auth.permission, [EmployeePermissionsV2.accept_redits]) ? <ButtonStyle id="Odobri" variant="contained" onClick={() => odobri(kredit)}>Odobri</ButtonStyle> : null) : null}
                        {auth ? (hasPermission(auth.permission, [EmployeePermissionsV2.deny_credits]) ? <ButtonStyle id="Odbij" variant="contained" onClick={() => odbij(kredit)}>Odbij</ButtonStyle> : null) : null}
                    </>
                )}
            </Tabela2>
        </div>
    );

}

export default Zaposlen;
