import { useContext, useState } from 'react';
import { makeApiRequest } from 'utils/apiRequest';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { UserRoutes } from 'utils/types';
import { Context } from 'App';


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
      console.error("Error fetching data:", error);
    }
  };

  const resetPassword = async () => {
    try {
      await makeApiRequest(UserRoutes.user_reset_password, "POST", { email, sifra: newPassword, kod: activationCode, }, true, true, ctx)
      if (ctx) {
        ctx.setErrors([...ctx.errors, "Our Success: Lozinka je uspesno resetovana"])
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <PageWrapper>
      <h2>Stranica za resetovanje šifre</h2>

      <FormWrapper>
        <TextField
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
        <Button variant={'contained'} disabled={!emailValid} onClick={sendRequest}>
          Pošalji zahtev
        </Button>

        <TextField
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
        <TextField
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
        >
          Restartuj šifru
        </Button>
      </FormWrapper>
    </PageWrapper>
  );
};
export default ResetPasswordPage;