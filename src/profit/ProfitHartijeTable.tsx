import { Table, TableRow, TableBody, Typography } from "@mui/material";
import { UserStock2, Option, Future } from "berza/types/types";
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
const employee = "employee";
const hartije = ["Akcije", "Opcije", "Obaveznice", "Futures ugovori"];

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  margin-bottom: 50px;
`;
const TitleTableDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 100px;
  width: 100%;
`;

const ProfitHartijeTable = () => {
  const [userType, setUserType] = useState<string>("user");
  const [hartija, setHartija] = useState<string>("Hartije od vrednosti");
  const [userStocks, setUserStocks] = useState<UserStock2[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [orders, setOrders] = useState<Option[]>([]);
  const [futures, setFutures] = useState<Future[]>([]);
  const auth = getMe();

  useEffect(() => {
    auth?.permission && setUserType(employee);

    const fetchStocks = async () => {
      try {
        let request =
          userType === employee
            ? `/user-stocks/-1`
            : `/user-stocks/${auth?.id}`;
        const stocks = await makeGetRequest(request);
        stocks && setOptions(stocks);
      } catch (error) {
        console.error("Error fetching user stocks:", error);
      }
    };

    const fetchOptions = async () => {
      try {
        let request =
          userType === employee
            ? `/opcija/sve-opcije-korisnika/-1`
            : `/opcija/sve-opcije-korisnika/${auth?.id}`;
        const fetchedOptions = await makeGetRequest(request);
        fetchedOptions && setOptions(fetchedOptions);
      } catch (error) {
        console.error("Error fetching user options:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        let request =
          userType === employee ? `/orders/-1` : `/orders/${auth?.id}`;
        const orders = await makeGetRequest(request);
        orders && setOrders(orders);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    const fetchFutures = async () => {
      try {
        let request =
          userType === employee
            ? `/futures/kupac/-1`
            : `/futures/kupac/${auth?.id}`;
        const futures = await makeGetRequest(request);
        futures && setFutures(futures);
      } catch (error) {
        console.error("Error fetching user futures:", error);
      }
    };
    // fetchStocks();
    // fetchOptions();
    // fetchOrders();
    // fetchFutures();
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
                  {/* <StyledHeadTableCell align="right">Oznaka</StyledHeadTableCell> */}
                  {/* <StyledHeadTableCell align="right">Naziv</StyledHeadTableCell> */}
                  {/* <StyledHeadTableCell align="right">Berza</StyledHeadTableCell> */}
                  {/* <StyledHeadTableCell align="right">Kolicina u vlasnistvu</StyledHeadTableCell> */}
                  {/* <StyledHeadTableCell align="right">Cena (trenutna)</StyledHeadTableCell> */}
                  {/* <StyledHeadTableCell align="right">Kupljeno za (ukupno)</StyledHeadTableCell> */}
                  {/* <StyledHeadTableCell align="right">Profit</StyledHeadTableCell> */}
                  <StyledHeadTableCell>Ticker</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    Quantity
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
          ) : hartija === "Opcije" ? (
            <Table sx={{ minWidth: 250, marginTop: 0 }} aria-labelledby="h6">
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>AkcijaId</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    akcijaTickerCenaPrilikomIskoriscenja
                  </StyledHeadTableCell>
                  <StyledHeadTableCell>korisnikId</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    opcijaId
                  </StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {options.map((option: Option) => (
                  <StyledTableRow key={option.opcijaId}>
                    <StyledTableCell component="th" scope="row">
                      {option.akcijaId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {option.akcijaTickerCenaPrilikomIskoriscenja}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {option.korisnikId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {option.opcijaId}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : hartija === "Obaveznice" ? (
            <Table sx={{ minWidth: 250, marginTop: 0 }} aria-labelledby="h6">
              <StyledTableHead>
                <TableRow>
                  <StyledHeadTableCell>AkcijaId</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    akcijaTickerCenaPrilikomIskoriscenja
                  </StyledHeadTableCell>
                  <StyledHeadTableCell>korisnikId</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    opcijaId
                  </StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {orders.map((order: Option) => (
                  <StyledTableRow key={order.opcijaId}>
                    <StyledTableCell component="th" scope="row">
                      {order.akcijaId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {order.akcijaTickerCenaPrilikomIskoriscenja}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {order.korisnikId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {order.opcijaId}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : hartija === "Futures ugovori" ? (
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
                  <StyledHeadTableCell>Tip</StyledHeadTableCell>
                  <StyledHeadTableCell align="right">
                    Ukupno
                  </StyledHeadTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {hartije.map((hartija: string) => (
                  <StyledTableRow key={hartija}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      onClick={() => setHartija(hartija)}
                    >
                      {hartija}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollContainer>
      </TitleTableDiv>
    </PageWrapper>
  );
};

export default ProfitHartijeTable;

