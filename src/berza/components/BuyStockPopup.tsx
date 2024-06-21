import { Fragment, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Context } from 'App';
import { getMe } from 'utils/getMe';
import { makeGetRequest, makeApiRequest } from 'utils/apiRequest';
import { Account, AccountListProps, BankRoutes, Employee, UserRoutes } from "utils/types";

const TipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 2px;
`
interface BuyStockPopupProps {
  ticker?: string; // Optional string prop
}


const BuyStockPopup: React.FC<BuyStockPopupProps> = ({ ticker }) => {
  const [open, setOpen] = useState(false);
  const [kolicina, setKolicina] = useState('')
  const [limit, setLimit] = useState('')
  const [stop, setStop] = useState('')
  const [margin, setMargin] = useState(false)
  const [allOrNone, setAllOrNone] = useState(false)
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  const ctx = useContext(Context);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchAccounts() {
      try {

        const me = getMe();
        if (!me)
          return;

        let data: Account[];

        if (me.permission) {
          const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee
  
        
          data = await makeGetRequest(`${BankRoutes.account_find_user_account}/${worker.firmaId}`);
          
        } else {
          data = await makeGetRequest(`${BankRoutes.account_find_user_account}/${me.id}`);
         
        }

        
        const accountNumbers = data.map(account => account.brojRacuna +" - " +account.raspolozivoStanje);


        console.log(accountNumbers);
       setAccounts(accountNumbers);

      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    }
    
    fetchAccounts();
  }, []);

  const handleBuy = async () => {

    const data = {
      "userId": getMe()?.id,
      "ticker": ticker,
      "quantity": kolicina
    }
    try {
      const result = await makeApiRequest("/user-stocks", 'PUT', data, false, false, ctx);
      ctx?.setErrors(["Our Success: Uspesno kupljeno"])
    }
    catch (e) {
      ctx?.setErrors(["Our Error: Neuspesno kupljeno"])
    }
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
          {"Kupi akciju " + (ticker || "")}
        </DialogTitle>
        <DialogContent>

            
        <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }}>
              <InputLabel id="racun">Račun</InputLabel>
              <Select
                labelId="racun"
                name="racun"
                id="racunId"
                value={selectedAccount}
                label="Račun"
                onChange={(e) => setSelectedAccount(e.target.value as string)}
              >
                {accounts.map((account, index) => (
                  <MenuItem key={index} value={account}>
                    {account}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          <TextField
            label="Kolicina"
            name="kolicina"
            variant="outlined"
            value={kolicina}
            onChange={(e) => { setKolicina(e.target.value) }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Limit"
            name="limit"
            variant="outlined"
            value={limit}
            onChange={(e) => { setLimit(e.target.value) }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stop"
            name="stop"
            variant="outlined"
            value={stop}
            onChange={(e) => { setStop(e.target.value) }}
            fullWidth
            margin="normal"
          />

          <TipWrapper>
            <Typography variant='body2'>* Ako su oba 0 onda se radi Market Order</Typography>
            <Typography variant='body2'>* Ako je jedan stavljen, a drugi 0, radi se šta ste odabrali (Limit ili Stop Order)</Typography>
            <Typography variant='body2'>* Ako su oba stavljena, radi se Stop-Limit order</Typography>
          </TipWrapper>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={margin} onChange={(e) => setMargin(e.target.checked)} />} label="Marign" />
            <FormControlLabel control={<Checkbox checked={allOrNone} onChange={(e) => setAllOrNone(e.target.checked)} />} label="AllOrNone" />
         
      
          </FormGroup>
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

export default BuyStockPopup