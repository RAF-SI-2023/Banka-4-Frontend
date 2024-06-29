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

    const handleMakeOffer = async () => {
        // Add your make offer logic here
        const result = await makeApiRequest("/offer/place-offer", "POST", {
            ticker: stock.ticker,
            quantity: stock.amount,
            amountOffered: offerAmount
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
                    label="Offer Amount"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
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
