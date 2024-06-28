import { Table, TableRow, TableBody, Typography, Button } from "@mui/material";
import { UserStock2, Future } from "berza/types/types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { makeGetRequest } from "utils/apiRequest";
import { getMe } from "utils/getMe";
import {
  ScrollContainer,
  StyledTableHead,
  StyledHeadTableCell,
  StyledTableRow,
  StyledTableCell,
} from "utils/tableStyles";
const hartijeEmployee = ["Akcije", "Terminski ugovori"];
const hartije = ["Akcije"];
const hartijeOdVrednosti = "Hartije od vrednosti";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  margin-bottom: 50px;
  gap: 1rem;
`;
const TitleTableDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 100px;
  width: 100%;
`;

const ProfitHartijeTable = () => {
  const [hartija, setHartija] = useState<string>(hartijeOdVrednosti);
  const [userStocks, setUserStocks] = useState<UserStock2[]>([]);
  const [futures, setFutures] = useState<Future[]>([]);
  const auth = getMe();
  console.log(auth?.permission);

  const calculateFuturesSum = () => {
    let futuresSum = 0;
    futures && futures.map((future) => (futuresSum += future.price));
    return futuresSum;
  };

  const calculateStocksSum = () => {
    let stocksSum = 0;
    userStocks.map((userStock) => (stocksSum += userStock.currentBid));
    return stocksSum;
  };

  useEffect(() => {
    if (auth?.permission) {
      const fetchStocks = async () => {
        try {
          const stocksData = await makeGetRequest(`/user-stocks/-1`);
          stocksData && setUserStocks(stocksData);
        } catch (error) {
          console.error("Error fetching user stocks:", error);
        }
      };

      const fetchFutures = async () => {
        try {
          const futuresData = await makeGetRequest(`/futures/kupac/-1`);
          futuresData && setFutures(futuresData);
        } catch (error) {
          console.error("Error fetching user futures:", error);
        }
      };
      fetchStocks();
      fetchFutures();
    } else {
      const fetchStocks = async () => {
        try {
          const stocksData = await makeGetRequest(`/user-stocks/${auth?.id}`);
          stocksData && setUserStocks(stocksData);
        } catch (error) {
          console.error("Error fetching user stocks:", error);
        }
      };
      fetchStocks();
    }
  }, []);

  function EnhancedTableToolbar() {
    return (
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="h6"
        component="div"
      >
        {hartija}
      </Typography>
    );
  }
  return (
    <PageWrapper>
      <TitleTableDiv>
        <EnhancedTableToolbar />
        <ScrollContainer style={{}}>
          {hartija === "Akcije" ? (
            <Table sx={{ minWidth: 250, marginTop: 0 }}>
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    Kolicina
                  </StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    Current Ask
                  </StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    Current Bid
                  </StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {userStocks.map((stock: UserStock2) => (
                  <StyledTableRow key={stock.ticker}>
                    <StyledTableCell component="th" scope="row">
                      {stock.ticker}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {stock.quantity}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {stock.currentAsk}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {stock.currentBid}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : hartija === "Terminski ugovori" && auth?.permission ? (
            <Table sx={{ minWidth: 250, marginTop: 0 }} aria-labelledby="h6">
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>Name</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">Type</StyledHeadTableCell>
                  <StyledHeadTableCell>Price</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    ContractSize
                  </StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    ContractUnit
                  </StyledHeadTableCell>
                  <StyledHeadTableCell>OpenInterest</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    ContractUnit
                  </StyledHeadTableCell>
                  <StyledHeadTableCell>OpenInterest</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    SettlementDate
                  </StyledHeadTableCell>
                  <StyledHeadTableCell>MaintenanceMargin</StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {futures.map((future: Future) => (
                  <StyledTableRow key={future.name}>
                    <StyledTableCell component="th" scope="row">
                      {future.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {future.type}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {future.price}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {future.contractSize}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {future.contractUnit}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {future.openInterest}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {future.settlementDate}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {future.maintenanceMargin}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table sx={{ minWidth: 250, marginTop: 0 }} aria-labelledby="h6">
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>
                    Hartije od vrednosti
                  </StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    Ukupna vrednost
                  </StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {auth?.permission
                  ? hartijeEmployee.map((hartija: string) => (
                      <StyledTableRow key={hartija}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          onClick={() => setHartija(hartija)}
                        >
                          {hartija}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {hartija === "Akcije"
                            ? calculateStocksSum()
                            : calculateFuturesSum()}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : hartije.map((hartija: string) => (
                      <StyledTableRow key={hartija}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          onClick={() => setHartija(hartija)}
                        >
                          {hartija}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {calculateStocksSum()}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          )}
        </ScrollContainer>
      </TitleTableDiv>
      <Button
        onClick={() => setHartija(hartijeOdVrednosti)}
        disabled={hartija === hartijeOdVrednosti}
      >
        Nazad na hartije
      </Button>
    </PageWrapper>
  );
};

export default ProfitHartijeTable;


