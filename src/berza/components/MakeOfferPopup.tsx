import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { IOTC } from "berza/types/types";
import { makeApiRequest } from "utils/apiRequest";

interface MakeOfferPopupProps {
    open: boolean;
    stock: IOTC;
    onClose: () => void;
}

const MakeOfferPopup: React.FC<MakeOfferPopupProps> = ({ open, stock, onClose }) => {
    const [offerAmount, setOfferAmount] = useState("");
    const [offerQuantity, setOfferQuantity] = useState("");

    const handleMakeOffer = async () => {
        // Add your make offer logic here
        const result = await makeApiRequest("/v1/otcTrade/makeOffer", "POST", {
            ticker: stock.ticker,
            amount: offerQuantity,
            price: offerAmount,
         
        })
        console.log(result);
        console.log(`Offer made for ${stock.ticker} with amount: ${offerAmount}`);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Napravi ponudu</DialogTitle>
            <DialogContent>
                <p>Unseite vasu ponudu za {stock.ticker}:</p>
                <br />
                <TextField
                    label="Cena"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Kolicina"
                    value={offerQuantity}
                    onChange={(e) => setOfferQuantity(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Prekini</Button>
                <Button onClick={handleMakeOffer} color="primary">
                    Posalji ponudu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MakeOfferPopup;
