import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead, Button, Alert } from '@mui/material';
import { Account, BankRoutes, UserRoutes } from '../../utils/types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import ScrollableTableBody from 'utils/ScrollableTableBody';
import KAlert from 'utils/alerts';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 80px;
`

const FormWrapper = styled.div`
    background-color: #fafafa;
    padding: 30px 40px;
    border-radius: 18px;
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const HeadingText = styled.div`
  font-size: 32px;
`
const H2Text = styled.div`
  font-size: 22px;
  text-align: center;
  margin: 6px 0px;
`
const StyledTableCentered = styled(TableCell)`
  text-align: center!important;
  &:not(:last-child){
    border-right: 1px solid #e2e2e2;
  }
`
const HighlightableStyledTableCentered = styled(StyledTableCentered)`
  &:hover{
    background-color: #23395b;
    transition: 200ms;
    color: white;
    cursor: pointer;
  }
`
const StyledTableCell = styled(TableCell)`
  text-align: center!important;
  &:not(:last-child){
    border-right: 1px solid #e2e2e2;
    text-align: left!important;
  }
  &:last-child{
    word-break: break-all;
  }
`

const formatTitle = (title: string): string => {
  // title = title.charAt(0).toUpperCase() + title.slice(1)
  // title = title.replaceAll("_", " ")
  return title
}

//TODO add a conditionals to display buttons only with permissions
const UserInfoTable: React.FC = () => {
  const [user, setUser] = useState([])
  const [uid, setId] = useState(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [jmbg, setJmbg] = useState('')
  const [successPopup, setSucessPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        setJmbg(urlParams?.get('jmbg') ?? '');
        if (jmbg) {
          const res = await makeGetRequest(`/korisnik/jmbg/${jmbg}`);
          setUser(res);
          if (res?.id) {
            setId(res?.id)
            const accs = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${res.id}`);
            setAccounts(accs);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, [jmbg]);

  const navigate = useNavigate();

  const handleEditUser = () => {
    navigate(`/izmeniKorisnika?jmbg=${jmbg}`)
  }

  const handleEditAccount = () => {
    navigate('/izmeniRacun')
  }

  const handleAddAccount = () => {
    if (jmbg) {
      navigate(`/kreirajRacun?jmbg=${jmbg}`)
    }
  }
  const handleDeactivateUser = async () => {
    const res = await makeApiRequest(UserRoutes.user, 'PUT', { ...user, aktivan: false })
    if (res) {
      setSucessPopup(true)
    }
  }

  const handleAccountDetails = (event: any) => {
    const id = event.currentTarget.id;
    navigate(`/racun?broj=${id}&jmbg=${jmbg}`)
  }

  const handleDeactivateAccount = async (brojRacuna: string) => {
    const res = await makeApiRequest(`${BankRoutes.account_find_by_number}/${brojRacuna}`, 'PUT')
    if (res) {
      const accs = await makeGetRequest(`${BankRoutes.account_find_user_account}/${uid}`);
      setAccounts(accs);

      setSucessPopup(true)
    }
  }

  return (
    <PageWrapper>
      <HeadingText>
        Korisnik
      </HeadingText>
      <FormWrapper>
      {successPopup && <KAlert severity="success" exit={() => setSucessPopup(false)}>Uspesno kreiran.</KAlert>}
        <H2Text>
          Info
        </H2Text>
        <TableContainer component={Paper}>
          <Table aria-label="user information table">
            <TableBody>
              {user && Object.entries(user)?.map(([field, info]) => (
                field && field !== 'povezaniRacuni' && <TableRow key={field}>
                  <StyledTableCell component="th" scope="row">
                    {formatTitle(field)}
                  </StyledTableCell>
                  <StyledTableCell>{info}</StyledTableCell>
                  {/* {Array.isArray(info) ? <StyledTableCell>{info.join(", ")}</StyledTableCell> : <StyledTableCell>{info}</StyledTableCell>} */}

                </TableRow>
              ))}
              <TableRow >
                <StyledTableCentered component="th" scope="row">
                  <Button onClick={handleEditUser}>Izmeni korisnika</Button>
                </StyledTableCentered>
                <StyledTableCentered component="th" scope="row" onClick={handleDeactivateUser}>
                  <Button color='error'>Deaktiviraj korisnika</Button>
                </StyledTableCentered>
              </TableRow >
            </TableBody>
          </Table>
        </TableContainer>
        <H2Text>
          Racuni
        </H2Text>
        <TableContainer component={Paper}>
          <Table aria-label="user account table">
            <TableHead>
              <TableRow>
                <StyledTableCentered>Broj racuna</StyledTableCentered>
                <StyledTableCentered>Stanje</StyledTableCentered>
                <StyledTableCentered colSpan={2}>
                  <Button onClick={handleAddAccount} color='success'>Dodaj racun</Button>
                </StyledTableCentered>
              </TableRow>
            </TableHead>
          </Table>
          <ScrollableTableBody>
            <TableBody>
              {accounts?.map((account) => (
                <TableRow key={account.brojRacuna}>
                  <HighlightableStyledTableCentered id={account.brojRacuna} component="th" scope="row" onClick={handleAccountDetails}>
                    {formatTitle(account.brojRacuna)}
                  </HighlightableStyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {formatTitle(account.stanje.toString())}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    <Button onClick={handleEditAccount}>Izmeni</Button>
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    <Button onClick={() => handleDeactivateAccount(account.brojRacuna)} color='error'>Deaktiviraj</Button>
                  </StyledTableCentered>
                </TableRow>
              ))}
            </TableBody>
          </ScrollableTableBody>
        </TableContainer>
      </FormWrapper >
    </PageWrapper >
  );
};
export default UserInfoTable;
