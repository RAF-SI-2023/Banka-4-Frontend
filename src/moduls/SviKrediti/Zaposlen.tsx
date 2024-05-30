import { getMe } from '../../utils/getMe';
import { useState, useEffect } from 'react';
import { BankRoutes, EmployeePermissionsV2, Kredit } from './../../utils/types';
import { makeGetRequest } from 'utils/apiRequest';
import Tabela2 from './TabelaKrediti2';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { hasPermission } from 'utils/permissions';

export const ButtonStyle = styled(Button)`
    margin: 5px !important;
  
`;

const auth = getMe();
// let emailKorisnikov = "";

if (auth) {
    // emailKorisnikov = auth.sub;

} else {
}

function Zaposlen() {
    const [krediti, setKrediti] = useState<Kredit[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await makeGetRequest(`${BankRoutes.credit_all}/not_approved`)
            setKrediti(data)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const navigate = useNavigate();

    const odobri = async (kredit: Kredit) => {
        await makeGetRequest(BankRoutes.credit_approve + "/" + kredit.id)


    };

    const odbij = async (kredit: Kredit) => {
        await makeGetRequest(BankRoutes.credit_deny + "/" + kredit.id)
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
