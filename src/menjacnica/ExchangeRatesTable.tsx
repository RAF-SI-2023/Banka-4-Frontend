import { Fragment, useEffect, useState } from "react";
import { makeGetRequest } from "../utils/apiRequest";
import { ExchangeRate } from "utils/types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const ExchangeRatesTable = () => {
  const [exchages, setExhanges] = useState<ExchangeRate[]>([]);

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

  useEffect(() => {
    fetchExchange();
  }, []);

  return (
    <Fragment>
      <Typography variant="h6">Kursna lista</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Valuta</TableCell>
              <TableCell>Kurs</TableCell>
            </TableRow>
          </TableHead>
        
          <TableBody>
            {exchages.map((exchange1, index1) =>
              exchages.slice(index1 + 1).map((exchange2, index2) => (
                <TableRow key={index2}>
                  <TableCell>
                    {exchange1.currencyCode}-{exchange2.currencyCode}
                  </TableCell>
                  <TableCell>{exchange2.rate / exchange1.rate}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};
export default ExchangeRatesTable;
