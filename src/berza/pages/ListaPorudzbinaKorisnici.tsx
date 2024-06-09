import React, { useEffect, useState } from 'react';
import { getMe } from "utils/getMe";
import { makeGetRequest } from "utils/apiRequest";
import { Table, TableBody, TableRow, TableCell, TableHead, Typography, Alert } from '@mui/material';
import { Order } from "berza/types/types";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Tab } from '@mui/material';

const auth = getMe();

const ButtonTab = styled(Tab)`
  background-color: #718bb0!important;
  color: white!important;
  border-radius: 13px!important;
  &:hover{
    background-color: #39547a!important;
  }
`
// Komponenta za prikazivanje porudžbina
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
                //console.error(error);
            }
        };
        fetchData();
    }, []);

    
const navigate = useNavigate();

    return (
        <div>
            <ButtonTab
                            id="dodajKarticuDugme"
                            onClick={() => {
                                navigate("/NewOrder");
                            }}
                            label="Dodaj Karticu"
                            />
            <Typography variant="h4" gutterBottom>Porudžbine</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tip</TableCell>
                        <TableCell>Tiker</TableCell>
                        <TableCell>Količina</TableCell>
                        <TableCell>Status</TableCell>
           
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.action}</TableCell>
                            <TableCell>{order.ticker}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.status}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrdersPageKorisnici;
