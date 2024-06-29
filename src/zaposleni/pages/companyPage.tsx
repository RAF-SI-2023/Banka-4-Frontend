import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead, Button } from '@mui/material';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import KAlert from 'utils/alerts';
import { Account, BankRoutes, Company } from 'utils/types';
import { ScrollContainer } from 'utils/tableStyles';
import { makeApiRequest, makeGetRequest } from 'utils/apiRequest';
import { Context } from 'App';
import { getMe } from 'utils/getMe';

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
const auth = getMe();

const formatTitle = (title: string): string => {
  return title.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(date: string | null): string {
  if (date == null) {
    return "";
  }

  const dateObj = /^\d+$/.test(date) ? new Date(Number(date)) : new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

const jmbg = ''

const CompanyInfoTable: React.FC = () => {
  const location = useLocation();
  const { company } = location.state as { company: Company };
  const [successPopup, setSucessPopup] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>([])
  const navigate = useNavigate();
  const ctx = useContext(Context);


  useEffect(() => {
    const fetchData = async () => {
      if (company.id) {
        const accs = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${company.id}`, ctx);
        setAccounts(accs);

      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company.id]);
  console.log(accounts)


  const handleEditAccount = () => {
    navigate('/izmeniRacun')
  }

  const handleAddAccount = async () => {
    if (company?.id && auth?.id) {
      const data = {
        firma: company.id,
        zaposleni: auth.id
      }
      const res = await makeApiRequest(`/racuni/dodajPravni`, 'POST', data, false, false, ctx)
      if (res && company.id) {
        const accs = await makeGetRequest(`${BankRoutes.account_find_user_account}/${company.id}`, ctx);
        setAccounts(accs);

      }

    }

  }

  const handleAccountDetails = (event: any) => {
    const id = event.currentTarget.id;
    navigate(`/racun?broj=${id}&jmbg=${jmbg}`)
  }

  const handleDeactivateAccount = async (brojRacuna: string) => {
    const res = await makeApiRequest(`${BankRoutes.account_find_by_number}/${brojRacuna}`, 'PUT', {}, false, false, ctx)
    if (res && company.id) {
      const accs = await makeGetRequest(`${BankRoutes.account_find_user_account}/${company.id}`, ctx);
      setAccounts(accs);

    }
  }


  return (
    <PageWrapper>
      <HeadingText>Company</HeadingText>
      <FormWrapper>
        {successPopup && <KAlert severity="success" exit={() => setSucessPopup(false)}>Successfully updated.</KAlert>}
        <H2Text>Info</H2Text>
        <TableContainer component={Paper}>
          <Table aria-label="company information table">
            <TableBody>
              {company && Object.entries(company).map(([field, info]) => (
                field !== 'povezaniRacuni' && <TableRow key={field}>
                  <StyledTableCell component="th" scope="row">
                    {formatTitle(field)}
                  </StyledTableCell>
                  <StyledTableCell>{field === "date_of_establishment" ? new Date(info).toLocaleDateString("en-de") : info}</StyledTableCell>
                </TableRow>
              ))}
              <TableRow>

              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <H2Text>Accounts</H2Text>
        <ScrollContainer>
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
            <TableBody id="RacuniTabela">
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

          </Table>
        </ScrollContainer>
      </FormWrapper>
    </PageWrapper>
  );
};

export default CompanyInfoTable;
