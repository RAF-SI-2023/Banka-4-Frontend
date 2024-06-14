import { useEffect, useState } from 'react';
import { Button, TextField, Link, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from 'utils/apiRequest';
import { EmployeePermissionsV2, UserRoutes } from 'utils/types';
import { StyledContainerLogReg } from 'utils/logRegStyles';
import { hasPermission } from 'utils/permissions';
import styled from 'styled-components';
import GlobalStyles from "@mui/material/GlobalStyles";
import { css } from '@emotion/react';





  

// const url = "http://api.stamenic.work:8080/api";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '480px !important',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'initial',
      },
      '&:hover fieldset': {
        borderColor: '#EF2C1A', // Boja obruba prilikom hover-a
      },
      '&.Mui-focused fieldset': {
        borderColor: '#EF2C1A', // Boja obruba prilikom fokusa
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent', // Boja obruba prilikom fokusa
    },
    },
    '& .MuiInputLabel-root': {
      color: 'initial',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#EF2C1A', // Boja label-e prilikom fokusa
    },
  }));

const FieldContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

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
        let isEmployee = false; // Placeholder to determine if user is an employee


        try {
            const data = await makeApiRequest(UserRoutes.user_login, "POST", { username: email, password: password }, true, true)
            const token = await data.text()
            localStorage.setItem('si_jwt', token);
            const decodedToken = jwtDecode(token) as DecodedToken;
            if (hasPermission(decodedToken.permission, [EmployeePermissionsV2.list_users])) {
                isEmployee = true;
            }

        } catch (e) {
            isAuthenticated = false;
        }

        if (!isAuthenticated) {
            setError('Incorrect username or password');
        } else {
            if (isEmployee) {
                navigate("/listaKorisnika");
                window.location.reload()
            } else {
                navigate("/");
                window.location.reload()
            }
        }
    };

    return (
        //added inline style

        <StyledContainerLogReg component="main" maxWidth="sm"  >
            <style type="text/css">
                {`
                    body {
                         background-image: url("backgground.jpg");
                          background-size: cover;
                    }
                `}
            </style>
            <Typography component="h1" variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '20px 0', color:"red" }}>
                Login
            </Typography>
            <form onSubmit={authenticate}>
                <FieldContainer>
                    <StyledTextField
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
                        sx={{ margin: '5px 0',color:'red' }} // Reduced margin
                    />
                    <StyledTextField
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
                        sx={{  margin: '5px 0', color:'red' }} // Reduced margin
                    />
                </FieldContainer>
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!email || !password}
                    sx={{ mt: 3, mb: 2, color:'white', backgroundColor:'#AC190C',
                        '&:hover': {
                            backgroundColor: '#EF2C1A', 
                          },
                     }}
                    
                >
                    Login
                </Button>
                <Link onClick={handleForgot} variant="body2" sx={{color:'red', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }}}>
                    {"Zaboravio si šifru?"}
                </Link>
                <br />
                <Link onClick={handleRegister} variant="body2" sx={{color:'red', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }}}>
                    {"Nemaš nalog? Registruj se"}
                </Link>
            </form>
        </StyledContainerLogReg>
    );
};

export default LoginPage;