import { Table, TableBody, TableRow } from "@mui/material"
import { OptionsList, Options } from "berza/types/types"
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";


const PutsList: React.FC<OptionsList> = ({ options }) => {

    const handleSelect = (event: any) => {
        //const id = event.currentTarget.id;
    };



    return (
        <ScrollContainer>
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
                        <StyledHeadTableCell>Sell</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                {options?.map((option: Options) => (
                        <StyledTableRow key={option.ticker} id={option.ticker} onClick={handleSelect}>
                            <StyledTableCell>{option.ticker}</StyledTableCell>
                            <StyledTableCell>{option.strikePrice}</StyledTableCell>
                            <StyledTableCell>{option.lastPrice}</StyledTableCell>
                            <StyledTableCell>{option.bid}</StyledTableCell>
                            <StyledTableCell>{option.ask}</StyledTableCell>
                            <StyledTableCell>{option.change}</StyledTableCell>
                            <StyledTableCell>{option.percentChange}</StyledTableCell>
                            <StyledTableCell>{option.contractSize}</StyledTableCell>
                            <StyledTableCell>{option.openInterest}</StyledTableCell>
                            <StyledTableCell>{option.impliedVolatility}</StyledTableCell>
                            <StyledTableCell>
                                <BuyOptionPopup />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollContainer>
    )
}
export default PutsList;