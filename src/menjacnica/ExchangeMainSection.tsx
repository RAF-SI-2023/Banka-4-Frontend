import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import { getMe } from "../utils/getMe";
import { makeGetRequest } from "../utils/apiRequest";
import styled from "styled-components";
import { Account, BankRoutes, ExchangeRate } from "utils/types";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Console } from "console";

const StyledParagraph = styled.p`
  margin-left: 2.5px;
  margin-right: 2.5px;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const StyledError = styled.p`
  color: red;
  margin-left: 2.5px;
  margin-right: 2.5px;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const StyledButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
`;

const StyledTextField = styled(TextField)`
  margin-left: auto !important;
  margin-right: 20px !important;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  max-width: 100px;
`;

const FormWrapper = styled.div`
  background-color: #fafafa;
  padding: 30px;
  border-radius: 18px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
  padding-bottom: 60px;
`;

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  setIznos: (iznos: string) => void;
  setSaRacunaBrRacuna: (saRacunaBrRacuna: string) => void;
  setNaRacunBrRacuna: (naRacunBrRacuna: string) => void;
  setSaRacunaValuta: (saRacunaValuta: string) => void;
  setNaRacunValuta: (naRacunValuta: string) => void;
};

const ExchangeMainSection = ({
  setDetaljiTransfera,
  setIznos,
  setSaRacunaBrRacuna,
  setNaRacunBrRacuna,
  setSaRacunaValuta,
  setNaRacunValuta,
}: Props) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [iznosError, setIznosError] = useState<boolean>(false);
  const [saRacuna2, setSaRacuna2] = useState<Account>();
  const [naRacun2, setNaRacun2] = useState<Account>();
  const [exchages, setExhanges] = useState<ExchangeRate[]>([]);
  const [iznos2, setIznos2] = useState<string>("");
  const [error, setError] = useState<String>("");

  useEffect(() => {
    fetchAccounts();
    fetchExchange();
  }, []);

  const handleSetError = () => {
     
      // Provera pojedinačnih polja
      if (!saRacuna2) {
        setError("Morate da unesete broj računa sa kog šaljete novac.");
      } else if (!naRacun2) {
        setError("Morate da unesete broj računa na koji šaljete novac.");
      } else if (!iznos2 || iznos2.trim() === '') {
        setError("Morate da unesete iznos.");
      } else if (/[^0-9]/.test(iznos2)) { // Provera da li je iznos2 broj
        setError("Iznos mora biti numerička vrednost.");
      } else {
        console.log("AAAAAAAAAAAAAA");
        console.log(parseFloat(iznos2.trim()));
      setDetaljiTransfera(true);
      }

  };
  const fetchExchange = async () => {
    try {
      const data = await makeGetRequest(`/exchange`);
      if (data) {
        setExhanges(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const user = getMe();
      if (!user) return;
      const data = await makeGetRequest(
        `${BankRoutes.account_find_user_account}/${user.id}`
      );
      if (data) {
        setAccounts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findExchangeRate = (
    currency1: string | undefined,
    currency2: string | undefined
  ) => {
    if (!currency1 || !currency2) return null;
    if (currency1 === "Srpski dinar") currency1 = "RSD";
    if (currency2 === "Srpski dinar") currency1 = "RSD";

    const rate1 = exchages.find(
      (exchage) => exchage.currencyCode === currency1
    )?.rate;

    const rate2 = exchages.find(
      (exchage) => exchage.currencyCode === currency2
    )?.rate;

    if (rate1 && rate2) {
      return rate1 / rate2;
    } else {
      return null;
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Box>
          <Typography>Iznos:</Typography>
          <StyledTextField
            id="iznosTextField"
            rows={1}
            name={"iznos"}
            placeholder={"Upisite iznos..."}
            required={true}
            onChange={(e) => {
              setIznos(e.target.value);
              setIznos2(e.target.value);
              setIznosError(false);
            }}
          />
          {iznosError && (
            <Typography className="error-text">Iznos je obavezan.</Typography>
          )}
        </Box>
        <Box>
          <Typography>Sa racuna: </Typography>
          <StyledTextField
            id="saRacunaTextField"
            select
            defaultValue={"Broj racuna..."}
            onChange={(e) => {
              const selectedAccount = accounts.find(
                (account) => account.brojRacuna === e.target.value
              );
              if (selectedAccount) {
                setSaRacunaBrRacuna(selectedAccount.brojRacuna);
                setSaRacunaValuta(selectedAccount.currency);
                setSaRacuna2(selectedAccount);
              }
            }}
          >
            <MenuItem disabled value={"Broj racuna..."} key="default">
              Broj racuna...
            </MenuItem>
            {accounts?.map((account) => (
              <MenuItem key={account.brojRacuna} value={account.brojRacuna}>
                {account.brojRacuna}, {account.currency}
              </MenuItem>
            ))}
          </StyledTextField>
        </Box>
        <Box>
          <Typography>Na racun: </Typography>
          <StyledTextField
            id="naRacunTextField"
            select
            defaultValue={"Broj racuna..."}
            onChange={(e) => {
              const selectedAccount = accounts.find(
                (account) => account.brojRacuna === e.target.value
              );
              if (selectedAccount) {
                setNaRacunBrRacuna(selectedAccount.brojRacuna);
                setNaRacunValuta(selectedAccount.currency);
                setNaRacun2(selectedAccount);
              }
            }}
          >
            <MenuItem disabled value={"Broj racuna..."} key="default">
              Broj racuna...
            </MenuItem>
            {accounts?.map((account) => (
              <MenuItem key={account.brojRacuna} value={account.brojRacuna}>
                {account.brojRacuna}, {account.currency}
              </MenuItem>
            ))}
          </StyledTextField>
        </Box>
        <StyledDiv>
          <StyledParagraph>Trenutni kurs izmedju</StyledParagraph>
          {saRacuna2 ? (
            <StyledParagraph>{saRacuna2.currency}</StyledParagraph>
          ) : (
            <StyledParagraph style={{ fontStyle: "italic" }}>_</StyledParagraph>
          )}
          <StyledParagraph>i</StyledParagraph>
          {naRacun2 ? (
            <StyledParagraph>{naRacun2.currency}</StyledParagraph>
          ) : (
            <StyledParagraph style={{ fontStyle: "italic" }}>_</StyledParagraph>
          )}
          : {findExchangeRate(saRacuna2?.currency, naRacun2?.currency)}
        </StyledDiv>
        <StyledButtonsDiv>
          
          <StyledButton
            type="submit"
            id="nastaviButton"
            onClick={() =>
              handleSetError()
            }
          >
            Nastavi
          </StyledButton>
        </StyledButtonsDiv>
        <StyledError>{error}</StyledError>
      </FormWrapper>
    </PageWrapper>
  );
};
export default ExchangeMainSection;
