import React, { useState } from 'react';
import 'App.css';
import { makeApiRequest } from 'utils/apiRequest';
import { getMe } from 'utils/getMe';
import styled from 'styled-components';
import { Button, IconButton, TextField } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { UserRoutes } from 'utils/types';


const PageWrapper = styled.div`
  text-align: 'center';
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledIconButton = styled(IconButton)`
  &:hover{
    color: #23395b;
  }
  background: none!important;
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
    gap: 10px;
    padding-bottom: 60px;
`
const StyledTextField = styled(TextField)`
  margin-top: 16px!important;
`

const Verifikacija: React.FC = () => {
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [emailVlasnika, setEmailVlasnika] = useState('');

  const sendOtpWithEmail = async () => {
    const user = getMe()
    if (user && user.sub) {
      setEmailVlasnika(user.sub)
    }
    const res = await makeApiRequest(`${UserRoutes.generate_otp}?email=${user?.sub}`, "POST", {}, false, false)
    console.log(res)
    if (res) {
      setVerificationSuccess(true);
      setGeneratedCode(res);
    } else {
      console.log("RES NOT FOUND", res)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
  };


  React.useEffect(() => {
    document.title = "Verifikacija";
  }, []);

  return (
    <PageWrapper>
      <FormWrapper>
        <h1>Verifikacija</h1>
        <p>Ispod možete generisati verifikacioni kod</p>
        <Button id="generisiVerKod" onClick={() => sendOtpWithEmail()}>
          Generiši verifikacioni kod
        </Button>
        {verificationSuccess && (
          <StyledTextField
            id="outlined-read-only-input"
            value={generatedCode}
            label="Verifikacioni kod"
            size='small'
            InputProps={{
              endAdornment: (
                <StyledIconButton onClick={handleCopy} sx={{ paddingRight: 0 }}>
                  <FileCopyIcon />
                </StyledIconButton>
              ),
              readOnly: true
            }}
          >
          </StyledTextField>
        )}

      </FormWrapper>
    </PageWrapper>
  );
}


export default Verifikacija;
