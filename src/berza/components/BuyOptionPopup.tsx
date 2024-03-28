import {Fragment, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function BuyOptionPopup() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Buy
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Kupi akciju"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Cena po komadu"
            name="cena"
            variant="outlined"
            value={'$123'}
            onChange={() => { }}
            fullWidth
            margin="normal"
            disabled
          />
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }}>
            <InputLabel id="valuta">Valuta</InputLabel>
            <Select
              labelId="valuta"
              name="valuta"
              id="valutaId"
              value={0}
              label="Valuta"
              onChange={() => { }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Kolicina"
            name="kolicina"
            variant="outlined"
            value={'123'}
            onChange={() => { }}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }}>
            <InputLabel id="ugovor">Ugovor</InputLabel>
            <Select
              labelId="ugovor"
              name="ugovor"
              id="ugovorId"
              value={0}
              label="Age"
              onChange={() => { }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Izlaz</Button>
          <Button onClick={handleBuy} autoFocus>
            Kupi
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}