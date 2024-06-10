import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styled from 'styled-components';
import { Account } from 'utils/types';
import { getMe } from 'utils/getMe';
import { makeGetRequest } from 'utils/apiRequest';

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

const TableWrapper = styled.div`
   text-align: 'center';
`
const PageWrapper = styled.div`
  padding-bottom: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

type Sredstvo = {
  prviRacun: string,
  drugiRacun: string,
  iznos: number,
  status: string,
  vreme: string,
  vremeIzvrsavanja: string
}

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
  });
  const [emailVlasnika, setEmailVlasnika] = useState('');
  const [transactions, setTransatcions] = useState<Transakcija[]>([]);
  const [sredstva, setSredstva] = useState<Sredstvo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedAccountString = localStorage.getItem('selectedAccount');

      if (storedAccountString) {
        const storedAccount = JSON.parse(storedAccountString);
        setAccount(storedAccount);
        const user = getMe()
        if (user && user.sub) {
          setEmailVlasnika(user.sub);
        }
        try {
          const brojRacuna = storedAccount.brojRacuna;
          const transakcije = await makeGetRequest(`/transaction/getAllUplateByBrojRacuna/${brojRacuna}`);
          const sredstva = await makeGetRequest(`/transaction/getAllPrenosSredstavaByBrojRacuna/${brojRacuna}`);
          if (transakcije) {
            setTransatcions(transakcije)
          }
          if (sredstva) {
            setSredstva(sredstva);
          }
        } catch (error) {
        }
      } else {
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <PageWrapper>
      <h2>Stranica za pojedinacni racun sa pocetnim stanjima</h2>
      <TableWrapper>

        <Table className="custom-table-bank">
          <TableBody>
            <TableRow className="table-row">
              <TableCell className="table-cell">Broj računa:</TableCell>
              <TableCell className="table-cell">{account.brojRacuna}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Stanje:</TableCell>
              <TableCell className="table-cell">{account.stanje}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Raspoloživo stanje:</TableCell>
              <TableCell className="table-cell">{account.raspolozivoStanje}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Datum kad je račun kreiran:</TableCell>
              <TableCell className="table-cell">{new Date(account.datumKreiranja).toLocaleDateString("en-de")}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Datum kad račun ističe:</TableCell>
              <TableCell className="table-cell">{new Date(account.datumIsteka).toLocaleDateString("en-de")}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Valuta računa:</TableCell>
              <TableCell className="table-cell">{account.currency}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Status računa:</TableCell>
              <TableCell className="table-cell">{account.aktivan ? 'Aktivan' : 'Neaktivan'}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Kamatna stopa:</TableCell>
              <TableCell className="table-cell">{account.kamatnaStopa}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Cena održavanja računa:</TableCell>
              <TableCell className="table-cell">{account.odrzavanjeRacuna}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Mejl korisnika:</TableCell>
              <TableCell className="table-cell">{emailVlasnika}</TableCell>
            </TableRow>
            <TableRow className="table-row">
              <TableCell className="table-cell">Mejl zaposlenog:</TableCell>
              <TableCell className="table-cell">{account.zaposleni}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3>Podaci o transakciji:</h3>
        <Table className="custom-table-bank">
          <TableHead>
            <TableRow className="table-row">
              <th className="table-cell">Naziv primaoca</th>
              <th className="table-cell">Broj računa primaoca</th>
              <th className="table-cell">Iznos</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Datum i vreme transakcije</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((transakcija, index) => (
              <TableRow key={index} className="table-row">
                <TableCell className="table-cell">{transakcija.nazivPrimaoca}</TableCell>
                <TableCell className="table-cell">{transakcija.racunPrimaoca}</TableCell>
                <TableCell className="table-cell">{transakcija.iznos.toString()}</TableCell>
                <TableCell className="table-cell">{transakcija.status}</TableCell>
                <TableCell className="table-cell">{formatDate(transakcija.vremeTransakcije)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table className="custom-table-bank" sx={{ mt: 2 }}>
          <TableHead>
            <TableRow className="table-row">
              <th className="table-cell">Prvi racun</th>
              <th className="table-cell">Drugi racun</th>
              <th className="table-cell">Iznos</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Datum i vreme transakcije</th>
              <th className="table-cell">Datum i vreme izvrsavanja</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {sredstva?.map((sredstvo, index) => (
              <TableRow key={index} className="table-row">
                <TableCell className="table-cell">{sredstvo.prviRacun}</TableCell>
                <TableCell className="table-cell">{sredstvo.drugiRacun}</TableCell>
                <TableCell className="table-cell">{sredstvo.iznos.toString()}</TableCell>
                <TableCell className="table-cell">{sredstvo.status}</TableCell>
                <TableCell className="table-cell">{formatDate(sredstvo.vreme)}</TableCell>
                <TableCell className="table-cell">{formatDate(sredstvo.vremeIzvrsavanja)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableWrapper>
    </PageWrapper>
  );


}

export default AccountInfoPage;
