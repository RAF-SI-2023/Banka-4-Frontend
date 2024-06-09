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
      <Box>
        <Typography>Valute: </Typography>
        <StyledTextField
          id="valute"
          select
          defaultValue={"Valute..."}
          onChange={(e) => {
            const selected = exchages.find(
              (exchage: ExchangeRate) => exchage.currencyCode === e.target.value
            );
            selected && setSelectedCurrency(selected.currencyCode);
          }}
        >
          <MenuItem disabled value={"RSD"} key="default">
            RSD
          </MenuItem>
          {exchages?.map((exchage: ExchangeRate) => (
            <MenuItem key={exchage.currencyCode} value={exchage.currencyCode}>
              {exchage.currencyCode}
            </MenuItem>
          ))}
        </StyledTextField>
        <StyledButtonsDiv>
          <Button onClick={() => fetchProfit()}>Pregledajte profite</Button>
        </StyledButtonsDiv>
      </Box>
      <Container>
        <ProfitTable {...{ profits }} />
      </Container>
    </PageWrapper>
  );
};
export default ProfitPage;
