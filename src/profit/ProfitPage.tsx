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
      }
      catch (e) {

      }
    })()
  }, []);

  ///exchange/invoices/{currency}
  const fetchProfit = async () => {
    try {
      const data = await makeGetRequest(
        `/exchange/invoices/${selectedCurrecy}`
      );
      data && setProfits(data);
      //@ts-ignore
      setProfitValute(data.reduce((p, t) => p + t.profit, 0).toFixed(4))
    } catch (err) { }
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
    } catch (error) { }
  };

  return (
    <PageWrapper>
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
            Profit banke
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
          <Button onClick={() => fetchProfit()}>Pregledajte profite</Button>
        </StyledButtonsDiv>
      </StyledDiv>
      <Container>
        <ProfitTable {...{ profits }} />
      </Container>
    </PageWrapper>
  );
};
export default ProfitPage;
