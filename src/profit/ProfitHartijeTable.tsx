import {
  Table,
  TableRow,
  TableBody,
  Typography,
  Button,
  TableCell,
} from "@mui/material";
import HartijePopup from "berza/pages/hartije/HartijePopup";
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
import { UserRoutes, Employee } from "utils/types";
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

const StyledTableCellDynamic = styled(TableCell)<{
  settlementDate: number;
}>`
  ${(props) => `
    &:not(:last-child) {
      border-right: 1px solid #e2e2e2;
    }
    background-color: ${isWithinTwoDays(props.settlementDate)};
    `}
`;

function isWithinTwoDays(settlementDate: number): string {
  const date = new Date(settlementDate);
  const today = new Date();

  const differenceMs = date.getTime() - today.getTime();
  const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

  if (differenceDays <= 2 && differenceDays >= 0) return "#FFF9C4";
  if (date.getTime() < today.getTime()) return "#FFCCCB";
  return "#ffffff";
}

const ProfitHartijeTable = () => {
  const [hartija, setHartija] = useState<string>(hartijeOdVrednosti);
  const [userStocks, setUserStocks] = useState<UserStock2[]>([]);
  const [futures, setFutures] = useState<Future[]>([]);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<UserStock2>({
    id: 0,
    ticker: "string",
    quantity: 0,
    currentBid: 0,
    currentAsk: 0,
  });
  const auth = getMe();

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
        const worker = (await makeGetRequest(
          `${UserRoutes.worker_by_email}/${auth?.sub}`
        )) as Employee;
        try {
          const stocksData = await makeGetRequest(
            `/user-stocks/${worker.firmaId}`
          );
          stocksData && setUserStocks(stocksData);
        } catch (error) {
          console.error("Error fetching user stocks:", error);
        }
      };

      const fetchFutures = async () => {
        try {
          const worker = (await makeGetRequest(
            `${UserRoutes.worker_by_email}/${auth?.sub}`
          )) as Employee;
          const futuresData = await makeGetRequest(
            `/futures/kupac/${worker.firmaId}`
          );
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
        <ScrollContainer>
          {hartija === "Akcije" ? (
            <Table sx={{ minWidth: 250, marginTop: 0 }}>
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                  <StyledHeadTableCell>Kolicina</StyledHeadTableCell>
                  <StyledHeadTableCell>
                    Trenutna ukupna cena
                  </StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {userStocks.length > 0 ? (
                  userStocks.map((stock: UserStock2) => (
                    <StyledTableRow
                      key={stock.ticker}
                      onClick={() => {
                        setPopupOpen(true);
                        setSelectedStock(stock);
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {stock.ticker}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {stock.quantity}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {stock.currentAsk}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow key={"Nema"}>
                    <StyledTableCell
                      colSpan={4}
                      style={{ backgroundColor: "#e2e2e2" }}
                    >
                      Nema akcija
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          ) : hartija === "Terminski ugovori" && auth?.permission ? (
            <Table sx={{ minWidth: 250, marginTop: 0 }} aria-labelledby="h6">
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>Naziv</StyledHeadTableCell>
                  <StyledHeadTableCell>Tip</StyledHeadTableCell>
                  <StyledHeadTableCell>Cena</StyledHeadTableCell>
                  <StyledHeadTableCell>Datum namirenja</StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {futures.length > 0 ? (
                  futures.map((future: Future) => (
                    <StyledTableRow
                      key={future.name}
                      onClick={() => setPopupOpen(true)}
                    >
                      <StyledTableCell component="th" scope="row">
                        {future.name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {future.type}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {future.price}
                      </StyledTableCell>

                      <StyledTableCellDynamic
                        component="th"
                        scope="row"
                        settlementDate={future.settlementDate}
                      >
                        {new Date(future.settlementDate).toLocaleDateString("en-de")}
                      </StyledTableCellDynamic>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow key={"Nema"}>
                    <StyledTableCell
                      colSpan={4}
                      style={{ backgroundColor: "#e2e2e2" }}
                    >
                      Nema terminskih ugovora
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Table sx={{ minWidth: 250, marginTop: 0 }} aria-labelledby="h6">
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>
                    Hartije od vrednosti
                  </StyledHeadTableCell>
                  <StyledHeadTableCell>Ukupna vrednost</StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {auth?.permission
                  ? hartijeEmployee.map((hartija: string) => (
                      <StyledTableRow
                        key={hartija}
                        onClick={() => setHartija(hartija)}
                      >
                        <StyledTableCell component="th" scope="row">
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
                      <StyledTableRow
                        key={hartija}
                        onClick={() => setHartija(hartija)}
                      >
                        <StyledTableCell component="th" scope="row">
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
      {popupOpen && <HartijePopup {...{ setPopupOpen, selectedStock }} />}
    </PageWrapper>
  );
};

export default ProfitHartijeTable;

