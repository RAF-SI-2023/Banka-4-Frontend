import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Alert, Select, MenuItem, Grid, FormControlLabel, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { UserPermissions, UserRoutes } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { encodePermissions } from '../../utils/permissions';
import { makeApiRequest } from '../../utils/apiRequest';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 20px;
`
const FormWrapper = styled.div`
    background-color: #fafafa;
    padding: 30px;
    border-radius: 18px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const HeadingText = styled.div`
  font-size: 4.235rem;
  font-family:'Georgia, serif'
`
const CheckBoxForm = styled.div`
  margin-bottom: 40px;
`
const FormSeparator = styled.div`
  display: flex;
  gap: 20px;
`
const FormSeparatorRow = styled.div`
  max-width: 300px;
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

type Permisije = {
  naziv: UserPermissions,
  vrednost: boolean
}

interface createEmployeeData {
  ime: string;
  prezime: string;
  jmbg: string;
  adresa: string;
  email: string;
  datumRodjenja: string;
  pol: string;
  brojTelefona: string;
  pozicija: string;
  password: string;
  saltPassword: string;
  username: string;
  departman: string;
  permisije: number;
}

const CreateEmployeePage: React.FC = () => {
  const [formData, setFormData] = useState<createEmployeeData>({
    ime: '',
    prezime: '',
    jmbg: '',
    adresa: '',
    email: '',
    datumRodjenja: '',
    brojTelefona: '',
    pol: '',
    pozicija: '',
    password: '',
    username: '',
    saltPassword: '',
    departman: '',
    permisije: 0,
  });
  const [permissionCheckboxes, setPermissionCheckboxes] = useState<Permisije[]>([
    { naziv: UserPermissions.listanje_korisnika, vrednost: false },
    { naziv: UserPermissions.dodavanje_korisnika, vrednost: false },
    { naziv: UserPermissions.editovanje_korisnika, vrednost: false },
    { naziv: UserPermissions.deaktiviranje_korisnika, vrednost: false },
    { naziv: UserPermissions.kreiranje_racuna, vrednost: false },
    { naziv: UserPermissions.editovanje_racuna, vrednost: false },
    { naziv: UserPermissions.brisanje_racuna, vrednost: false }
  ])
  const navigate = useNavigate();

  const [fieldWarning, setFieldWarning] = useState<string>('');
  const [phoneWarning, setPhoneWarning] = useState<boolean>(false);
  const [letterOnlyWarning, setLetterOnlyWarning] = useState<boolean>(false);
  const [numbersOnlyWarning, setNumbersOnlyWarning] = useState<boolean>(false);
  const [emailWarning, setEmailWarning] = useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [successPopup, setSucessPopup] = useState<boolean>(false);

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

  const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const novePermisije = [...permissionCheckboxes];
    novePermisije[index].vrednost = event.target.checked;
    setPermissionCheckboxes(novePermisije);
    setFormData({ ...formData, permisije: encodePermissions(permissionCheckboxes) })
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

    if (formData.password !== '' && formData.password !== formData.saltPassword) {
      setPasswordWarning(true)
      return
    } else {
      setPasswordWarning(false)
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
    const res = await makeApiRequest(UserRoutes.worker, 'POST', data)
    if (res) {
      setSucessPopup(true)
    }
    // navigate(-1)
  }

  return (
    <PageWrapper>
      <HeadingText>
        Kreiranje zaposlenog
      </HeadingText>
      <FormWrapper>
        <FormSeparator>
          <FormSeparatorRow>
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
              label="Korisnicko Ime"
              name="username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
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
              label="Lozinka"
              name='password'
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <StyledTextField
              label="Ponovi lozinku"
              name='saltPassword'
              variant="outlined"
              value={formData.saltPassword}
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
          </FormSeparatorRow>
          <FormSeparatorRow>
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
            <StyledTextField
              label="Pozicija"
              name="pozicija"
              variant="outlined"
              value={formData.pozicija}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <StyledTextField
              label="Departman"
              name="departman"
              variant="outlined"
              value={formData.departman}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </FormSeparatorRow>
        </FormSeparator>

        <CheckBoxForm>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {permissionCheckboxes?.map((permisija, index) => (
              <Grid item xs={6} md={6} lg={6} key={index}>
                <FormControlLabel
                  control={<Checkbox checked={permisija.vrednost} onChange={handleCheckboxChange(index)} />}
                  label={`${permissionCheckboxes[index].naziv.replaceAll("_", " ")}`}
                />
              </Grid>
            ))}
          </Grid>
        </CheckBoxForm>
        <ButtonContainer>
          <StyledButton className="pointy-btn" variant="contained" color="primary" onClick={handleSumbit}>
            Kreiraj
          </StyledButton>
        </ButtonContainer>
      </FormWrapper>
      {fieldWarning !== "" && <Alert severity="error">Popunite polje '{fieldWarning}' .</Alert>}
      {phoneWarning && <Alert severity="error">Broj telefona je u pogresnom formatu.</Alert>}
      {letterOnlyWarning && <Alert severity="error">Ime i prezime ne sme sadrzati brojeve.</Alert>}
      {numbersOnlyWarning && <Alert severity="error">Jmbg mora sadrzati iskljucivo 13 cifara.</Alert>}
      {emailWarning && <Alert severity="error">Nevazeca mejl adresa.</Alert>}
      {passwordWarning && <Alert severity="error">Lozinke se ne poklapaju.</Alert>}
      {successPopup && <Alert severity="success">Uspesno kreiran.</Alert>}

    </PageWrapper>
  );
};

export default CreateEmployeePage;
