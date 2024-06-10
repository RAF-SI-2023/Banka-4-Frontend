import React, { useEffect, useState } from 'react';
import { getMe } from "utils/getMe";
import { makeGetRequest } from "utils/apiRequest";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  Alert,
  Button,
  Paper,
  Container
} from '@mui/material';
import { Order } from "berza/types/types";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Tab } from '@mui/material';

const auth = getMe();

const ButtonTab = styled(Tab)`
  background-color: #718bb0 !important;
  color: white !important;
  border-radius: 13px !important;
  &:hover {
    background-color: #39547a !important;
  }
`;

const StyledTable = styled(Table)`
  margin: 20px 0;
  border: 1px solid #ddd;
`;

const StyledTableCell = styled(TableCell)`
  background-color: #f5f5f5;
  font-weight: bold;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
`;

const ActionButton = styled(Button)`
  margin: 0 5px;
`;

const StyledHeading = styled(Typography)`
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #2c3e50;
`;

const PageContainer = styled(Container)`
  padding: 20px;
`;

const OrdersPageKorisnici: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await makeGetRequest(`/orders/${auth?.id}`);
        console.log(orders);
        if (orders) {
          setOrders(orders);
        }
      } catch (error) {
        setError("Failed to fetch orders");
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <PageContainer maxWidth="lg">
      <ActionButton
        id="dodajKarticuDugme"
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/NewOrder");
        }}
      >
        Dodaj Karticu
      </ActionButton>
      <StyledHeading variant="h4">Porudžbine</StyledHeading>
      {error && <Alert severity="error">{error}</Alert>}
      <Paper elevation={3}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Tip</StyledTableCell>
              <StyledTableCell>Tiker</StyledTableCell>
              <StyledTableCell>Količina</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <StyledTableRow key={order.id}>
                <TableCell>{order.action}</TableCell>
                <TableCell>{order.ticker}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.status}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Paper>
    </PageContainer>
  );
};

export default OrdersPageKorisnici;