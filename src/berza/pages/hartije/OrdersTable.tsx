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
import { UserRoutes, Employee } from "utils/types";

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

const OrdersTable = () => {
  const [orders, setOrders] = useState<Option2[]>([]);
  const auth = getMe();

  const findActions = () => {};

  useEffect(() => {
    const fetchOptions = async () => {
      if (auth?.permission) {
        const worker = (await makeGetRequest(
          `${UserRoutes.worker_by_email}/${auth?.sub}`
        )) as Employee;
        try {
          const ordersData = await makeGetRequest(`/orders/${worker.firmaId}`);
          ordersData && setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching user orders:", error);
        }
      } else {
        try {
          const ordersData = await makeGetRequest(`/orders/${auth?.id}`);
          ordersData && setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching user orders:", error);
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
            {orders.map((order, index) => (
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

export default OrdersTable;

