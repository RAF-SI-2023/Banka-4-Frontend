import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { makeApiRequest } from 'utils/apiRequest';
import { BankRoutes } from 'utils/types';
import { Kredit } from 'utils/types';

const TraziKreditStranica: React.FC = () => {
  const [formData, setFormData] = useState<Kredit>({
    id: 0,
    type: '',
    amount: '',
    salary: 0,
    currentEmploymentPeriod: 0,
    loanTerm: 0,
    branchOffice: '',
    bankAccountNumber: 0,
    loanPurpose: '',
    permanentEmployee: false,
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [poruka, setPoruka] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; checked?: boolean | undefined; }>) => {
    const { name, value, checked } = e.target;
    let parsedValue = value;
    
    if (name === 'currentEmploymentPeriod' || name === 'bankAccountNumber' || name === 'salary' || name === 'amount') {
      parsedValue = parseInt(value as string, 10);
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: name === 'zaposlenZaStalno' ? checked : parsedValue,
    }));
  };
  
  
  const handleChange2 = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePosalji = async () => {
    setLoading(true);
    // Simulacija slanja zahteva na server
  
    const data = await makeApiRequest(BankRoutes.credit_apply, "POST", formData, false, true);
    setLoading(false);
  
    if (data && data.status && data.status === 200) {
      setPoruka("USPESNO POSLATO"); // Prikazivanje poruke na stranici
    } else {
      setPoruka("GRESKA PRI SLANJU"); // Prikazivanje poruke na stranici
    }
  
    console.log(data);
    // Ispisivanje trenutnog stanja forme u konzoli
    console.log(formData);
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
          name="type" // Ime polja u formData
          value={formData.type}
          onChange={handleChange2}
        >
          <MenuItem value="gotovinski">Gotovinski</MenuItem>
          <MenuItem value="stambeni">Stambeni</MenuItem>
          <MenuItem value="auto">Auto</MenuItem>
          <MenuItem value="refinansirajuci">Refinansirajući</MenuItem>
        </Select>
      </FormControl>
      <br />
     
      <TextField
        label="Iznos kredita"
        type="number"
        name="amount" // Ispravljeno ime polja
        value={formData.amount}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Svrha kredita"
        name="loanPurpose" // Ispravljeno ime polja
        value={formData.loanPurpose}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Iznos mesečne plate"
        type="number"
        name="salary" // Ispravljeno ime polja
        value={formData.salary}
        onChange={handleChange}
      />
      <br />
      <FormControlLabel
        control={<Checkbox
          checked={formData.permanentEmployee}
          onChange={handleChange}
          name="permanentEmployee" // Ispravljeno ime polja
        />}
        label="Zaposlen za stalno"
      />
      <br />
      <TextField
        label="Period zaposlenja"
        name="currentEmploymentPeriod" // Ispravljeno ime polja
        value={formData.currentEmploymentPeriod}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Broj Bankovnog racuna"
        name="bankAccountNumber" // Ispravljeno ime polja
        value={formData.bankAccountNumber}
        onChange={handleChange}
      />
      <br />
      <TextField
        label="Ekspozitura"
        name="branchOffice" // Ispravljeno ime polja
        value={formData.branchOffice}
        onChange={handleChange}
      />
      <br />
      <Button variant="contained" onClick={handlePosalji} disabled={loading}>Pošalji</Button>
    </div>
  );
};

export default TraziKreditStranica;
