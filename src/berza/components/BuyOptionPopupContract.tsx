import { Fragment, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { makeGetRequest, makeApiRequest} from 'utils/apiRequest'; // Pretpostavimo da imate ovu funkciju za pravljenje GET zahteva
import { getMe } from "utils/getMe";
import { Account, BankRoutes, Employee, UserRoutes } from "utils/types";

interface BuyOptionPopupProps {
  contractId: string;
}


export default function BuyOptionPopup({ contractId }: BuyOptionPopupProps) {
  const [open, setOpen] = useState(false);
  const [isMargin, setIsMargin] = useState<boolean | undefined>(undefined);

  const [pricePerUnit, setPricePerUnit] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(5000);
  const [maintenanceMargin, setMaintenanceMargin] = useState<number>(1600);
  const [initialMargin, setInitialMargin] = useState<number>(2000);
  const [currency, setCurrency] = useState<string>('');
  const [contract, setContract] = useState<string>('');
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  
  useEffect(() => {
    setIsMargin(undefined);
  }, [open]);

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

        const accountNumbers = data.map(account => account.brojRacuna);


        console.log(accountNumbers);
       setAccounts(accountNumbers);

      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    }
    
    fetchAccounts();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleBuy = async () => {

    const response = await makeApiRequest(`/futures/buy/`+contractId+"/"+selectedAccount, 'POST');

    console.log("DDD "+response);
    if(response.status == "200")
        {
            console.log("HGJ");
            setOpen(false);
            Swal.fire({
              
              title: "Uspeh",
              html: `
        
                <p>Uspesno kupljeno sa sledećim detaljima:</p>
                <p><strong>Cena:</strong> ${quantity}</p>
                <p><strong>Valuta:</strong> ${currency}</p>
                <p><strong>Račun:</strong> ${selectedAccount}</p>
                <p><strong>Id:</strong> ${contractId}</p>
              `,
              icon: "success"
            });
        }
    
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Buy
      </Button>
      {isMargin === undefined && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Kupi akciju"}</DialogTitle>
          <DialogContent>
            {"Da li zelite da koristite \"Cash\" ili \"Margin\" račun?"}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsMargin(false)} autoFocus>
              Cash
            </Button>
        
          </DialogActions>
        </Dialog>
      )}

      {isMargin === true && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Kupi akciju"}</DialogTitle>
          <DialogContent>
            {`Ukupna vrednost hartije: ${(pricePerUnit * quantity)} \n`}
            <br />
            {`Initial margin: ${initialMargin} \n`}
            <br />
            {`Maintenance margin: ${maintenanceMargin} \n`}
            <br />
            {`Vrednost duga: ${(pricePerUnit * quantity) - initialMargin} \n`}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Zatvori</Button>
            <Button onClick={handleBuy}>Potvrdi</Button>
          </DialogActions>
        </Dialog>
      )}

      {isMargin === false && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Kupi akciju"}</DialogTitle>
          <DialogContent>

            <TextField
              label="Cena"
              name="kolicina"
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }}>
              <InputLabel id="valuta">Valuta</InputLabel>
              <Select
                labelId="valuta"
                name="valuta"
                id="valutaId"
                value={currency}
                label="Valuta"
                onChange={(e) => setCurrency(e.target.value as string)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>

            
            {/* 
                <TextField
              label="Cena po komadu"
              name="cena"
              variant="outlined"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Kolicina"
              name="kolicina"
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              fullWidth
              margin="normal"
            />

                <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }}>
              <InputLabel id="ugovor">Ugovor</InputLabel>
              <Select
                labelId="ugovor"
                name="ugovor"
                id="ugovorId"
                value={contract}
                label="Ugovor"
                onChange={(e) => setContract(e.target.value as string)}
              >
                <MenuItem value="Contract A">Contract A</MenuItem>
                <MenuItem value="Contract B">Contract B</MenuItem>
                <MenuItem value="Contract C">Contract C</MenuItem>
              </Select>
            </FormControl>
            
            */}

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
          
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Izlaz</Button>
            <Button onClick={handleBuy} autoFocus>
              Kupi
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
}
