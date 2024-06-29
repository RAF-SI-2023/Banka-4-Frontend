import {
  Box,
  Typography,
  MenuItem,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { makeApiRequest, makeGetRequest } from "utils/apiRequest";
import { BankRoutes, ExchangeRate, Profit } from "utils/types";
import ProfitTable from "./ProfitTable";
import styled from "styled-components";
import { AppBar, Tabs, Tab } from '@mui/material';

const ButtonTab = styled(Button)`
  background-color: white!important;
  color: #AC190C!important;
  border-radius: 5px!important;
  
  &:hover{
    background-color: #EEEEEE!important;
  }
`
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

const StyledButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledManuItem = styled(MenuItem)`
  width: 10rem;
`

const StyledDiv = styled.div`
  display: flex;
`

const CenteredDiv = styled.div`
  display: flex;
  margin-bottom: 5%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProfitPage = () => {
  const [exchages, setExhanges] = useState<ExchangeRate[]>([]);
  const [selectedCurrecy, setSelectedCurrency] = useState<string>("RSD");
  const [profits, setProfits] = useState<Profit[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [profitValute, setProfitValute] = useState<null | number>(null)

  useEffect(() => {
    fetchExchange();
    (async () => {
      try {
        setTotalProfit(await makeGetRequest(BankRoutes.get_total_profit) || 0);
      } catch (e) {
        console.error(e);
      }
    })();
    
    (async () => {
      try {
        const response = await makeGetRequest('/marzniRacuni/bank-profit');
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const fetchProfit = async () => {
    try {
      const data = await makeGetRequest(
        `/exchange/invoices/${selectedCurrecy}`
      );
      data && setProfits(data);
      //@ts-ignore
      setProfitValute(data.reduce((p, t) => p + t.profit, 0).toFixed(4));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExchange = async () => {
    try {
      const data: ExchangeRate[] = await makeGetRequest(`/exchange`);
      if (data) {
        const uniqueData = Array.from(
          new Map(
            data.map((item: ExchangeRate) => [item.currencyCode, item])
          ).values()
        );
        setExhanges(uniqueData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageWrapper>

      <CenteredDiv>
        <Typography variant="h5">
          Ukupan profit banke je: {totalProfit} RSD
        </Typography>
      </CenteredDiv>

      <StyledDiv>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="#FAFAFA"
          color="rgba(0, 0, 0, 0.87)"
          width={"320px"}
          p={2}
          paddingRight={"40px"}
          paddingLeft={"40px"}
          borderRadius={2}
        >
          <Typography variant="h6" mb={1}>
            Profit Menjacnice
          </Typography>
          
          <Typography variant="body1">
            Maržni računi: {totalProfit} RSD
          </Typography>
          {(profitValute === null) ? null : <Typography variant="body1">
            Selektovana valuta: {profitValute} RSD
          </Typography>}
        </Box>
        <StyledTextField
          label="Valute:"
          id="valute"
          select
          defaultValue={"RSD"}
          onChange={(e) => {
            const selected = exchages.find(
              (exchage: ExchangeRate) => exchage.currencyCode === e.target.value
            );
            selected && setSelectedCurrency(selected.currencyCode);
          }}
        >
          <StyledManuItem disabled value={"RSD"} key="default">
            RSD
          </StyledManuItem>
          {exchages?.map((exchage: ExchangeRate) => (
            <StyledManuItem key={exchage.currencyCode} value={exchage.currencyCode}>
              {exchage.currencyCode}
            </StyledManuItem>
          ))}
        </StyledTextField>
        <StyledButtonsDiv>
          <ButtonTab onClick={() => fetchProfit()}>Pregledajte profite</ButtonTab>
        </StyledButtonsDiv>
      </StyledDiv>
      
      <Container>
        <ProfitTable {...{ profits }} />
      </Container>
    </PageWrapper>
  );
};
export default ProfitPage;