import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { IOTC } from "berza/types/types";
import { makeApiRequest } from "utils/apiRequest";

interface SellStockPopupProps {
    open: boolean;
    stock: IOTC;
    onClose: () => void;
}

const SellStockPopup: React.FC<SellStockPopupProps> = ({ open, stock, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Sell Stock</DialogTitle>
            <DialogContent>
                <p>Da li hocete da postavite javnu ponudu za {stock.amount} deonica {stock.ticker}?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Ne</Button>
                <Button
                    onClick={async () => {
                        // Add your sell logic here
                        const result = await makeApiRequest("/offer/place-offer", "POST", {
                            ticker: stock.ticker,
                            quantity: 1,
                            amountOffered: stock.amount
                        })
                        onClose();
                    }}
                    color="primary"
                >
                    Da
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SellStockPopup;
