import React, { useEffect, useState } from 'react';
import {
  Tab,
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
import { getMe } from "utils/getMe";
import { makeGetRequest, makeApiRequest } from "utils/apiRequest";
import { Order } from "berza/types/types";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { hasPermission } from "utils/permissions";
import { EmployeePermissionsV2 } from "utils/types";
import { jwtDecode } from "jwt-decode";
import { Employee, UserRoutes } from "utils/types";

interface DecodedToken {
  permission: number;
}

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

const checkUserPermissions = (requiredPermissions: EmployeePermissionsV2[]) => {
  const token = localStorage.getItem('si_jwt');
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    console.log(decodedToken);
    return hasPermission(decodedToken.permission, requiredPermissions);
  }
  return false;
};

const permission_odobri = checkUserPermissions([EmployeePermissionsV2.accept_orders]);
const permission_odbij = checkUserPermissions([EmployeePermissionsV2.deny_orders]);

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [futures, setFutures] = useState<any[]>([]);
  const [futures2, setFutures2] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = getMe();
        if (!me) return;

        const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;

        const orders = await makeGetRequest(`/orders/all`);
        const futures = await makeGetRequest(`/futures/kupac/` + worker.firmaId);
        const futures2 = await makeGetRequest(`/futures/request?userId=` + worker.firmaId);

        console.log(orders, futures, futures2);
        if (orders) {
          setOrders(orders);
        }
        if (futures) {
          setFutures(futures);
        }
        if (futures2) {
          setFutures2(futures2);
        }
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleApproveOrder = async (orderId: string) => {
    try {
      const response = await makeApiRequest('/orders/approve/' + orderId, 'POST');
      if (response.status === 200) {
        window.location.reload();
      }
      setError(null);
    } catch (error) {
      setError('Failed to approve order');
      console.error(error);
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      const response = await makeApiRequest('/orders/reject/' + orderId, 'POST');
      if (response.status === 200) {
        window.location.reload();
      }
      setError(null);
    } catch (error) {
      setError('Failed to reject order');
      console.error(error);
    }
  };

  const handleApproveFuture = async (futureId: string) => {
    try {
      const response = await makeApiRequest('/futures/approve/' + futureId, 'POST');
      if (response.status === 200) {
        window.location.reload();
      }
      setError(null);
    } catch (error) {
      setError('Failed to approve future');
      console.error(error);
    }
  };

  const handleRejectFuture = async (futureId: string) => {
    try {
      const response = await makeApiRequest('/futures/reject/' + futureId, 'POST');
      if (response.status === 200) {
        window.location.reload();
      }
      setError(null);
    } catch (error) {
      setError('Failed to reject future');
      console.error(error);
    }
  };

  return (
    <PageContainer maxWidth="lg">
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
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <StyledTableRow key={order.id}>
                <TableCell>{order.action}</TableCell>
                <TableCell>{order.ticker}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.status.toLowerCase() === 'pending' && (
                    <>
                      {permission_odobri && (
                        <ActionButton variant="contained" color="primary" onClick={() => handleApproveOrder(order.id)}>Odobri</ActionButton>
                      )}
                      {permission_odbij && (
                        <ActionButton variant="contained" color="error" onClick={() => handleRejectOrder(order.id)}>Poništi</ActionButton>
                      )}
                    </>
                  )}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Paper>

      <StyledHeading variant="h4">Futures</StyledHeading>
      <Paper elevation={3}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Contract Size</StyledTableCell>
              <StyledTableCell>Contract Unit</StyledTableCell>
              <StyledTableCell>Open Interest</StyledTableCell>
              <StyledTableCell>Settlement Date</StyledTableCell>
              <StyledTableCell>Maintenance Margin</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {futures.map(future => (
              <StyledTableRow key={future.id}>
                <TableCell>{future.type}</TableCell>
                <TableCell>{future.name}</TableCell>
                <TableCell>{future.price}</TableCell>
                <TableCell>{future.contractSize}</TableCell>
                <TableCell>{future.contractUnit}</TableCell>
                <TableCell>{future.openInterest}</TableCell>
                <TableCell>{future.settlementDate}</TableCell>
                <TableCell>{future.maintenanceMargin}</TableCell>
                <TableCell>
                  {future.status.toLowerCase() === 'pending' && (
                    <>
                      {permission_odobri && (
                        <ActionButton variant="contained" color="primary" onClick={() => handleApproveFuture(future.id)}>Odobri</ActionButton>
                      )}
                      {permission_odbij && (
                        <ActionButton variant="contained" color="error" onClick={() => handleRejectFuture(future.id)}>Poništi</ActionButton>
                      )}
                    </>
                  )}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Paper>

      <StyledHeading variant="h4">Futures Requests</StyledHeading>
      <Paper elevation={3}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Ime</StyledTableCell>
              <StyledTableCell>Prezime</StyledTableCell>
              <StyledTableCell>Broj Telefona</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Contract Size</StyledTableCell>
              <StyledTableCell>Contract Unit</StyledTableCell>
              <StyledTableCell>Open Interest</StyledTableCell>
              <StyledTableCell>Settlement Date</StyledTableCell>
              <StyledTableCell>Maintenance Margin</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {futures2.map(future => (
              <StyledTableRow key={future.id}>
                <TableCell>{future.email}</TableCell>
                <TableCell>{future.ime}</TableCell>
                <TableCell>{future.prezime}</TableCell>
                <TableCell>{future.broj_telefona}</TableCell>
                <TableCell>{future.futuresContractDto.type}</TableCell>
                <TableCell>{future.futuresContractDto.name}</TableCell>
                <TableCell>{future.futuresContractDto.price}</TableCell>
                <TableCell>{future.futuresContractDto.contractSize}</TableCell>
                <TableCell>{future.futuresContractDto.contractUnit}</TableCell>
                <TableCell>{future.futuresContractDto.openInterest}</TableCell>
                <TableCell>{future.futuresContractDto.settlementDate}</TableCell>
                <TableCell>{future.futuresContractDto.maintenanceMargin}</TableCell>
                <TableCell>{future.status}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Paper>
    </PageContainer>
  );
};

export default OrdersPage;