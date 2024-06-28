import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { Option2 } from "berza/types/types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { makeGetRequest } from "utils/apiRequest";
import { getMe } from "utils/getMe";
import { Account, UserRoutes, Employee, BankRoutes } from "utils/types";

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

const OptionsTable = () => {
  const [options, setOptions] = useState<Option2[]>([]);
  const auth = getMe();

  const findActions = () => {};

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
          optionsData && setOptions(optionsData);
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

  return (
    <ScrollContainer>
      <StyledTableContainer>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <StyledHeadTableCell></StyledHeadTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {options.map((option, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </ScrollContainer>
  );
};

export default OptionsTable;

