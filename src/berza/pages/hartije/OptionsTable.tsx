import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
} from "@mui/material";
import { Option2, UserStock2 } from "berza/types/types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { makeGetRequest } from "utils/apiRequest";
import { getMe } from "utils/getMe";
import { UserRoutes, Employee } from "utils/types";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const StyledTableContainer = styled(TableContainer)`
  width: 100%;
`;

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHead = styled(TableHead)`
  background-color: #f5f5f5;
`;

const StyledHeadTableCell = styled(TableCell)`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
`;

const StyledTableCell = styled(TableCell)`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

type Props = {
  selectedStock: UserStock2;
};

const OptionsTable = ({ selectedStock }: Props) => {
  const [options, setOptions] = useState<Option2[]>([]);
  const [foundOptions, setFoundOptions] = useState<Option2[]>([]);
  const auth = getMe();

  const findActions = () => {
    const foundOption = options.find(
      (option) => option.akcijaId === selectedStock.id
    );

    foundOption &&
      setFoundOptions((prevOptions) => [...prevOptions, foundOption]);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      if (auth?.permission) {
        const worker = (await makeGetRequest(
          `${UserRoutes.worker_by_email}/${auth?.sub}`
        )) as Employee;
        try {
          const optionsData = await makeGetRequest(
            `/opcija/sve-opcije-korisnika/${worker.firmaId}`
          );
          if (optionsData) {
            setOptions(optionsData);
            findActions();
          }
        } catch (error) {
          console.error("Error fetching user options:", error);
        }
      } else {
        try {
          const optionsData = await makeGetRequest(
            `/opcija/sve-opcije-korisnika/${auth?.id}`
          );
          optionsData && setOptions(optionsData);
        } catch (error) {
          console.error("Error fetching user options:", error);
        }
      }
    };
    fetchOptions();
  }, []);

  function EnhancedTableToolbar() {
    return (
      <Typography sx={{ flex: "1 1 100%" }} color="inherit" component="div">
        Opcije
      </Typography>
    );
  }
  return (
    <PageWrapper>
      <EnhancedTableToolbar />
      <ScrollContainer>
        <StyledTableContainer>
          <StyledTable>
            <StyledTableHead>
              <TableRow>
                <StyledHeadTableCell>Cena akcije</StyledHeadTableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {foundOptions.length > 0 ? (
                foundOptions.map((option, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      {option.akcijaTickerCenaPrilikomIskoriscenja}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow key={"Nema"}>
                  <StyledTableCell style={{ backgroundColor: "#e2e2e2" }}>
                    Nema opcija
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </ScrollContainer>
    </PageWrapper>
  );
};

export default OptionsTable;

