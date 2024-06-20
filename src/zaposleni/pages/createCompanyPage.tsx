import React, { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { makeApiRequest } from '../../utils/apiRequest';
import { BankRoutes } from 'utils/types';
import KAlert from 'utils/alerts';
import { Context } from 'App';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 80px;
`
const FormWrapper = styled.div`
    background-color: #fafafa;
    padding: 30px;
    border-radius: 18px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const HeadingText = styled.div`
  font-size: 32px;
`

const StyledButton = styled(Button)`
  max-width: 100px ;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledTextField = styled(TextField)`
  background-color: white;
`

interface createCompanyData {
  nazivPreduzeca: string;
  brojTelefona: string;
  brojFaksa: string;
  pib: number | null;
  maticniBroj: number | null;
  sifraDelatnosti: number | null;
  registarskiBroj: number | null;
}

const CreateCompanyPage: React.FC = () => {
  const [formData, setFormData] = useState<createCompanyData>({
    nazivPreduzeca: '',
    brojTelefona: '',
    brojFaksa: '',
    pib: null,
    maticniBroj: null,
    sifraDelatnosti: null,
    registarskiBroj: null,
  });

  const [fieldWarning, setFieldWarning] = useState<string>('');
  const [successPopup, setSucessPopup] = useState<boolean>(false);
  const ctx = useContext(Context);

  // const navigate = useNavigate();

  const handleSumbit = async () => {
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        setFieldWarning(key);
        return;
      }
    }
    const res = await makeApiRequest(BankRoutes.company_create, 'POST', formData, false, false, ctx)
    if (res) {
      setSucessPopup(true)
    }
    // const numbersOnlyRegex = /\d{13}/
    // if (!(numbersOnlyRegex.test(formData.jmbg))) {
    //   setNumbersOnlyWarning(true)
    // } else {
    //   setNumbersOnlyWarning(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: parseInt(value as string) });
  };

  return (
    <PageWrapper>
      <HeadingText>
        Kreiranje firme
      </HeadingText>
      <FormWrapper>
      {fieldWarning !== "" && <KAlert severity="error" exit={() => setFieldWarning('')}>Popunite polje '{fieldWarning}' .</KAlert>}
      {successPopup && <KAlert severity="success" exit={() => setSucessPopup(false)}>Uspesno kreiran.</KAlert>}
        <StyledTextField
          label="Naziv"
          name='nazivPreduzeca'
          variant="outlined"
          value={formData.nazivPreduzeca}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Broj telefona"
          name='brojTelefona'
          variant="outlined"
          value={formData.brojTelefona}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Broj faksa"
          name='brojFaksa'
          variant="outlined"
          value={formData.brojFaksa}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Pib"
          name='pib'
          variant="outlined"
          value={formData.pib}
          onChange={handleChangeNumber}
          type='number'
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Maticni broj"
          name='maticniBroj'
          variant="outlined"
          value={formData.maticniBroj}
          onChange={handleChangeNumber}
          type='number'
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Sifra delatnosti"
          name='sifraDelatnosti'
          variant="outlined"
          value={formData.sifraDelatnosti}
          onChange={handleChangeNumber}
          type='number'
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Registarski broj"
          name='registarskiBroj'
          variant="outlined"
          type='number'
          value={formData.registarskiBroj}
          onChange={handleChangeNumber}
          fullWidth
          margin="normal"
        />
        <ButtonContainer>
          <StyledButton variant="contained" color="primary" onClick={handleSumbit}>
            Kreiraj
          </StyledButton>
        </ButtonContainer>

      </FormWrapper>
    </PageWrapper>
  );
};

export default CreateCompanyPage;
