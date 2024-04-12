import { Table, TableBody, TableRow } from "@mui/material"
import { UserStock, UserStockList } from "berza/types/types"
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";
import ScrollableTableBody from "utils/ScrollableTableBody";


const UserOptions: React.FC<UserStockList> = ({ stocks }) => {

    const handleSelect = (event: any) => {
        const id = event.currentTarget.id;
        console.log(id)
    };

    return (
        <>
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Ticker</StyledHeadTableCell>
                        <StyledHeadTableCell>Strike</StyledHeadTableCell>
                        <StyledHeadTableCell>Premium</StyledHeadTableCell>
                        <StyledHeadTableCell>Amount</StyledHeadTableCell>
                        <StyledHeadTableCell>Exparation Date</StyledHeadTableCell>
                        <StyledHeadTableCell>Sell</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
            </Table>
            <ScrollableTableBody>
                <TableBody>
                    {stocks?.map((stock: UserStock) => (
                        <StyledTableRow key={stock.ticker} id={stock.ticker} onClick={handleSelect}>
                            <StyledTableCell>{stock.ticker}</StyledTableCell>
                            <StyledTableCell>{stock.strike}</StyledTableCell>
                            <StyledTableCell>{stock.lastPrice}</StyledTableCell>
                            <StyledTableCell>{stock.premium}</StyledTableCell>
                            <StyledTableCell>{stock.amount}</StyledTableCell>
                            <StyledTableCell>
                                <BuyOptionPopup />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </ScrollableTableBody>
        </>
    )
}
export default UserOptions;