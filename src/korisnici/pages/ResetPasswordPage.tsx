import { useContext, useState } from 'react';
import { makeApiRequest } from 'utils/apiRequest';
import styled from 'styled-components';
import { Button, TextField, Typography } from '@mui/material';
import { UserRoutes } from 'utils/types';
import { Context } from 'App';
import { StyledContainerLogReg } from 'utils/logRegStyles';


const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '527px !important',
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

const PageWrapper = styled.div`
  text-align: 'center';
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`

const FormWrapper = styled.div`
    background-color: #fafafa;
    padding: 30px;
    border-radius: 18px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 28px;
    padding-bottom: 60px;
`
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*\d.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@#$!%^&*()_+|~=`{ }[\]: ";'<>?,./\\-]{8,32}$/;

const ResetPasswordPage = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [activationCodeValid, setActivationCodeValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const ctx = useContext(Context)
  const validateEmail = () => {
    setEmailValid(emailRegex.test(email));
  };

  const validatePassword = () => {
    setPasswordValid(passwordRegex.test(newPassword));
  };

  const validateActivationCode = () => {
    setActivationCodeValid(activationCode.trim() !== "");
  };

  const sendRequest = async () => {
    try {
      await makeApiRequest(UserRoutes.user_generate_reset, "POST", { email }, true, true, ctx)
      if (ctx) {
        ctx.setErrors([...ctx.errors, "Our Success: Kod je uspesno poslat na mejl"])
      }
    } catch (error) {
    }
  };

  const resetPassword = async () => {
    try {
      await makeApiRequest(UserRoutes.user_reset_password, "POST", { email, sifra: newPassword, kod: activationCode, }, true, true, ctx)
      if (ctx) {
        ctx.setErrors([...ctx.errors, "Our Success: Lozinka je uspesno resetovana"])
      }
    } catch (error) {
    }
  };

  return (

    <StyledContainerLogReg component="main" maxWidth="sm"  >
    <style type="text/css">
        {`
            body {
                 background-image: url("backgground.jpg");
                  background-size: cover;
            }
        `}
    </style>
        <PageWrapper> 
          
        <Typography component="h2" variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '20px 0', color:"red" }}>
          Stranica za resetovanje šifre

          </Typography>
        
            <StyledTextField
              type="email"
              error={!!email && !emailValid}
              fullWidth
              helperText={!!email && !emailValid ? 'Unesite ispravan mejl' : ''}
              label="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            <Button variant={'contained'} 
              disabled={!emailValid} 
              onClick={sendRequest}
              
              sx={{
                color: 'white',
                backgroundColor: '#AC190C',
                '&:hover': {
                  backgroundColor: '#EF2C1A',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#DBCBCB', // Siva boja kada je dugme onemogućeno
                  color: 'light-gray', // Boja teksta kada je dugme onemogućeno
                },
              }}
            >
              Pošalji zahtev
            </Button>

            <StyledTextField
              type="text"
              error={!!activationCode && !activationCodeValid}
              fullWidth
              helperText={!!activationCode && !activationCodeValid ? 'Unesite ispravan aktivacioni kod' : ''}
              label="Aktivacioni kod"
              id="activationCode"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              onBlur={validateActivationCode}
            />
            <StyledTextField
              type="password"
              error={!!newPassword && !passwordValid}
              fullWidth
              helperText={!!newPassword && !passwordValid ? 'Lozinka mora imati najmanje 8 karaktera, najviše 32 karaktera,najmanje 2 broja, najmanje 1 veliko slovo i najmanje 1 malo slovo' : ''}
              label="Nova lozinka"
              id="novaLozinka"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={validatePassword}
            />
           <Button
            disabled={!activationCodeValid || !passwordValid}
            onClick={resetPassword}
            sx={{
              mt: 3,
              mb: 2,
              color: 'white',
              backgroundColor: '#AC190C',
              '&:hover': {
                backgroundColor: '#EF2C1A',
              },
              '&.Mui-disabled': {
                backgroundColor: '#DBCBCB', // Siva boja kada je dugme onemogućeno
                color: 'light-gray', // Boja teksta kada je dugme onemogućeno
              },
            }}
          >
            Restartuj šifru
          </Button>

          
        </PageWrapper>
    </StyledContainerLogReg>
  );
};
export default ResetPasswordPage;