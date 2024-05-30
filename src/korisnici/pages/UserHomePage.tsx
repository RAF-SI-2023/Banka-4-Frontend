import { useEffect, useState } from "react";
import { getMe } from "utils/getMe";
import { makeGetRequest } from "utils/apiRequest";
import styled from "styled-components";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Account, BankRoutes } from "utils/types";
import CurrencyConverter from "korisnici/components/CurrencyConverter";

import { ScrollContainer } from "utils/tableStyles";

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

const UserHomePage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const me = getMe();
      if (!me)
        return;
      const data = await makeGetRequest(`${BankRoutes.account_find_user_account}/${me.id}`)
      if (data) {
        setAccounts(data);
      }
    } catch (error) {
    }
  };

  const handleSelect = (account: Account) => {
    localStorage.setItem('selectedAccount', JSON.stringify(account));
    navigate(`/stranica-za-pojedinacni-racun`)
  };


  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <PageWrapper>
      <HeadingText>
        Lista Racuna
      </HeadingText>
      <FormWrapper>
        <ScrollContainer >
          <Table aria-label="user account table">
            <TableHead>
              <TableRow>
                <StyledTableCentered>Broj racuna</StyledTableCentered>
                <StyledTableCentered>Stanje</StyledTableCentered>
                <StyledTableCentered>Raspolozivo stanje</StyledTableCentered>

              </TableRow>
            </TableHead>
            <TableBody>
              {accounts?.map((account, index) => (
                <TableRow key={account.brojRacuna}>
                  <HighlightableStyledTableCentered className={"idRacunaTd"+index} id={account.brojRacuna} component="th" scope="row" onClick={() => handleSelect(account)}>
                    {account.brojRacuna}
                  </HighlightableStyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {account.stanje}
                  </StyledTableCentered>
                  <StyledTableCentered component="th" scope="row">
                    {account.raspolozivoStanje}
                  </StyledTableCentered>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollContainer>
        <CurrencyConverter />
      </FormWrapper >
    </PageWrapper >
  );
};

export default UserHomePage;
