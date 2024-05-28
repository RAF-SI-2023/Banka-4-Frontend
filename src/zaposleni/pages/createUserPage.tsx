import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { makeApiRequest } from '../../utils/apiRequest';
import { UserRoutes } from 'utils/types';
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

  const ctx = useContext(Context);
  const navigate = useNavigate();
  const [kreiranjeRacuna, setKreiranjeRacuna] = useState<string>('');

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
        ctx?.setErrors([...ctx.errors, `Our Error: Popunite polje ${key}`])
        return;
      }
    }
    const letterOnlyRegex = /^[a-zA-Z]+$/
    if (!(letterOnlyRegex.test(formData.ime) && letterOnlyRegex.test(formData.prezime))) {
      ctx?.setErrors([...ctx.errors, 'Our Error: Prezime se mora sastojati iskljucivo od slova'])
      return
    }
    const numbersOnlyRegex = /\d{13}/
    if (!(numbersOnlyRegex.test(formData.jmbg))) {
      ctx?.setErrors([...ctx.errors, 'Our Error: Jmbg se mora sastojati od 13 cifara'])
      return
    }

    if (formData.brojTelefona !== '') {
      const phoneRegex = /^(06|\+)[0-9]+$/; //Change if you want only +... instead of 06....
      if (!phoneRegex.test(formData.brojTelefona)) {
        ctx?.setErrors([...ctx.errors, 'Our Error: Broj telefona mora pocinjati sa 06 ili +'])
        return
      }
    }
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    if (!(emailRegex.test(formData.email))) {
      ctx?.setErrors([...ctx.errors, 'Our Error: Email mora biti validan'])
      return
    }
    const data = { ...formData, datumRodjenja: new Date(formData.datumRodjenja).getTime(), aktivan: true }
    const res = await makeApiRequest(UserRoutes.user_add, 'POST', data, false, false, ctx)

    if (res) {
      ctx?.setErrors([...ctx.errors, 'Our Success: Korisnik je uspesno kreiran'])
    }
    if (kreiranjeRacuna) {
      navigate(`/kreirajRacun${kreiranjeRacuna}&jmbg=${formData.jmbg}`)
    } else{
      navigate(-1)
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
            id="PolId"
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
    </PageWrapper>
  );
};

export default CreateUserPage;

