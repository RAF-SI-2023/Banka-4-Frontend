import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead, Button } from '@mui/material';
import { Account } from '../../utils/types';
import styled from 'styled-components';
import { makeGetRequest } from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import { ScrollContainer } from 'utils/tableStyles';
import { Context } from 'App';

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
    width: 1000px;
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
const StyledTableCell = styled(TableCell)`
  text-align: center!important;
  &:not(:last-child){
    border-right: 1px solid #e2e2e2;
    text-align: left!important;

  }
`

const StyledTableRow = styled(TableRow)`
  &:hover{
    background-color: #f2f2f2;
  }
`

type Transakcija = {
  nazivPrimaoca: string,
  racunPrimaoca: string,
  iznos: number,
  pozivNaBroj: string,
  status: string,
  vremeTransakcije: string;
  sifraPlacanja: string;
  svrhaPlacanja: string;
  vremeIzvrsavanja: string;
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


//TODO add a conditionals to display buttons only with permissions
const AccountInfoPage: React.FC = () => {

  const [account, setAccount] = useState<Account>({
    brojRacuna: '',
    stanje: 0,
    raspolozivoStanje: 0,
    datumKreiranja: '',
    datumIsteka: '',
    currency: '',
    vrstaRacuna: '',
    aktivan: true,
    kamatnaStopa: '',
    odrzavanjeRacuna: '',
    zaposleni: -1,
    vlasnik: -1
  })
  const [emailVlasnika, setEmailVlasnika] = useState('')
  const [transactions, setTransatcions] = useState<Transakcija[]>([])
  const navigate = useNavigate();
  const ctx = useContext(Context);

  const handleSelectTransaction = (transaction: Transakcija) => {
    localStorage.setItem('selectedTransaction', JSON.stringify(transaction));
    navigate("/transakcija")
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const brojRacuna = urlParams?.get('broj')
        const jmbg = urlParams?.get('jmbg')
        if (brojRacuna && jmbg) {
          const res = await makeGetRequest(`/racuni/nadjiRacunPoBroju/${brojRacuna}`, ctx);
          if (res) {
            setAccount(res)
            const vlasnik = await makeGetRequest(`/korisnik/jmbg/${jmbg}`, ctx);
            if (vlasnik && vlasnik.email) {
              setEmailVlasnika(vlasnik.email)
              const transakcije = await makeGetRequest(`/transaction/getAllUplateByBrojRacuna/${brojRacuna}`, ctx);
              if (transakcije) {
                setTransatcions(transakcije)
              }
            }
          }
        }
      } catch (error) {
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); return (
    <PageWrapper>
      <HeadingText>
        Racun Info
      </HeadingText>
      <FormWrapper>
        <H2Text>
          Racun
        </H2Text>
        <TableContainer component={Paper}>
          <Table aria-label="account information table">
            <TableBody>
              <TableRow key={'Broj racuna'}>
                <StyledTableCell component="th" scope="row">
                  Broj racuna
                </StyledTableCell>
                <StyledTableCell>{account.brojRacuna}</StyledTableCell>
              </TableRow>
              <TableRow key={'Stanje'}>
                <StyledTableCell component="th" scope="row">
                  Stanje
                </StyledTableCell>
                <StyledTableCell>{account.stanje}</StyledTableCell>
              </TableRow>
              <TableRow key={'Raspolozivo stanje'}>
                <StyledTableCell component="th" scope="row">
                  Raspolozivo stanje
                </StyledTableCell>
                <StyledTableCell>{account.raspolozivoStanje}</StyledTableCell>
              </TableRow>
              <TableRow key={'Datum kreiranja'}>
                <StyledTableCell component="th" scope="row">
                  Datum kreiranja
                </StyledTableCell>
                <StyledTableCell>{new Date(account.datumKreiranja).toLocaleDateString("en-de")}</StyledTableCell>
              </TableRow>
              <TableRow key={'Datum isteka'}>
                <StyledTableCell component="th" scope="row">
                  Datum isteka
                </StyledTableCell>
                <StyledTableCell>{new Date(account.datumIsteka).toLocaleDateString("en-de")}</StyledTableCell>
              </TableRow>
              <TableRow key={'Status racuna'}>
                <StyledTableCell component="th" scope="row">
                  Status racuna
                </StyledTableCell>
                <StyledTableCell>{account.aktivan ? 'Aktivan' : 'Neaktivan'}</StyledTableCell>
              </TableRow>
              {account.kamatnaStopa && <TableRow key={'Kamatna stopa'}>
                <StyledTableCell component="th" scope="row">
                  Kamatna stopa
                </StyledTableCell>
                <StyledTableCell>{account.kamatnaStopa}</StyledTableCell>
              </TableRow>}
              <TableRow key={'Mejl korisnika'}>
                <StyledTableCell component="th" scope="row">
                  Mejl korisnika
                </StyledTableCell>
                <StyledTableCell>{emailVlasnika}</StyledTableCell>
              </TableRow>
              <TableRow key={'Mejl zaposlenog'}>
                <StyledTableCell component="th" scope="row">
                  ID zaposlenog
                </StyledTableCell>
                <StyledTableCell>{account.zaposleni}</StyledTableCell>
              </TableRow>
              <StyledTableCentered colSpan={2} component="th" scope="row">
                <Button color='error'>Deaktiviraj racun</Button>
              </StyledTableCentered>
            </TableBody>
          </Table>
        </TableContainer>
        <H2Text>
          Transakcije
        </H2Text>
        <ScrollContainer>
          <Table aria-label="user account table">
            <TableHead>
              <TableRow>
                <StyledTableCentered>Naziv primaoca</StyledTableCentered>
                <StyledTableCentered>Broj racuna primaoca</StyledTableCentered>
                <StyledTableCentered>Iznos</StyledTableCentered>
                <StyledTableCentered>Poziv na broj</StyledTableCentered>
                <StyledTableCentered>Status</StyledTableCentered>
                <StyledTableCentered>Sifra</StyledTableCentered>
                <StyledTableCentered>Svrha</StyledTableCentered>
                <StyledTableCentered>Datum i vreme transakcije</StyledTableCentered>
                <StyledTableCentered>Datum i vreme izvrsavanja</StyledTableCentered>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map((transakcija) => (
                <StyledTableRow key={transakcija.sifraPlacanja} onClick={() => handleSelectTransaction(transakcija)}>
                  <StyledTableCentered component="th" scope="row">
                    {(transakcija.nazivPrimaoca)}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {(transakcija.racunPrimaoca)}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {(transakcija.iznos.toString())}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {(transakcija.pozivNaBroj)}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {(transakcija.status)}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {(transakcija.sifraPlacanja)}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {(transakcija.svrhaPlacanja)}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {formatDate(transakcija.vremeTransakcije)}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {formatDate(transakcija.vremeIzvrsavanja)}
                  </StyledTableCentered>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollContainer>

      </FormWrapper>
    </PageWrapper>
  );
};

export default AccountInfoPage;
