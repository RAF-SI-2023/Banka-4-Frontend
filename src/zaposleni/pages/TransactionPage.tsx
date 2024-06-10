import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import styled from 'styled-components';

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
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const HeadingText = styled.div`
  font-size: 32px;
`
const StyledTableCell = styled(TableCell)`
  text-align: center!important;
  &:not(:last-child){
    border-right: 1px solid #e2e2e2;
    text-align: left!important;

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
const Transaction: React.FC = () => {

  const [transakcija, setTransakcija] = useState<Transakcija>({
    nazivPrimaoca: '',
    racunPrimaoca: '',
    iznos: 0,
    pozivNaBroj: '',
    status: '',
    vremeTransakcije: '',
    sifraPlacanja: '',
    svrhaPlacanja: '',
    vremeIzvrsavanja: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transaction = localStorage.getItem('selectedTransaction');
        if (transaction) {
          const transakcija = JSON.parse(transaction)
          setTransakcija(transakcija)
        }
      } catch (error) {
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      <HeadingText>
        Transakcija Info
      </HeadingText>
      <FormWrapper>
        <TableContainer component={Paper}>
          <Table aria-label="transakcija information table">
            <TableBody>
              <TableRow key={'Naziv primaoca'}>
                <StyledTableCell component="th" scope="row">
                  Naziv primaoca
                </StyledTableCell>
                <StyledTableCell>{transakcija.nazivPrimaoca}</StyledTableCell>
              </TableRow>
              <TableRow key={'Broj računa primaoca'}>
                <StyledTableCell component="th" scope="row">
                  Broj računa primaoca
                </StyledTableCell>
                <StyledTableCell>{transakcija.racunPrimaoca}</StyledTableCell>
              </TableRow>
              <TableRow key={'Iznos'}>
                <StyledTableCell component="th" scope="row">
                  Iznos
                </StyledTableCell>
                <StyledTableCell>{transakcija.iznos}</StyledTableCell>
              </TableRow>
              <TableRow key={'Sifra placanja'}>
                <StyledTableCell component="th" scope="row">
                  Sifra placanja
                </StyledTableCell>
                <StyledTableCell>{transakcija.sifraPlacanja}</StyledTableCell>
              </TableRow>
              <TableRow key={'Poziv na broj'}>
                <StyledTableCell component="th" scope="row">
                  Poziv na broj
                </StyledTableCell>
                <StyledTableCell>{transakcija.pozivNaBroj}</StyledTableCell>
              </TableRow>
              <TableRow key={'Svrha placanja'}>
                <StyledTableCell component="th" scope="row">
                  Svrha placanja
                </StyledTableCell>
                <StyledTableCell>{transakcija.svrhaPlacanja}</StyledTableCell>
              </TableRow>
              <TableRow key={'Status'}>
                <StyledTableCell component="th" scope="row">
                  Status
                </StyledTableCell>
                <StyledTableCell>{transakcija.status}</StyledTableCell>
              </TableRow>
              <TableRow key={'Datum i vreme transakcije'}>
                <StyledTableCell component="th" scope="row">
                  Datum i vreme transakcije
                </StyledTableCell>
                <StyledTableCell>{formatDate(transakcija.vremeTransakcije)}</StyledTableCell>
              </TableRow>
              <TableRow key={'Datum i vreme izvrsavanja'}>
                <StyledTableCell component="th" scope="row">
                  Datum i vreme izvrsavanja
                </StyledTableCell>
                <StyledTableCell>{formatDate(transakcija.vremeIzvrsavanja)}</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Transaction;
