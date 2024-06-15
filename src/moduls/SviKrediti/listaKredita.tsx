import { useState, useEffect } from 'react';
import Zaposlen from './Zaposlen';
import NeZaposlen from './NeZaposlen';
import { getMe } from '../../utils/getMe';
import Tabela from './TabelaKrediti';
import { BankRoutes, Kredit } from './../../utils/types';
import { useNavigate } from 'react-router-dom';
import { makeGetRequest } from 'utils/apiRequest';
import styled from 'styled-components';
import { AppBar, Tabs, Tab } from '@mui/material';

const TableWrapper = styled.div`
  padding-top:5%;
  width: 100%;
  display: flex!important;
  justify-content: center;
`
const StyledTable = styled.div`
  display: flex;
  max-width: 1200px;
  flex-grow: 1;
  flex-direction: column;
`

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;
  & > * > * {
    display: flex !important;
    justify-content: space-between !important;
    margin: 6px !important;
  }

  /* Dodaj stil za aktivni tab i donju crtu */
  .MuiTabs-indicator {  /* Zameni sa odgovarajućom CSS klasom ako je drugačija */
    background-color: red; /* Boja donje crte */
  }
`


const auth = getMe();
// let emailKorisnikov = "";
let zaposlen = false;
if (auth) {
    // emailKorisnikov = auth.sub;
    if (auth.permission)
        zaposlen = true;
} else {
}

function ListaKredita() {
    const [krediti, setKrediti] = useState<Kredit[]>([]);
    const [krediti2, setKredit] = useState<Kredit[]>([]);
    const navigate = useNavigate(); // Dodato za useNavigate

    useEffect(() => {
        const fetchData = async () => {
            const approvedData = await makeGetRequest(`${BankRoutes.credit_all}/approved`) as Kredit[];
            const notApprovedData = await makeGetRequest(`${BankRoutes.credit_all}/denied`) as Kredit[]; //denied

            setKrediti(approvedData);

            let data = [] as Kredit[];
            data = data.concat(notApprovedData?.map(kredit => ({ ...kredit, status: 'ne odobren' })));
            data = data.concat(approvedData?.map(kredit => ({ ...kredit, status: 'odobren' })));
            setKredit(data);
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const posalji = () => {
    //     // Implementacija posalji funkcije
    // };

    const handleRedClick = (kredit: Kredit) => {
        localStorage.setItem('selectedKredit', JSON.stringify(kredit));

        if (kredit?.status !== 'ne odobren') {
            navigate(`/pojedinacniKredit`);
        }
    };

    return (
        <div>
            {zaposlen ? <div>
             <TableWrapper>
                <StyledTable>

                    <Zaposlen />
                    <AppBar position="static" >
                    <StyledTabs value={0}>
                        <Tab label="Istorija" style={{ color: 'red' }}/>
                    

                    </StyledTabs>
                    </AppBar>
                    <Tabela krediti={krediti2} onClickRed={handleRedClick} /> 
                </StyledTable>
            </TableWrapper>
            </div> : 
            <div> 
               
                 <TableWrapper>
                    <StyledTable>
                    
                    
                    
                        
                        <AppBar position="static" >
                        <StyledTabs value={0}>
                            <Tab label="Krediti" style={{ color: 'red' }}/>
                        
                            <NeZaposlen />
                        </StyledTabs>
                        </AppBar>
                        <Tabela krediti={krediti} onClickRed={handleRedClick} /> 
                    </StyledTable>
                 </TableWrapper>
                 
                  </div>}

        </div>
    );
}

export default ListaKredita;
