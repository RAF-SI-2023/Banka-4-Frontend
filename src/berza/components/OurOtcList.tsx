import { Button, Table, TableBody, TableRow } from "@mui/material";
import { IOTC, IOtcList } from "berza/types/types";
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SellStockPopup from "./SellStockPopup";

const OurOtcList: React.FC<IOtcList> = ({ otcs }) => {
    const navigate = useNavigate();
    const [selectedStock, setSelectedStock] = useState<IOTC | null>(null);
    const [isSellPopupOpen, setIsSellPopupOpen] = useState(false);

    const handleSellClick = (stock: IOTC) => {
        setSelectedStock(stock);
        setIsSellPopupOpen(true);
    };

    const handleCloseSellPopup = () => {
        setIsSellPopupOpen(false);
        setSelectedStock(null);
    };

    return (
        <>
            <ScrollContainer>
                <Table sx={{ minWidth: 650, marginTop: 0 }}>
                    <StyledTableHead>
                        <TableRow>
                            <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                            <StyledHeadTableCell>Kolicina</StyledHeadTableCell>
                            <StyledHeadTableCell>Postavi javno</StyledHeadTableCell>
                            <StyledHeadTableCell>Detaljniji prikaz</StyledHeadTableCell>  
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {otcs?.map((stock: IOTC) => (
                            <StyledTableRow key={stock.ticker} id={stock.ticker}>
                                <StyledTableCell>{stock.ticker}</StyledTableCell>
                                <StyledTableCell>{stock.amount}</StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => handleSellClick(stock)}>
                                        Sell
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => navigate(`/detaljiAkcije?ticker=${stock.ticker}`)}>
                                        Detaljni prikaz
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollContainer>
            {selectedStock && (
                <SellStockPopup
                    open={isSellPopupOpen}
                    stock={selectedStock}
                    onClose={handleCloseSellPopup}
                />
            )}
        </>
    );
};

export default OurOtcList;
