import { Button, Table, TableBody, TableRow } from "@mui/material"
import { Akcija, AkcijaList } from "berza/types/types"
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";
import BuyStockPopup from "./BuyStockPopup";
import { useNavigate } from "react-router-dom";

const AkcijeList: React.FC<AkcijaList> = ({ stocks }) => {
    const navigate = useNavigate()
    // const handleSelect = (event: any) => {
    //     const id = event.currentTarget.id;
    //     navigate(`/detaljiAkcije?ticker=${id}`)
    // };

    return (
        <ScrollContainer>
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                        <StyledHeadTableCell>Cena</StyledHeadTableCell>
                        <StyledHeadTableCell>Volume</StyledHeadTableCell>
                        <StyledHeadTableCell>Promena</StyledHeadTableCell>
                        <StyledHeadTableCell>Promena%</StyledHeadTableCell>
                        <StyledHeadTableCell>Poslednje azuriranje</StyledHeadTableCell>
                        <StyledHeadTableCell>Kupi</StyledHeadTableCell>
                        <StyledHeadTableCell>Detalji</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {stocks?.map((stock: Akcija) => (
                        <StyledTableRow key={stock.ticker} id={stock.ticker}>
                            <StyledTableCell>{stock.ticker}</StyledTableCell>
                            <StyledTableCell>{stock.price}</StyledTableCell>
                            <StyledTableCell>{stock.volume}</StyledTableCell>
                            <StyledTableCell>{stock.change}</StyledTableCell>
                            <StyledTableCell>{stock.dividendYield}</StyledTableCell>
                            <StyledTableCell>{stock.lastRefresh}</StyledTableCell>
                            <StyledTableCell><BuyStockPopup ticker={stock.ticker} /></StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => {
                                    navigate(`/detaljiAkcije?ticker=${stock.ticker}`)
                                }}>
                                    Detaljni prikaz</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>

            </Table >
        </ScrollContainer>
    )
}
export default AkcijeList;