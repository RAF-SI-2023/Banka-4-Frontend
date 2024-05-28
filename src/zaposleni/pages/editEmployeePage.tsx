import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Grid, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { EmployeePermissionsV2, UserRoutes } from '../../utils/types';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import { encodePermissions } from '../../utils/permissions';
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
    width: 600px;
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
const FormSeparator = styled.div`
  display: flex;
  gap: 20px;
`
const FormSeparatorRow = styled.div`
  max-width: 300px;
`
const StyledTextField = styled(TextField)`
  background-color: white;
`
const StyledSelect = styled(Select)`
  background-color: white;
`
const CheckBoxForm = styled.div`
  margin-bottom: 40px;
`

type Permisije = {
  naziv: EmployeePermissionsV2,
  vrednost: boolean
}
interface editEmployeeData {
  id: number
  prezime: string;
  adresa: string;
  brojTelefona: string;
  password: string,
  passwordSalt: string,
  pol: string,
  departman: string,
  pozicija: string,
  permisije: number,
}

const EditEmployeePage: React.FC = () => {
  const [formData, setFormData] = useState<editEmployeeData>({
    id: 0,
    prezime: '',
    adresa: '',
    brojTelefona: '',
    password: '',
    passwordSalt: '',
    pol: '',
    departman: '',
    pozicija: '',
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
    { naziv: EmployeePermissionsV2.termin_access, vrednost: false }
  ])
  const ctx = useContext(Context);

  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [emptyWarning, setEmptyWarning] = useState<boolean>(false);
  const [phoneWarning, setPhoneWarning] = useState<boolean>(false);
  const [successPopup, setSucessPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams?.get('email') ?? ''
        if (email) {
          const res = await makeGetRequest(`/radnik/email/${email}`);
          let updatedFormData: editEmployeeData = { ...formData };
          for (const [key] of Object.entries(formData)) {
            if (res[key] && key !== 'permisije') {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

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

  const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const novePermisije = [...permissionCheckboxes];
    novePermisije[index].vrednost = event.target.checked;
    setPermissionCheckboxes(novePermisije);
    setFormData({ ...formData, permisije: encodePermissions(permissionCheckboxes) })
  };

  const handleSumbit = async () => {
    const isEmpty = Object.values(formData).every(x => x === null || x === '');
    setEmptyWarning(isEmpty)
    if (isEmpty) {
      return
    }
    if (formData.password !== '' && formData.password !== formData.passwordSalt) {
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
    const data = { ...formData, aktivan: true }
    const res = await makeApiRequest(UserRoutes.worker, 'PUT', data, false, false, ctx)
    if (res) {
      setSucessPopup(true)
    }
  }

  return (
    <PageWrapper>
      <HeadingText>
        Izmena zaposlenog
      </HeadingText>
      <FormWrapper>
      {phoneWarning && <KAlert severity="error" exit={() => setPhoneWarning(false)}>Broj telefona je u pogresnom formatu.</KAlert>}
      {passwordWarning && <KAlert severity="error" exit={() => setPasswordWarning(false)}>Lozinke se ne poklapaju.</KAlert>}
      {successPopup && <KAlert severity="success" exit={() => setSucessPopup(false)}>Uspesno kreiran.</KAlert>}
      {emptyWarning && <KAlert severity="error" exit={() => setEmptyWarning(false)}>Popunite neko polje.</KAlert>}
        <FormSeparator>
          <FormSeparatorRow>
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
              name='passwordSalt'
              variant="outlined"
              value={formData.passwordSalt}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </FormSeparatorRow>
          <FormSeparatorRow>
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
              label="Pozicija"
              name='pozicija'
              variant="outlined"
              value={formData.pozicija}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <StyledTextField
              label="Departman"
              name='departman'
              variant="outlined"
              value={formData.departman}
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
          {/* <FormControlLabel
            control={<Checkbox checked={formData.permisije[0].vrednost} onChange={handleCheckboxChange(1)} />}
            label={`Permisija za `}
          /> */}
        </CheckBoxForm>
        <ButtonContainer>
          <StyledButton variant="contained" color="primary" onClick={handleSumbit}>
            Azuriraj
          </StyledButton>
        </ButtonContainer>
      </FormWrapper>
    </PageWrapper>
  );
};

export default EditEmployeePage;
