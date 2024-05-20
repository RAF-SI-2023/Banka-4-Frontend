import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import KAlert from 'utils/alerts';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column; // Stack children vertically
  align-items: flex-end; // Align children to the right
  height: 100vh; // Full height of the viewport
  padding-right: 50px; // Space from the right edge of the viewport
  background-color: #82b2ff; // Sets the background color to light blue
`;

const FormWrapper = styled.div`
  background-color: #fafafa;
  padding: 20px;
  border-radius: 18px;
  width: 33%; //third screen width
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeadingText = styled.div`
  font-size: 56px;
  align-self: flex-end; 
  margin-bottom: 20px; 
`;

const StyledButton = styled(Button)`
  width: 100%;
  height:70px;
  font-weight: bold;
  font-size: 1.5rem;  //issue:doesn't affect it
  padding: 1rem 0; // Increased padding for a taller button
  position: relative;

  &::before { //pointy bit
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #1A7B99; // match the button background-color
  }

  &:hover {
    background-color: #297cb7; // hover color
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  // If any other styles are affecting the button, they should be reviewed here.
`;

const StyledTextField = styled(TextField)`
  background-color: white;
`;

interface createCompanyData {
  naziv: string;
  brojTelefona: string;
  brojFaksa: string;
  pib: string;
  maticniBroj: string;
  sifraDelatnosti: string;
  registarskiBroj: string;

}

const EditCompanyPage: React.FC = () => {
  const [formData, setFormData] = useState<createCompanyData>({
    naziv: '',
    brojTelefona: '',
    brojFaksa: '',
    pib: '',
    maticniBroj: '',
    sifraDelatnosti: '',
    registarskiBroj: '',
  });

  const [fieldWarning, setFieldWarning] = useState<string>('');

  // const navigate = useNavigate();

  const handleSumbit = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === '') {
        setFieldWarning(key);
        return;
      }
    }

    // const numbersOnlyRegex = /\d{13}/
    // if (!(numbersOnlyRegex.test(formData.jmbg))) {
    //   setNumbersOnlyWarning(true)
    // } else {
    //   setNumbersOnlyWarning(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  return (
    <PageWrapper>
      <HeadingText>
        Izmena firme
      </HeadingText>
      <FormWrapper>
      {fieldWarning !== "" && <KAlert severity="error" exit={() => setFieldWarning('')}>Popunite polje '{fieldWarning}' .</KAlert>}
        <StyledTextField
          label="Naziv"
          name='naziv'
          variant="outlined"
          value={formData.naziv}
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
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Maticni broj"
          name='maticniBroj'
          variant="outlined"
          value={formData.maticniBroj}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Sifra delatnosti"
          name='sifraDelatnosti'
          variant="outlined"
          value={formData.sifraDelatnosti}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Registarski broj"
          name='registarskiBroj'
          variant="outlined"
          value={formData.registarskiBroj}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <ButtonContainer>
          <StyledButton variant="contained" color="primary" onClick={handleSumbit}>
            Azuriraj
          </StyledButton>
        </ButtonContainer>

      </FormWrapper>
    </PageWrapper>
  );
};

export default EditCompanyPage;
