import { Button, Table, TableBody, TableRow } from "@mui/material"
import { OptionsList, Options } from "berza/types/types"
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";
import { getMe } from "utils/getMe";
import { useContext } from "react";
import { Context } from "App";
import { makeApiRequest, makeGetRequest } from "utils/apiRequest";
import { Employee, UserRoutes } from "utils/types";


const PutsList: React.FC<OptionsList> = ({ options }) => {

    const ctx = useContext(Context);
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
                        <StyledHeadTableCell>Buy</StyledHeadTableCell>
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
                                <Button variant="outlined" onClick={async () => {
                                    const auth = getMe();
                                    let userId = 0;
                                    if (auth?.permission !== 0) {
                                        const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${auth?.sub}`) as Employee;
                                        userId = worker.firmaId;
                                    } else {
                                        userId = auth.id
                                    }
                                    const data = {
                                        korisnikId: userId,
                                        opcijaId: option.id,
                                        ticker: option.ticker,
                                        akcijaTickerCenaPrilikomIskoriscenja: option.strikePrice
                                    }
                                    try {
                                        const res = await makeApiRequest(UserRoutes.buy_option, "POST", data, false, false, ctx);
                                        ctx?.setErrors(["Our success: Uspesna kupovina opcije"])
                                    }
                                    catch (e) {
                                        ctx?.setErrors(["Our success: Uspesna kupovina opcije"])
                                    }
                                }}>
                                    Buy
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollContainer>
    )
}
export default PutsList;