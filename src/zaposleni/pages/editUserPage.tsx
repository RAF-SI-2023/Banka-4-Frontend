import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Alert, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import { UserRoutes } from 'utils/types';
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
const StyledSelect = styled(Select)`
  background-color: white;
`

interface editUserData {
  prezime: string;
  adresa: string;
  email: string;
  brojTelefona: string;
  password: string,
  pol: string,
}

type editUserDataNoPW = Omit<editUserData, 'password' | 'ponovi_lozinku'>;

const EditUserPage: React.FC = () => {
  const [formData, setFormData] = useState<editUserData>({
    prezime: '',
    adresa: '',
    email: '',
    brojTelefona: '',
    password: '',
    pol: ''
  });
  const ctx = useContext(Context);

  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [emptyWarning, setEmptyWarning] = useState<boolean>(false);
  const [phoneWarning, setPhoneWarning] = useState<boolean>(false);
  const [povezaniRacuni, setPovezaniRacuni] = useState(null)
  const [uid, setUid] = useState('')
  const [ponovi_lozinku, setPonoviLozinku] = useState('')
  const [successPopup, setSucessPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const jmbg = urlParams?.get('jmbg')
        if (jmbg) {
          const res = await makeGetRequest(`/korisnik/jmbg/${jmbg}`);
          if (res?.id) {
            setUid(res.id)
          }
          if (res?.povezaniRacuni) {
            setPovezaniRacuni(res.povezaniRacuni)
          }

          let updatedFormData: editUserData = { ...formData };
          for (const [key] of Object.entries(formData)) {
            if (res[key]) {
              updatedFormData = { ...updatedFormData, [key]: res[key] }
            }
          }
          setFormData(updatedFormData);
        }
      } catch (error) {
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleChangePrezime = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    let { name, value } = event.target;

    if (typeof value === "string" && value.length > 2) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleSexChange = (event: any) => {
    setFormData({ ...formData, pol: event.target.value as string });
  };

  const handleChangePonoviLozinku = (event: any) => {
    setPonoviLozinku(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleSumbit = async () => {
    const isEmpty = Object.values(formData).every(x => x === null || x === '');
    setEmptyWarning(isEmpty)
    if (isEmpty) {
      return
    }
    if (formData.password !== '' && formData.password !== ponovi_lozinku) {
      setPasswordWarning(true)
      return
    } else {
      setPasswordWarning(false)
    }
    if (formData.brojTelefona !== '') {
      const regex = /^(06|\+)[0-9]+$/; //Change if you want only +... instead of 06....
      if (!regex.test(formData.brojTelefona)) {
        setPhoneWarning(true)
        return
      } else {
        setPhoneWarning(false)
      }
    }

    if (uid) {
      if (formData.password === '') {
        let formDataNoPW: editUserDataNoPW = {
          prezime: formData.prezime,
          adresa: formData.adresa,
          email: formData.email,
          brojTelefona: formData.brojTelefona,
          pol: formData.pol
        }
        const res = await makeApiRequest(UserRoutes.user, 'PUT', { ...formDataNoPW, id: uid, povezaniRacuni, aktivan: true }, false, false, ctx)
        if (res) {
          setSucessPopup(true)
        }
      } else {
        const res = await makeApiRequest(UserRoutes.user, 'PUT', { ...formData, id: uid, povezaniRacuni, aktivan: true }, false, false, ctx)
        if (res) {
          setSucessPopup(true)
        }
      }
    }
  }

  return (
    <PageWrapper>
      <HeadingText>
        Izmena korisnika
      </HeadingText>
      <FormWrapper>
      {phoneWarning && <KAlert severity="error" exit={() => setPhoneWarning(false)}>Broj telefona je u pogresnom formatu.</KAlert>}
      {passwordWarning && <KAlert severity="error" exit={() => setPasswordWarning(false)}>Lozinke se ne poklapaju.</KAlert>}
      {successPopup && <KAlert severity="success" exit={() => setSucessPopup(false)}>Uspesno kreiran.</KAlert>}
      {emptyWarning && <KAlert severity="error" exit={() => setEmptyWarning(false)}>Popunite neko polje.</KAlert>}
        <StyledTextField
          label="Prezime"
          name='prezime'
          variant="outlined"
          value={formData.prezime}
          onChange={handleChangePrezime}
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
          name='adresa'
          variant="outlined"
          value={formData.adresa}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Lozinka"
          name='password'
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Ponovi lozinku"
          name='ponovi_lozinku'
          type="password"
          variant="outlined"
          value={ponovi_lozinku}
          onChange={handleChangePonoviLozinku}
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

export default EditUserPage;
