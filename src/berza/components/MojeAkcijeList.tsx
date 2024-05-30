import { Table, TableBody, TableRow } from "@mui/material"
import { Stock } from "berza/types/types"
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";
import { useEffect, useState } from "react";
import { makeApiRequest, makeGetRequest } from "utils/apiRequest";
import { getMe } from "utils/getMe";

const MojeAkcijeList: React.FC = () => {
    const [userStocks, setUserStocks] = useState([]);
    const auth = getMe()
    useEffect(() => {
        const fetchData = async () => {
            const data = {
                "userId": 1,
                "ticker": "aapl",
                "quantity": 69
            }
            try {
                await makeApiRequest('/user-stocks', 'PUT', data);
                const stocks = await makeGetRequest(`/user-stocks/${auth?.id}`);
                if (stocks) {
                    setUserStocks(stocks);
                }
            } catch (error) {
            }
        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSelect = (event: any) => {
        //const id = event.currentTarget.id;
    };

    return (
        <ScrollContainer>
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Oznaka</StyledHeadTableCell>
                        <StyledHeadTableCell>Cena</StyledHeadTableCell>
                        <StyledHeadTableCell>Kolicina</StyledHeadTableCell>
                        <StyledHeadTableCell>Kolicina za prodaju</StyledHeadTableCell>
                        <StyledHeadTableCell>Kupi</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {userStocks?.map((stock: Stock) => (
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
        </ScrollContainer>
    )
}
export default MojeAkcijeList;