import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
} from "@mui/material";
import { Option2, Order, UserStock2 } from "berza/types/types";
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

const OrdersTable = ({ selectedStock }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [foundOrders, setFoundOrders] = useState<Order[]>([]);
  const auth = getMe();

  const findActions = () => {
    const foundOrder = orders.filter(
      (orders) => orders.ticker === selectedStock.ticker
    );

    foundOrder && setFoundOrders(foundOrder);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      if (auth?.permission) {
        const worker = (await makeGetRequest(
          `${UserRoutes.worker_by_email}/${auth?.sub}`
        )) as Employee;
        try {
          const ordersData = await makeGetRequest(`/orders/${worker.firmaId}`);
          if (ordersData) {
            setOrders(ordersData);
            findActions();
          }
        } catch (error) {
          console.error("Error fetching user orders:", error);
        }
      } else {
        try {
          const ordersData = await makeGetRequest(`/orders/${auth?.id}`);
          ordersData && setOrders(ordersData);
          findActions();
        } catch (error) {
          console.error("Error fetching user orders:", error);
        }
      }
    };
    fetchOptions();
  }, []);

  function EnhancedTableToolbar() {
    return (
      <Typography sx={{ flex: "1 1 100%" }} color="inherit" component="div">
        Istorija porudžbina
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
                <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                <StyledHeadTableCell>Kolicina</StyledHeadTableCell>
                <StyledHeadTableCell>Limit</StyledHeadTableCell>
                <StyledHeadTableCell>Status</StyledHeadTableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {foundOrders.length > 0 ? (
                foundOrders.map((order, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{order.ticker}</StyledTableCell>
                    <StyledTableCell>{order.quantity}</StyledTableCell>
                    <StyledTableCell>{order.limit}</StyledTableCell>
                    <StyledTableCell>{order.status}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow key={"Nema"}>
                  {" "}
                  <StyledTableCell
                    colSpan={4}
                    style={{ backgroundColor: "#e2e2e2" }}
                  >
                    Nema porudžbina
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

export default OrdersTable;

