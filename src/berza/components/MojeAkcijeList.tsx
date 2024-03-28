import { Table, TableBody, TableRow } from "@mui/material"
import { Stock, StockList } from "berza/types/types"
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";

const MojeAkcijeList: React.FC<StockList> = ({ stocks }) => {

    const handleSelect = (event: any) => {
        const id = event.currentTarget.id;
        console.log(id)
    };

    return (
        <Table sx={{ minWidth: 650, marginTop: 0 }}>
            <StyledTableHead>
                <TableRow>
                    <TableRow>
                        <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                        <StyledHeadTableCell>Cena</StyledHeadTableCell>
                        <StyledHeadTableCell>Kolicina</StyledHeadTableCell>
                        <StyledHeadTableCell>Kolicina za prodaju</StyledHeadTableCell>
                        <StyledHeadTableCell>Kupi</StyledHeadTableCell>
                    </TableRow>
                </TableRow>
            </StyledTableHead>
            <TableBody>
                {stocks?.map((stock: Stock) => (
                    <StyledTableRow key={stock.ticker} id={stock.ticker} onClick={handleSelect}>
                        <StyledTableCell>{stock.ticker}</StyledTableCell>
                        <StyledTableCell>{stock.lastPrice}</StyledTableCell>
                        <StyledTableCell>{stock.contractSize}</StyledTableCell>
                        <StyledTableCell>{stock.openInterest}</StyledTableCell>
                        <StyledTableCell>
                            <BuyOptionPopup />
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table >
    )
}
export default MojeAkcijeList;