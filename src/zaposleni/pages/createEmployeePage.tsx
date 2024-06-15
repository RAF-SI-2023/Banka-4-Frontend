import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, FormControlLabel, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { EmployeePermissionsV2, UserRoutes } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { encodePermissions } from '../../utils/permissions';
import { makeApiRequest } from '../../utils/apiRequest';
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
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const HeadingText = styled.div`
  font-size: 32px;
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
      background-color: #AC190C!important;
  color: white!important;
  border-radius: 5px!important;
  
  &:hover{
    background-color: #EF2C1A!important;
  }
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
  naziv: EmployeePermissionsV2,
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
    { naziv: EmployeePermissionsV2.list_users, vrednost: false },
    { naziv: EmployeePermissionsV2.create_users, vrednost: false },
    { naziv: EmployeePermissionsV2.edit_users, vrednost: false },
    { naziv: EmployeePermissionsV2.deactivate_users, vrednost: false },
    { naziv: EmployeePermissionsV2.list_workers, vrednost: false },
    { naziv: EmployeePermissionsV2.create_workers, vrednost: false },
    { naziv: EmployeePermissionsV2.edit_workers, vrednost: false },
    { naziv: EmployeePermissionsV2.deactivate_workers, vrednost: false },
    { naziv: EmployeePermissionsV2.list_firms, vrednost: false },
    { naziv: EmployeePermissionsV2.create_firms, vrednost: false },
    { naziv: EmployeePermissionsV2.edit_firms, vrednost: false },
    { naziv: EmployeePermissionsV2.deactivate_firms, vrednost: false },
    { naziv: EmployeePermissionsV2.list_bank_accounts, vrednost: false },
    { naziv: EmployeePermissionsV2.create_bank_accounts, vrednost: false },
    { naziv: EmployeePermissionsV2.deactivate_bank_accounts, vrednost: false },
    { naziv: EmployeePermissionsV2.list_credits, vrednost: false },
    { naziv: EmployeePermissionsV2.accept_redits, vrednost: false },
    { naziv: EmployeePermissionsV2.deny_credits, vrednost: false },
    { naziv: EmployeePermissionsV2.list_cards, vrednost: false },
    { naziv: EmployeePermissionsV2.activate_cards, vrednost: false },
    { naziv: EmployeePermissionsV2.deactivate_cards, vrednost: false },
    { naziv: EmployeePermissionsV2.block_cards, vrednost: false },
    { naziv: EmployeePermissionsV2.list_orders, vrednost: false },
    { naziv: EmployeePermissionsV2.accept_orders, vrednost: false },
    { naziv: EmployeePermissionsV2.deny_orders, vrednost: false },
    { naziv: EmployeePermissionsV2.exchange_access, vrednost: false },
    { naziv: EmployeePermissionsV2.payment_access, vrednost: false },
    { naziv: EmployeePermissionsV2.action_access, vrednost: false },
    { naziv: EmployeePermissionsV2.option_access, vrednost: false },
    { naziv: EmployeePermissionsV2.order_access, vrednost: false },
    { naziv: EmployeePermissionsV2.termin_access, vrednost: false },
    {naziv:EmployeePermissionsV2.profit_access, vrednost: false}
  ]);
  const [groupedPermissions, setGroupedPermissions] = useState<{ [key: string]: Permisije[] }>({});
  const navigate = useNavigate();
  const ctx = useContext(Context);
  
  useEffect(() => {
    const grouped = permissionCheckboxes.reduce((acc: { [key: string]: Permisije[] }, perm) => {
      const lastWord = perm.naziv.split('_').pop();
      if (lastWord) {
        if (!acc[lastWord]) acc[lastWord] = [];
        acc[lastWord].push(perm);
      }
      return acc;
    }, {});
    setGroupedPermissions(grouped);
  }, [permissionCheckboxes]);

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
    const newPermissions = [...permissionCheckboxes];
    newPermissions[index].vrednost = event.target.checked;
    setPermissionCheckboxes(newPermissions);
    setFormData({ ...formData, permisije: encodePermissions(newPermissions) });
  };

  const handleGroupCheckboxChange = (group: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPermissions = permissionCheckboxes.map(perm => {
      if (perm.naziv.endsWith(group)) {
        return { ...perm, vrednost: event.target.checked };
      }
      return perm;
    });
    setPermissionCheckboxes(newPermissions);
    setFormData({ ...formData, permisije: encodePermissions(newPermissions) });
  };

  const handleSumbit = async () => {
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'permisije' && value === '') {
        ctx?.setErrors([...ctx.errors, `Our Error: Popunite polje ${key}`]);
        return;
      }
    }
    const letterOnlyRegex = /^[a-zA-Z]+$/;
    if (!(letterOnlyRegex.test(formData.ime) && letterOnlyRegex.test(formData.prezime))) {
      ctx?.setErrors([...ctx.errors, 'Our Error: Prezime se mora sastojati iskljucivo od slova']);
    }

    const numbersOnlyRegex = /\d{13}/;
    if (!(numbersOnlyRegex.test(formData.jmbg))) {
      ctx?.setErrors([...ctx.errors, 'Our Error: Jmbg se mora sastojati od 13 cifara']);
    }

    if (formData.password !== '' && formData.password !== formData.saltPassword) {
      ctx?.setErrors([...ctx.errors, 'Our Error: Lozinke se ne poklapaju']);
      return;
    }

    if (formData.brojTelefona !== '') {
      const phoneRegex = /^(06|\+)[0-9]+$/; //Change if you want only +... instead of 06....
      if (!phoneRegex.test(formData.brojTelefona)) {
        ctx?.setErrors([...ctx.errors, 'Our Error: Broj telefona nije u dobrom formatu']);
        return;
      }
    }
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    if (!(emailRegex.test(formData.email))) {
      ctx?.setErrors([...ctx.errors, 'Our Error: Email mora biti validan']);
    }
    const data = { ...formData, datumRodjenja: new Date(formData.datumRodjenja).getTime(), aktivan: true };
    const res = await makeApiRequest(UserRoutes.worker, 'POST', data, false, false, ctx);
    if (res) {
      ctx?.setErrors([...ctx.errors, 'Our Success: Zaposleni je uspesno kreiran']);
    }
    navigate(-1);
  };

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
                id="PolId"
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
            {Object.keys(groupedPermissions).map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={groupedPermissions[group].every(p => p.vrednost)}
                        onChange={handleGroupCheckboxChange(group)}
                      />
                    }
                    label={group.replaceAll("_", " ")}
                  />
                </Grid>
                {groupedPermissions[group].map((perm, permIndex) => (
                  <Grid item xs={6} md={6} lg={6} key={perm.naziv}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={perm.vrednost}
                          onChange={handleCheckboxChange(
                            permissionCheckboxes.findIndex(p => p.naziv === perm.naziv)
                          )}
                        />
                      }
                      label={perm.naziv.replaceAll("_", " ")}
                    />
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </CheckBoxForm>
        <ButtonContainer>
          <StyledButton variant="contained" color="primary" onClick={handleSumbit}>
            Kreiraj
          </StyledButton>
        </ButtonContainer>
      </FormWrapper>
    </PageWrapper>
  );
};

export default CreateEmployeePage;
