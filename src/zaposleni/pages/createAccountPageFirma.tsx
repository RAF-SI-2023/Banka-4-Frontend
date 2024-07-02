import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import { getMe } from '../../utils/getMe';
import { BankRoutes, ExchangeRate } from 'utils/types';
import KAlert from 'utils/alerts';
import { Context } from 'App';
import { RacunType } from 'korisnici/data/Racuni';

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
interface createAccountData {
  tip: string;
  vrstaRacuna: string;
  defaultCurrency: string;
  currency: string[];
}

const grupeHartija = ["STOCKS", "FOREX", "OPTIONS", "FUTURES"];

const CreateAccountPageFirma: React.FC = () => {
  const location = useLocation();

  // @ts-ignore
  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  const [formData, setFormData] = useState<createAccountData>({
    tip: '',
    defaultCurrency: '',
    currency: [],
    vrstaRacuna: '',

  });

  const [idVlasnika, setIdVlasnika] = useState<string>('');

  const [fieldWarning, setFieldWarning] = useState<string>('');
  const [numbersOnlyWarning, setNumbersOnlyWarning] = useState<boolean>(false);
  const [userNotFoundWarning, setUserNotFoundWarning] = useState<boolean>(false);
  const [successPopup, setSucessPopup] = useState<boolean>(false);
  const [maintenanceMargin, setMaintananceMargin] = useState("0");
  const [grupaHartija, setGrupaHartija] = useState<"STOCKS" | "FOREX" | "OPTIONS" | "FUTURES">("STOCKS");
  const [currencyRates, setCurrencyRates] = useState<ExchangeRate[]>([]);
  const [racuni, setRacuni] = useState<Array<RacunType>>([{ naziv: "Dragos", broj: '265-0000001234123-12', raspolozivo: 100.11, valuta: "RSD" }])
  const [selectedRacun, setSelectedRacun] = useState(0);
  const [racun, setRacun] = useState<RacunType>({ naziv: "Dragos", broj: '265-0000001234123-12', raspolozivo: 100.11, valuta: "RSD" });

  const navigate = useNavigate();
  const ctx = useContext(Context);

  useEffect(() => {
    const id = getQueryParam('id') as string;
    setIdVlasnika(id);


    const fetchData = async () => {
      try {
        // id je id banke
        const rac: { brojRacuna: string, raspolozivoStanje: number, currency: string }[] = await makeGetRequest(`/racuni/nadjiRacuneKorisnika/${id}`)
        setRacuni(() => rac?.map(e => ({ naziv: "Racun", broj: e.brojRacuna, raspolozivo: e.raspolozivoStanje, valuta: e.currency })))

        const urlParams = new URLSearchParams(window.location.search);
        let updatedFormData: createAccountData = { ...formData };
        updatedFormData = { ...updatedFormData, tip: urlParams?.get('tip') ?? '' }
        updatedFormData = { ...updatedFormData, vrstaRacuna: urlParams?.get('vrsta') ?? '' }
        setFormData(updatedFormData);
        const rates: ExchangeRate[] = await makeGetRequest(BankRoutes.exchange);
        setCurrencyRates(rates);

      } catch (error) {
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (racuni?.length > 0) {
      setSelectedRacun(() => 0);
      setRacun(() => racuni[0]);
    }
  }, [racuni]);
  const handleSumbit = async () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === '') {
        if (key !== 'vrstaRacuna') {
          if (formData.tip !== 'devizni' && key === 'defaultCurrency')
            continue;
          setFieldWarning(key);
          return;
        }
      }
    }
    setFieldWarning('')
    const zaposleni = getMe()
    const zaposleniId = zaposleni?.id

    if (formData.tip === 'pravni') {
      const data = {
        firma: idVlasnika,
        zaposleni: getMe()?.id
      }
      const res = await makeApiRequest(BankRoutes.account_add_pravni, 'POST', data, false, false, ctx);

      setRacuni([...racuni, { raspolozivo: res.raspolozivoStanje, naziv: "Racun", broj: res.brojRacuna }])

      if (res) {
        setSucessPopup(true)
      }
    }
    else if (formData.tip === 'marzni') {
      try {
        const data = {
          "vlasnik": idVlasnika,
          "valuta": racun.valuta,
          "grupaHartija": grupaHartija,
          "brojRacuna": racun.broj,
          "maintenanceMargin": maintenanceMargin
        }
        const res = await makeApiRequest(BankRoutes.account_add_marzni, 'POST', data, false, false, ctx);
        if (res) {
          setSucessPopup(true)
        }
        else {
          ctx?.setErrors(["Failed to create margin account. Only one margin account can be linked to an account"]);
        }
      }
      catch (e) {
        ctx?.setErrors(["MarzniRacun already exists for this user and grupaHartija"]);
      }

    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleTipChange = (event: any) => {
    setFormData({ ...formData, tip: event.target.value as string });
  };

  const handleVrstaChange = (event: any) => {
    setFormData({ ...formData, vrstaRacuna: event.target.value as string });
  };

  const handleCurrencyChange = (event: any) => {
    const newCurrency = event.target.value as string;
    setFormData(prevFormData => ({
      ...prevFormData,
      defaultCurrency: newCurrency,
      currency: [newCurrency]
    }));
  };

  const handleGrupaHartijaChange = (event: any) => {
    const newGrupaHartija = event.target.value as ("STOCKS" | "FOREX" | "OPTIONS" | "FUTURES");
    setGrupaHartija(newGrupaHartija);
  };

  return (
    <PageWrapper>
      <HeadingText>
        Kreiranje Racuna
      </HeadingText>
      {fieldWarning !== "" && <KAlert severity="error" exit={() => setFieldWarning('')}>Popunite polje '{fieldWarning}' .</KAlert>}
      {successPopup && <KAlert severity="success" exit={() => setSucessPopup(false)}>Uspesno kreiran.</KAlert>}
      <FormWrapper>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="tip-label">Tip</InputLabel>
          <StyledSelect
            id="tip"
            labelId="tip-label"
            name="Tip"
            value={formData.tip}
            onChange={handleTipChange}
            label="Tip"
          >
            <MenuItem id="pravni" value="pravni">Pravni</MenuItem>
            <MenuItem id="marzni" value="marzni">Marzni</MenuItem>
          </StyledSelect>
        </FormControl>
        {formData?.tip === 'tekuci' && <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="vrsta-label">Vrsta</InputLabel>
          <StyledSelect
            labelId="vrsta-label"
            name="Vrsta"
            value={formData.vrstaRacuna}
            onChange={handleVrstaChange}
            label="Vrsta"
          >
            <MenuItem value="Studentski">Studentski</MenuItem>
            <MenuItem value="Penzionerski">Penzionerski</MenuItem>
            {/* <MenuItem value="devizni">JOSJEDANSKI</MenuItem> */}
          </StyledSelect>
        </FormControl>}
        {formData.tip === 'devizni' &&

          <FormControl fullWidth margin="normal">
            <InputLabel>Valuta</InputLabel>
            <Select
              value={formData.defaultCurrency}
              onChange={handleCurrencyChange}
              label="Valuta"
              id="valuta"
            >
              {currencyRates?.map((currency) => (
                <MenuItem key={currency.currencyCode} id={"valutaItem" + currency.currencyCode} value={currency.currencyCode}>
                  {currency.currencyCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }


        {(formData.tip === 'marzni' && idVlasnika) &&

          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Povezani račun</InputLabel>
              <Select
                labelId="select-racun-label"
                id="selectRacun"
                value={selectedRacun}
                label="Povezani račun"
                onChange={(e) => {
                  setSelectedRacun(Number(e.target.value))
                  setRacun(racuni[Number(e.target.value)])
                }}
              >
                {racuni?.map((racun, index) => (
                  <MenuItem key={index} value={index}>{`${racun.naziv} - ${racun.broj} (${racun.raspolozivo} RSD)`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Grupa hartija</InputLabel>
              <Select
                value={grupaHartija}
                onChange={handleGrupaHartijaChange}
                label="Grupa hartija"
                id="grupahartija"
              >
                {grupeHartija?.map((e) => (
                  <MenuItem key={e} id={"grupaHartijaItem" + e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <StyledTextField
              error={((parseFloat(maintenanceMargin) || parseFloat(maintenanceMargin) === 0) && parseFloat(maintenanceMargin) >= 0) ? false : true}
              label="Maintenance Margin"
              name='maintenancemargin'
              variant="outlined"
              value={maintenanceMargin}
              onChange={e => setMaintananceMargin(e.target.value)}
              fullWidth
              helperText={((parseFloat(maintenanceMargin) || parseFloat(maintenanceMargin) === 0) && parseFloat(maintenanceMargin) >= 0) ? "" : "Morate uneti validan broj"}
              margin="normal"
            />
          </>
        }

        <ButtonContainer>
          <StyledButton id="kreiraj" disabled={!idVlasnika} variant="contained" color="primary" onClick={handleSumbit}>
            Kreiraj
          </StyledButton>
        </ButtonContainer>
      </FormWrapper>
    </PageWrapper>
  );
};

export default CreateAccountPageFirma;
