import { useEffect, useState } from "react";
import { makeGetRequest } from "../utils/apiRequest";
import { ExchangeRate } from "utils/types";
import { Table, TableBody, TableRow } from "@mui/material";
import {
  ScrollContainer,
  StyledHeadTableCell,
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
} from "utils/tableStyles";

const ExchangeRatesTable = () => {
  const [currencyRates, setCurrencyRates] = useState<ExchangeRate[]>([]);

  const fetchExchange = async () => {
    try {
      const data = await makeGetRequest(`/exchange`);
      if (data) {
        setCurrencyRates(data);
      }
    } catch (error) {
    }
  };
//162
  useEffect(() => {
    fetchExchange();
  }, []);

  return (
    <ScrollContainer style={{ marginTop: 100 }}>
      <Table sx={{ minWidth: 250, marginTop: 0 }}>
        <StyledTableHead>
          <TableRow>
            <StyledHeadTableCell>Valuta</StyledHeadTableCell>
            <StyledHeadTableCell align="right">
              Kurs u odnosu na dinar
            </StyledHeadTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {currencyRates?.map((rate) => (
            <StyledTableRow key={rate.currencyCode}>
              <StyledTableCell component="th" scope="row">
                {rate.currencyCode}
              </StyledTableCell>
              <StyledTableCell align="right">{rate.rate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollContainer>
  );
};
export default ExchangeRatesTable;
