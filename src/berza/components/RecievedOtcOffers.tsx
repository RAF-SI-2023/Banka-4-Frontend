import { Button, Table, TableBody, TableRow } from "@mui/material";
import { ForeignOffer, ForeignOfferList } from "berza/types/types";
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import { useNavigate } from "react-router-dom";
import { makeApiRequest } from "utils/apiRequest";

const RecievedOtcOffers: React.FC<ForeignOfferList> = ({ offers }) => {
    const navigate = useNavigate();

    // Dummy offers if the offers array is empty
    if (!offers || offers.length === 0) {
        offers = [];
    }

    const handleAccept = async (offerId: string) => {
        try {
            const response = await makeApiRequest(`/offer/accept-foreign-offer`, 'POST', { offerId });
            alert(`Offer accepted successfully: ${JSON.stringify(response)}`);
        } catch (error) {
            alert(`Error accepting offer: ${error}`);
        }
    };
    
    const handleDecline = async (offerId: string) => {
        try {
            const response = await makeApiRequest(`/offer/decline-foreign-offer`, 'POST', { offerId });
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
                        <StyledHeadTableCell>Prihvati</StyledHeadTableCell>
                        <StyledHeadTableCell>Odbij</StyledHeadTableCell>
                        <StyledHeadTableCell>Detaljniji prikaz</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {offers.map((offer: ForeignOffer) => (
                        <StyledTableRow key={offer.id} id={offer.id}>
                            <StyledTableCell>{offer.ticker}</StyledTableCell>
                            <StyledTableCell>{offer.quantity}</StyledTableCell>
                            <StyledTableCell>{offer.amountOffered}</StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => handleAccept(offer.id)}>
                                    Prihvati
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => handleDecline(offer.id)}>
                                    Odbij
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => navigate(`/detaljiAkcije?ticker=${offer.ticker}`)}>
                                    Detaljni prikaz
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollContainer>
    );
};

export default RecievedOtcOffers;
