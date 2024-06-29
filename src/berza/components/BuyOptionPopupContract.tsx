import { Fragment, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { makeGetRequest, makeApiRequest } from 'utils/apiRequest';
import { getMe } from "utils/getMe";
import { Account, BankRoutes, Employee, UserRoutes } from "utils/types";

interface BuyOptionPopupProps {
  contractId: string;
  price_d: number;
}

export default function BuyOptionPopup({ contractId, price_d }: BuyOptionPopupProps) {
  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState<number>(5000);
  const [pricePerUnit, setPricePerUnit] = useState<number>(100); // Postavljena fiksna cena

  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const me = getMe();
        if (!me) return;

        let data: Account[];

        if (me.permission) {
          const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;
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
    const response = await makeApiRequest(`/futures/buy/` + contractId + "/" + selectedAccount, 'POST');
    console.log("DDD " + response);
    if (response.status === "200") {
      console.log("HGJ");
      setOpen(false);
      Swal.fire({
        title: "Uspeh",
        html: `
          <p>Uspesno kupljeno sa sledećim detaljima:</p>
          <p><strong>Cena po jedinici:</strong> ${pricePerUnit}</p>
          <p><strong>Račun:</strong> ${selectedAccount}</p>
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
            name="pricePerUnit"
            variant="outlined"
            value={price_d}
            fullWidth
            margin="normal"
            disabled
          />

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
    </Fragment>
  );
}
