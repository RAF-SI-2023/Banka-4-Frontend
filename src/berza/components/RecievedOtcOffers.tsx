import { Button, Table, TableBody, TableRow } from "@mui/material";
import { ForeignOffer, ForeignOfferList } from "berza/types/types";
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "utils/apiRequest";

const RecievedOtcOffers: React.FC<ForeignOfferList> = ({ offers }) => {
    const navigate = useNavigate();


    const handleAccept = async (offerId: string) => {
        try {
            const response = await makeApiRequest(`/v1/otcTrade/acceptOffer/${offerId}`, 'POST');
            alert(`Offer accepted successfully: ${JSON.stringify(response)}`);
        } catch (error) {
            alert(`Error accepting offer: ${error}`);
        }
    };

    const handleDecline = async (offerId: string) => {
        try {
            const response = await makeApiRequest(`/v1/otcTrade/declineOffer/${offerId}`, 'POST');
            alert(`Offer declined successfully: ${JSON.stringify(response)}`);
        } catch (error) {
            alert(`Error declining offer: ${error}`);
        }
    };


    return (
        <ScrollContainer>
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                        <StyledHeadTableCell>Kolicina</StyledHeadTableCell>
                        <StyledHeadTableCell>Iznos Ponude</StyledHeadTableCell>
                        <StyledHeadTableCell>Status</StyledHeadTableCell>
                        <StyledHeadTableCell>Prihvati</StyledHeadTableCell>
                        <StyledHeadTableCell>Odbij</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {offers.map((offer: ForeignOffer) => (
                        <StyledTableRow key={offer.offerId} id={offer.offerId}>
                            <StyledTableCell>{offer.ticker}</StyledTableCell>
                            <StyledTableCell>{offer.amount}</StyledTableCell>
                            <StyledTableCell>{offer.price}</StyledTableCell>
                            <StyledHeadTableCell>{offer.offerStatus}</StyledHeadTableCell>
                            <StyledTableCell>
                                {offer.offerStatus === "PROCESSING" ?
                                    <Button onClick={() => handleAccept(offer.offerId)}>
                                        Prihvati
                                    </Button> : null
                                }
                            </StyledTableCell>
                            <StyledTableCell>
                                {offer.offerStatus === "PROCESSING" ?
                                    <Button onClick={() => handleDecline(offer.offerId)}>
                                        Odbij
                                    </Button> : null
                                }
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollContainer>
    );
};

export default RecievedOtcOffers;
