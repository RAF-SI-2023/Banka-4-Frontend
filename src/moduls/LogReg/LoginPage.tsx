import React, { useEffect, useState } from 'react';
import { Button, TextField, Link, Typography, Container, CssBaseline } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from 'utils/apiRequest';
import { UserRoutes } from 'utils/types';
import { Palette, PointyButton } from '../../utils/globalStyles';

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

    const authenticate = async (e: { preventDefault: () => void }) => {
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
            backgroundColor: 'white', // Beige color
            border: '5px solid #dedede',
            borderRadius: '8px',
            boxShadow: 3,
            marginTop: '-8vh',
            padding: '20px' // Add padding to the container
        }}>
            <style type="text/css">
                {`
                    body {
                        background-color: ${Palette.SecondaryBlue};
                    }
                `}
            </style>

            <Typography component="h1" variant="h5" sx={{ fontFamily:'Verdana', fontSize: '1.618rem', fontWeight: 'bold', margin: '16px 0' }}>
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
                <PointyButton
                    type="submit"
                    //variant="contained"
                    style={{
                        marginTop: '12px', // mt: 3 is approximately 12px
                        marginBottom: '16px', // mb: 2 is approximately 16px
                        width: '100%' // For fullWidth
                      }}
                    disabled={!email || !password}
                >
                    Login
                </PointyButton>
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
