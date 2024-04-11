import { useEffect, useState } from "react";
import { makeGetRequest } from "../utils/apiRequest";
import { ExchangeRate } from "utils/types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ExchangeRatesTable = () => {
  const [currencyRates, setCurrencyRates] = useState<ExchangeRate[]>([]);

  const fetchExchange = async () => {
    try {
      const data = await makeGetRequest(`/exchange`);
      if (data) {
        setCurrencyRates(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExchange();
  }, []);

  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">
              Exchange rate in relation to dinar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyRates?.map((rate) => (
            <TableRow key={rate.currencyCode}>
              <TableCell component="th" scope="row">
                {rate.currencyCode}
              </TableCell>
              <TableCell align="right">{rate.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ExchangeRatesTable;
