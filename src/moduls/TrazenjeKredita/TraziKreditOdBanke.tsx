import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { makeApiRequest } from 'utils/apiRequest';
import { BankRoutes } from 'utils/types';

interface FormData {
  vrstaKredita: string;
  iznosKredita: string;
  svrhaKredita: string;
  iznosMesecnePlate: string;
  zaposlenZaStalno: boolean;
  periodZaposlenja: string;
  rocnost: string;
  ekspozitura: string;
}

const TraziKreditStranica: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    vrstaKredita: '',
    iznosKredita: '',
    svrhaKredita: '',
    iznosMesecnePlate: '',
    zaposlenZaStalno: false,
    periodZaposlenja: '',
    rocnost: '',
    ekspozitura: '',
  });
  const [loading, setLoading] = useState(false);
  const [poruka, setPoruka] = useState<string>('');

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePosalji = async () => {
    setLoading(true);
    // Simulacija slanja zahteva na server
    const data = await makeApiRequest(BankRoutes.credit_apply, "POST", formData, false, true)
    setLoading(false);
    setPoruka(data.message); // Prikazivanje poruke na stranici
  };

  return (
    <div>
      <h2>Forma za traženje kredita</h2>
      {poruka && <p>{poruka}</p>}
      <FormControl>
        <InputLabel id="vrstaKredita-label">Vrsta kredita</InputLabel>
        <Select
          labelId="vrstaKredita-label"
          id="vrstaKredita"
          name="vrstaKredita"
          value={formData.vrstaKredita}
          onChange={handleChange}
        >
          <MenuItem value="gotovinski">Gotovinski</MenuItem>
          <MenuItem value="stambeni">Stambeni</MenuItem>
          <MenuItem value="auto">Auto</MenuItem>
          <MenuItem value="refinansirajuci">Refinansirajući</MenuItem>
        </Select>
      </FormControl>
      <br />
      {/* Ostatak forme */}
      <TextField
        label="Iznos kredita"
        type="number"
        name="iznosKredita"
        value={formData.iznosKredita}
      />
      <br />
      <TextField
        label="Svrha kredita"
        name="svrhaKredita"
        value={formData.svrhaKredita}
      />
      <br />
      <TextField
        label="Iznos mesečne plate"
        type="number"
        name="iznosMesecnePlate"
        value={formData.iznosMesecnePlate}
      />
      <br />
      <FormControlLabel
        control={<Checkbox
          checked={formData.zaposlenZaStalno}
          onChange={(e) => setFormData((prevData) => ({ ...prevData, zaposlenZaStalno: e.target.checked }))}
        />}
        label="Zaposlen za stalno"
      />
      <br />
      <TextField
        label="Period zaposlenja"
        name="periodZaposlenja"
        value={formData.periodZaposlenja}
      />
      <br />
      <TextField
        label="Rocnost"
        name="rocnost"
        value={formData.rocnost}
      />
      <br />
      <TextField
        label="Ekspozitura"
        name="ekspozitura"
        value={formData.ekspozitura}
      />
      <br />
      <Button variant="contained" onClick={handlePosalji} disabled={loading}>Pošalji</Button>
    </div>
  );
};

export default TraziKreditStranica;
