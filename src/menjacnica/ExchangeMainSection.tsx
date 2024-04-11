import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import { getMe } from "../utils/getMe";
import { makeGetRequest } from "../utils/apiRequest";
import { Account, BankRoutes, ExchangeRate } from "utils/types";
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

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

  useEffect(() => {
    fetchAccounts();
    fetchExchange();
  }, []);

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
    <Container>
      <FormControl
        onSubmit={(e) => {
          e.preventDefault();
          setDetaljiTransfera(true);
        }}
      >
        <Box>
          <Typography>Iznos:</Typography>
          <TextField
            rows={1}
            name={"iznos"}
            placeholder={"Upisite iznos..."}
            required={true}
            onChange={(e) => {
              setIznos(e.target.value);
              setIznosError(false);
            }}
          />
          {iznosError && (
            <Typography className="error-text">Iznos je obavezan.</Typography>
          )}
        </Box>
        <Box>
          <Typography>Sa racuna: </Typography>
          <TextField
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
          </TextField>
        </Box>
        <Box>
          <Typography>Na racun: </Typography>
          <TextField
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
          </TextField>
        </Box>
        <Box>
          Trenutni kurs izmedju
          {saRacuna2 ? (
            <Typography>{saRacuna2.currency}</Typography>
          ) : (
            <Typography>Izaberite racun</Typography>
          )}
          i
          {naRacun2 ? (
            <Typography>{naRacun2.currency}</Typography>
          ) : (
            <Typography>Izaberite racun</Typography>
          )}
          : {findExchangeRate(saRacuna2?.currency, naRacun2?.currency)}
        </Box>
        <Box>
          <Button>Odustani</Button>
          <Button type="submit">Nastavi</Button>
        </Box>
      </FormControl>
    </Container>
  );
};
export default ExchangeMainSection;
