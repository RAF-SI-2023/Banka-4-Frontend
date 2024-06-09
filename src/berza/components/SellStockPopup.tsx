import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { IOTC } from "berza/types/types";

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
                    onClick={() => {
                        // Add your sell logic here
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
