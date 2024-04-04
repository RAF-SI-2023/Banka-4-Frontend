import React, { useEffect, useState } from 'react';
import { Button, TextField, Link, Typography, Container, CssBaseline } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from 'utils/apiRequest';
import { UserRoutes } from 'utils/types';

import '../../App.css';


const url = "http://api.stamenic.work:8080/api";

interface DecodedToken {
    permission: number;
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname !== '/login') {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleRegister = () => {
        navigate('/register')
    }

    const handleForgot = () => {
        navigate("/resetPassword")
    }

    // @ts-ignore
    const authenticate = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        let isAuthenticated = true; // Placeholder for actual authentication logic
        let isEmployee = true; // Placeholder to determine if user is an employee
        try {
            const data = await makeApiRequest(UserRoutes.user_login, "POST", { username: email, password: password }, true, true)
            const token = await data.text()
            localStorage.setItem('si_jwt', token);
            const decodedToken = jwtDecode(token) as DecodedToken;
            if (decodedToken.permission === 0) {
                isEmployee = false;
            }
        } catch (e) {
            isAuthenticated = false;
        }

        if (!isAuthenticated) {
            setError('Incorrect username or password');
        } else {
            if (isEmployee) {
                window.location.replace("/listaKorisnika");
            } else {
                window.location.replace("/");
            }
        }
    };

    return (
        //added inline style

        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'var(--auxiliary-beige)', // Beige color
            border: '1px solid #dedede',
            borderRadius: '8px',
            boxShadow: 3,
            marginTop: '-8vh',
            padding: '20px' // Add padding to the container
        }}>
            <style type="text/css">
                {`
                    body {
                        background-color: #82b2ff;
                    }
                `}
            </style>

            <Typography component="h1" variant="h5" sx={{ fontSize: '2.617924rem', fontFamily: 'Georgia , serif', fontWeight: 'bold', margin: '20px 0' }}>
                Login
            </Typography>
            <form onSubmit={authenticate}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ margin: '5px 0' }} // Reduced margin
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ margin: '5px 0' }} // Reduced margin
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    className="pointy-btn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, fontweight:'bold' }}
                    disabled={!email || !password}
                    
                >
                    Login
                </Button>
                <Link onClick={handleForgot} variant="body2">
                    {"Zaboravio si šifru?"}
                </Link>
                <br />
                <Link onClick={handleRegister} variant="body2">
                    {"Nemaš nalog? Registruj se"}
                </Link>
            </form>
        </Container>
    );
};

export default LoginPage;
