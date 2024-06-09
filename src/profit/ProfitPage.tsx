import {
  Box,
  Typography,
  MenuItem,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { makeGetRequest } from "utils/apiRequest";
import { ExchangeRate, Profit } from "utils/types";
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
  const [selectedCurrecy, setSelectedCurrency] = useState<string>("");
  const [profits, setProfits] = useState<Profit[]>([]);

  useEffect(() => {
    fetchExchange();
  }, []);

  ///exchange/invoices/{currency}
  const fetchProfit = async () => {
    try {
      const data = await makeGetRequest(
        `/exchange/invoices/${selectedCurrecy}`
      );
      data && setProfits(data);
    } catch (err) {}
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
    } catch (error) {}
  };

  return (
    <PageWrapper>
      <StyledDiv>
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
