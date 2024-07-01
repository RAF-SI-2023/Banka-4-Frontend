import { Button, Table, TableBody, TableRow } from "@mui/material";
import { OurOffer, OurOfferList } from "berza/types/types";
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import { useNavigate } from "react-router-dom";

const SendOtcOffers: React.FC<OurOfferList> = ({ offers }) => {
    const navigate = useNavigate();

    

    return (
        <ScrollContainer>
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                        <StyledHeadTableCell>Kolicina</StyledHeadTableCell>
                        <StyledHeadTableCell>Iznos Ponude</StyledHeadTableCell>
                        <StyledHeadTableCell>Status</StyledHeadTableCell>

                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {offers.map((offer: OurOffer) => (
                        <StyledTableRow key={offer.myOfferId} id={offer.myOfferId}>
                            <StyledTableCell>{offer.ticker}</StyledTableCell>
                            <StyledTableCell>{offer.amount}</StyledTableCell>
                            <StyledTableCell>{offer.price}</StyledTableCell>
                            <StyledTableCell>{offer.offerStatus}</StyledTableCell>
                            
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollContainer>
    );
};

export default SendOtcOffers;
