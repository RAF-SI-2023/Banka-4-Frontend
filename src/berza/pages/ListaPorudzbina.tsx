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
import { Company as Firma } from 'utils/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { hasPermission } from "utils/permissions";
import { EmployeePermissionsV2 } from "utils/types";
import { jwtDecode } from "jwt-decode";
import { Employee, UserRoutes, BankRoutes } from "utils/types";

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

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [futures, setFutures] = useState<any[]>([]);
  const [futures2, setFutures2] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [permission_odobri, setPermissionOdobri] = useState<boolean>(false);
  const [permission_odbij, setPermissionOdbij] = useState<boolean>(false);
  const [emails, setEmails] = useState<{ [key: string]: string }>({});
  const [firme, setFirme] = useState<Firma[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = getMe();
        if (!me) return;

        const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;

        const orders = await makeGetRequest(`/orders/all`);
        const futures = await makeGetRequest(`/futures/kupac/` + worker.firmaId);
        const futures2 = await makeGetRequest(`/futures/request`);
        const firme = await makeGetRequest(`/racuni/izlistajSveFirme`);

        console.log('Fetched Data:', { orders, futures, futures2, firme });

        if (orders) setOrders(orders);
        if (futures) setFutures(futures);
        if (futures2) setFutures2(futures2);
        if (firme) setFirme(firme);

        const token = localStorage.getItem('si_jwt');
        if (token) {
          const decodedToken = jwtDecode(token) as DecodedToken;
          setPermissionOdobri(hasPermission(decodedToken.permission, [EmployeePermissionsV2.accept_orders]));
          setPermissionOdbij(hasPermission(decodedToken.permission, [EmployeePermissionsV2.deny_orders]));
        }

        const emailMap: { [key: string]: string } = {};
        const emailPromises = orders.map(async (order: { userId: number; }) => {
          if (order.userId >= 0) {
            const email = await generateEmailOfId(order.userId);
            emailMap[order.userId] = email;
          } else {
            const firma = firme.find((firma: { id: number; }) => firma.id === order.userId);
            emailMap[order.userId] = firma ? firma.nazivPreduzeca : "FIRMA";
          }
        });

        await Promise.all(emailPromises);
        console.log('Email Map:', emailMap);
        setEmails(emailMap);

      } catch (error) {
        console.error('Error fetching data:', error);
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
      const response = await makeApiRequest('/futures/approve/' + futureId, 'PUT');
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
      const response = await makeApiRequest('/futures/deny/' + futureId, 'PUT');
      if (response.status === 200) {
        window.location.reload();
      }
      setError(null);
    } catch (error) {
      setError('Failed to reject future');
      console.error(error);
    }
  };

  async function generateEmailOfId(orderId: number): Promise<string> {
    try {
      const data = await makeGetRequest(`${UserRoutes.user}/id/${orderId}`);
      return data.email;
    } catch (error) {
      console.error('Error fetching email for order ID:', orderId, error);
      return 'Error fetching email';
    }
  }

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
              <StyledTableCell>Korisnik</StyledTableCell>
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
                <TableCell>{emails[order.userId]}</TableCell>
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

      <StyledHeading variant="h4">Terminski ugovori</StyledHeading>
      <Paper elevation={3}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Contract Size</StyledTableCell>
              <StyledTableCell>Contract Unit</StyledTableCell>
              <StyledTableCell>Settlement Date</StyledTableCell>
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
                <TableCell>{new Date(future.settlementDate).toLocaleDateString()}</TableCell>
        
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Paper>

      <StyledHeading variant="h4">Zahtevi terminskih ugovora</StyledHeading>
      <Paper elevation={3}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Contract Size</StyledTableCell>
              <StyledTableCell>Contract Unit</StyledTableCell>
              <StyledTableCell>Settlement Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {futures2.map(future => (
              <StyledTableRow key={future.futuresContractDto.id}>
                <TableCell>{future.futuresContractDto.type}</TableCell>
                <TableCell>{future.futuresContractDto.name}</TableCell>
                <TableCell>{future.futuresContractDto.price}</TableCell>
                <TableCell>{future.futuresContractDto.contractSize}</TableCell>
                <TableCell>{future.futuresContractDto.contractUnit}</TableCell>
                <TableCell>{new Date(future.futuresContractDto.settlementDate).toLocaleDateString()}</TableCell>
                <TableCell>{future.status}</TableCell>
                <TableCell>
                  {future.status.toLowerCase() === 'not_approved' && (
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
    </PageContainer>
  );
};

export default OrdersPage;