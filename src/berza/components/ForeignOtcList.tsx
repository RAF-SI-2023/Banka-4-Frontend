import { Button, Table, TableBody, TableRow } from "@mui/material";
import { IOTC, IOtcList } from "berza/types/types";
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MakeOfferPopup from "./MakeOfferPopup";

const ForeignOtcList: React.FC<IOtcList> = ({ otcs }) => {
    const navigate = useNavigate();
    const [selectedStock, setSelectedStock] = useState<IOTC | null>(null);
    const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);

    const handleOfferClick = (stock: IOTC) => {
        setSelectedStock(stock);
        setIsOfferPopupOpen(true);
    };

    const handleCloseOfferPopup = () => {
        setIsOfferPopupOpen(false);
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
                            <StyledHeadTableCell>Kupi</StyledHeadTableCell>
                            <StyledHeadTableCell>Detaljniji prikaz</StyledHeadTableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {otcs?.map((stock: IOTC) => (
                            <StyledTableRow key={stock.ticker} id={stock.ticker}>
                                <StyledTableCell>{stock.ticker}</StyledTableCell>
                                <StyledTableCell>{stock.amount}</StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => handleOfferClick(stock)}>
                                        Daj ponudu
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
                <MakeOfferPopup
                    open={isOfferPopupOpen}
                    stock={selectedStock}
                    onClose={handleCloseOfferPopup}
                />
            )}
        </>
    );
};

export default ForeignOtcList;
