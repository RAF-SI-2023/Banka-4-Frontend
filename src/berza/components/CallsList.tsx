import { Table, TableBody, TableRow } from "@mui/material"
import { Stock, StockList } from "berza/types/types"
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";

const CallsList: React.FC<StockList> = ({ stocks }) => {

    const handleSelect = (event: any) => {
        const id = event.currentTarget.id;
        console.log(id)
    };

    return (
        <Table sx={{ minWidth: 650, marginTop: 0 }}>
            <StyledTableHead>
                <TableRow>
                    <StyledHeadTableCell>Ticker</StyledHeadTableCell>
                    <StyledHeadTableCell>Strike</StyledHeadTableCell>
                    <StyledHeadTableCell>Last Price</StyledHeadTableCell>
                    <StyledHeadTableCell>Bid</StyledHeadTableCell>
                    <StyledHeadTableCell>Ask</StyledHeadTableCell>
                    <StyledHeadTableCell>Change</StyledHeadTableCell>
                    <StyledHeadTableCell>Change%</StyledHeadTableCell>
                    <StyledHeadTableCell>Contract Size</StyledHeadTableCell>
                    <StyledHeadTableCell>Open Interest</StyledHeadTableCell>
                    <StyledHeadTableCell>Implied Volatility</StyledHeadTableCell>
                    <StyledHeadTableCell>Buy</StyledHeadTableCell>
                </TableRow>
            </StyledTableHead>
            <TableBody>
                {stocks?.map((stock: Stock) => (
                    <StyledTableRow key={stock.ticker} id={stock.ticker} onClick={handleSelect}>
                        <StyledTableCell>{stock.ticker}</StyledTableCell>
                        <StyledTableCell>{stock.strike}</StyledTableCell>
                        <StyledTableCell>{stock.lastPrice}</StyledTableCell>
                        <StyledTableCell>{stock.bid}</StyledTableCell>
                        <StyledTableCell>{stock.ask}</StyledTableCell>
                        <StyledTableCell>{stock.change}</StyledTableCell>
                        <StyledTableCell>{stock.changePercent}</StyledTableCell>
                        <StyledTableCell>{stock.contractSize}</StyledTableCell>
                        <StyledTableCell>{stock.openInterest}</StyledTableCell>
                        <StyledTableCell>{stock.impliedVolatility}</StyledTableCell>
                        <StyledTableCell>
                            <BuyOptionPopup/>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table >
    )
}
export default CallsList;