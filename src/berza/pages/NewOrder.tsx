import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from "utils/getMe";
import { makeApiRequest, makeGetRequest } from "utils/apiRequest"; // Funkcija za slanje POST zahteva
import { TextField, Button, Alert, Typography, Container, FormControlLabel, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { BankRoutes, Employee, UserRoutes } from 'utils/types';

const ActionButton = styled(Button)`

  
      background-color: #AC190C!important;
  color: white!important;
  border-radius: 5px!important;
  
  &:hover{
    background-color: #EF2C1A!important;
`;

const auth = getMe();

const CreateOrderPage: React.FC = () => {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState<number | string>('');
    const [limit, setLimit] = useState<number | string>('');
    const [stop, setStop] = useState<number | string>('');
    const [allOrNone, setAllOrNone] = useState(false);
    const [margin, setMargin] = useState(false);
    const [action, setAction] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const validate = () => {
        if (!ticker) return "Ticker is required.";
        if (!quantity || Number(quantity) <= 0) return "Quantity must be a positive number.";
        if (limit && Number(limit) <= 0) return "Limit must be a positive number.";
        if (stop && Number(stop) <= 0) return "Stop must be a positive number.";
        if (!action) return "Action is required.";
        return null;
    };

    const handleCreateOrder = async () => {
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            setSuccess(null);
            return;
        }

        try {
            let userId = 0;
            if (auth?.permission !== 0) {
                const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${auth?.sub}`) as Employee;
                userId = worker.firmaId;
              } else {
                userId = auth.id
              }
            const newOrder = {
                userId: userId || 0,
                ticker,
                quantity: Number(quantity),
                limit: limit ? Number(limit) : undefined,
                stop: stop ? Number(stop) : undefined,
                allOrNone,
                margin,
                action
            };

            await makeApiRequest('/orders/place-order','POST', newOrder); // Pretpostavljam da imate ovu funkciju
            
            setSuccess('Order created successfully');
            setError(null);
           
        } catch (error) {
            setError('Failed to create order');
            setSuccess(null);
            console.error(error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Create Order</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form noValidate autoComplete="off">
                <TextField
                    id="ticker"
                    label="Ticker"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    id="quantity"
                    label="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    id="limit"
                    label="Limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Stop"
                    value={stop}
                    onChange={(e) => setStop(e.target.value)}
                    type="number"
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={allOrNone}
                            onChange={(e) => setAllOrNone(e.target.checked)}
                        />
                    }
                    label="All Or None"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={margin}
                            onChange={(e) => setMargin(e.target.checked)}
                        />
                    }
                    label="Margin"
                />
                <TextField
                    id="action"
                    label="Action"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <ActionButton id="create" variant="contained" color="primary" onClick={handleCreateOrder}>
                    Create Order
                </ActionButton>
            </form>
        </Container>
    );
};

export default CreateOrderPage;
