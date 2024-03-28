import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Alert, Select, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from '../../utils/apiRequest';
import { UserRoutes } from 'utils/types';

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
    width: 500px;
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
const StyledSelect = styled(Select)`
  background-color: white;
`
interface createUserData {
  ime: string;
  prezime: string;
  jmbg: string;
  adresa: string;
  email: string;
  datumRodjenja: string;
  pol: string;
  brojTelefona: string;
}

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState<createUserData>({
    ime: '',
    prezime: '',
    jmbg: '',
    adresa: '',
    email: '',
    datumRodjenja: '',
    brojTelefona: '',
    pol: '',
  });

  const navigate = useNavigate();

  const [fieldWarning, setFieldWarning] = useState<string>('');
  const [phoneWarning, setPhoneWarning] = useState<boolean>(false);
  const [letterOnlyWarning, setLetterOnlyWarning] = useState<boolean>(false);
  const [numbersOnlyWarning, setNumbersOnlyWarning] = useState<boolean>(false);
  const [emailWarning, setEmailWarning] = useState<boolean>(false);
  const [kreiranjeRacuna, setKreiranjeRacuna] = useState<string>('');
  const [successPopup, setSucessPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const tip = urlParams?.get('tip')
        const vrsta = urlParams?.get('vrsta')
        if (tip && vrsta) {
          setKreiranjeRacuna(`?tip=${tip}&vrsta=${vrsta}`)
        }
        else if (tip) {
          setKreiranjeRacuna(`?tip=${tip}`)
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleChangeImePrezime = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    let { name, value } = event.target;

    if (typeof value === "string" && value.length > 2) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, datumRodjenja: event.target.value });
  };

  const handleSexChange = (event: any) => {
    setFormData({ ...formData, pol: event.target.value as string });
  };

  const handleSumbit = async () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'permisije' && value === '') {
        setFieldWarning(key);
        return;
      }
    }
    setFieldWarning('')
    const letterOnlyRegex = /^[a-zA-Z]+$/
    if (!(letterOnlyRegex.test(formData.ime) && letterOnlyRegex.test(formData.prezime))) {
      setLetterOnlyWarning(true)
    } else {
      setLetterOnlyWarning(false)
    }

    const numbersOnlyRegex = /\d{13}/
    if (!(numbersOnlyRegex.test(formData.jmbg))) {
      setNumbersOnlyWarning(true)
    } else {
      setNumbersOnlyWarning(false)
    }

    if (formData.brojTelefona !== '') {
      const phoneRegex = /^(06|\+)[0-9]+$/; //Change if you want only +... instead of 06....
      if (!phoneRegex.test(formData.brojTelefona)) {
        setPhoneWarning(true)
        return
      } else {
        setPhoneWarning(false)
      }
    }
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    if (!(emailRegex.test(formData.email))) {
      setEmailWarning(true)
    } else {
      setEmailWarning(false)
    }
    const data = { ...formData, datumRodjenja: new Date(formData.datumRodjenja).getTime(), aktivan: true }
    const res = await makeApiRequest(UserRoutes.user_add, 'POST', data)
    if (res) {
      setSucessPopup(true)
    }
    if (kreiranjeRacuna) {
      navigate(`/kreirajRacun${kreiranjeRacuna}&jmbg=${formData.jmbg}`)
    }
  }

  return (
    <PageWrapper>
      <HeadingText>
        Kreiranje korisnika
      </HeadingText>
      <FormWrapper>
        <StyledTextField
          label="Ime"
          name="ime"
          variant="outlined"
          value={formData.ime}
          onChange={handleChangeImePrezime}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Prezime"
          name="prezime"
          variant="outlined"
          value={formData.prezime}
          onChange={handleChangeImePrezime}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="JMBG"
          name="jmbg"
          variant="outlined"
          value={formData.jmbg}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          name="date"
          label="Datum rodjenja"
          type="date"
          variant="outlined"
          value={formData.datumRodjenja}
          onChange={handleDateChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="sex-label">Pol</InputLabel>
          <StyledSelect
            labelId="sex-label"
            name="Pol"
            value={formData.pol}
            onChange={handleSexChange}
            label="Pol"
          >
            <MenuItem value="M">Musko</MenuItem>
            <MenuItem value="F">Zensko</MenuItem>
            <MenuItem value="F">Komplikovano</MenuItem>
          </StyledSelect>
        </FormControl>
        <StyledTextField
          label="Adresa"
          name="adresa"
          variant="outlined"
          value={formData.adresa}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Mejl adresa"
          name="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Broj telefona"
          name="brojTelefona"
          variant="outlined"
          value={formData.brojTelefona}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <ButtonContainer>
          <StyledButton variant="contained" color="primary" onClick={handleSumbit}>
            Kreiraj
          </StyledButton>
        </ButtonContainer>
      </FormWrapper>
      {fieldWarning !== "" && <Alert severity="error">Popunite polje '{fieldWarning}' .</Alert>}
      {phoneWarning && <Alert severity="error">Broj telefona je u pogresnom formatu.</Alert>}
      {letterOnlyWarning && <Alert severity="error">Ime i prezime ne sme sadrzati brojeve.</Alert>}
      {numbersOnlyWarning && <Alert severity="error">Jmbg mora sadrzati iskljucivo 13 cifara.</Alert>}
      {emailWarning && <Alert severity="error">Nevazeca mejl adresa.</Alert>}
      {successPopup && <Alert severity="success">Uspesno kreiran.</Alert>}

    </PageWrapper>
  );
};

export default CreateUserPage;

