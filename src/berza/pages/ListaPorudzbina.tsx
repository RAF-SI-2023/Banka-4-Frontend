import React, { useEffect, useState } from 'react';
import { Tab, Table, TableBody, TableRow, TableCell, TableHead, Typography, Alert, Button } from '@mui/material';
import { getMe } from "utils/getMe";
import { makeGetRequest, makeApiRequest } from "utils/apiRequest";
import { Order } from "berza/types/types";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { hasPermission } from "utils/permissions";
import { EmployeePermissionsV2 } from "utils/types";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    permission: number;
}

const auth = getMe();

const ButtonTab = styled(Tab)`
  background-color: #718bb0!important;
  color: white!important;
  border-radius: 13px!important;
  &:hover{
    background-color: #39547a!important;
  }
`

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await makeGetRequest(`/orders/all`);
                const futures = await makeGetRequest(`/futures/kupac`);
                console.log(orders, futures);
                if (orders) {
                    setOrders(orders);
                }
                if (futures) {
                    setFutures(futures);
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
        <div>
            <Typography variant="h4" gutterBottom>Porudžbine</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tip</TableCell>
                        <TableCell>Tiker</TableCell>
                        <TableCell>Količina</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.action}</TableCell>
                            <TableCell>{order.ticker}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>
                                {order.status.toLowerCase() === 'pending' && (
                                    <>
                                        {permission_odobri && <Button variant="contained" color="primary" onClick={() => handleApproveOrder(order.id)}>Odobri</Button>}
                                        {permission_odbij && <Button variant="contained" color="error" onClick={() => handleRejectOrder(order.id)}>Poništi</Button>}
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Typography variant="h4" gutterBottom>Futures</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Contract Size</TableCell>
                        <TableCell>Contract Unit</TableCell>
                        <TableCell>Open Interest</TableCell>
                        <TableCell>Settlement Date</TableCell>
                        <TableCell>Maintenance Margin</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {futures.map(future => (
                        <TableRow key={future.id}>
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
                                        {permission_odobri && <Button variant="contained" color="primary" onClick={() => handleApproveFuture(future.id)}>Odobri</Button>}
                                        {permission_odbij && <Button variant="contained" color="error" onClick={() => handleRejectFuture(future.id)}>Poništi</Button>}
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrdersPage;
