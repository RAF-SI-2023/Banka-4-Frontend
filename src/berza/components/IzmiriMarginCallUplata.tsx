import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { GrupaHartijaOdVrednosti, MarginAccount } from 'utils/types';

export default function IzmiriMarginCallUplata() {
  const [marginAccounts, setMarginAccounts] = useState<[MarginAccount]>([{
    brojRacuna: "1",
    currency: "RSD",
    grupaHartijaOdVrednosti: GrupaHartijaOdVrednosti.Stock,
    ulozenaSredstva: 2000,
    pozajmljenaSredstva: 2000,
    marginaOdrzavanja: 3000,
    marginCall: true
  }])
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  const racun = marginAccounts[selectedAccountIndex];
  const [iznos, setIznos] = useState("0");
  useEffect(() => {
    const racun = marginAccounts[selectedAccountIndex];
    setIznos((racun.marginaOdrzavanja - racun.ulozenaSredstva).toString());
  }, [selectedAccountIndex])

  return <Fragment><Dialog

    open={true}
    onClose={() => { }}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Uplati sredstva"}
    </DialogTitle>


    <DialogContent>
      <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }}>
        <InputLabel id="racun">Izaberite račun</InputLabel>
        <Select
          labelId="racun"
          name="racun"
          id="racunId"
          value={selectedAccountIndex}
          label="Izaberite račun"
          onChange={(e) => { setSelectedAccountIndex(parseInt(e.target.value as string)) }}
        >
          {marginAccounts.map((e, i) => <MenuItem value={i}>{e.brojRacuna}</MenuItem>)}
        </Select>
      </FormControl>
      {`Minimalno uplata za izmirenje Margin Calla: ${racun.marginaOdrzavanja - racun.ulozenaSredstva}\n`}

      <TextField
        label="Iznos"
        name="iznos"
        variant="outlined"
        value={iznos}
        onChange={(e) => { setIznos(e.target.value) }}
        fullWidth
        margin="normal"
      />

    </DialogContent>


    <DialogActions>
      <Button onClick={() => {
        if (parseFloat(iznos) >= racun.marginaOdrzavanja - racun.ulozenaSredstva) {
          Swal.fire("Uspeh", "Uspesno izmiren margin call", "success")
        }
        else {
          Swal.fire("Greska", "Povecajte iznos da biste izmirili margin call", "warning")
        }
      }} autoFocus >Potvrdi</Button>
    </DialogActions>
  </Dialog>
  </Fragment>
}