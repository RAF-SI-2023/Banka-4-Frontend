import { Table, TableBody, TableRow } from "@mui/material"
import { Stock } from "berza/types/types"
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";
import { useEffect, useState } from "react";
import { makeGetRequest } from "utils/apiRequest";
import { getMe } from "utils/getMe";
import { BankRoutes, Employee, UserRoutes } from "utils/types";

const MojeAkcijeList: React.FC = () => {
    const [userStocks, setUserStocks] = useState([]);
    const auth = getMe()
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("PERMISIJEEE")
                console.log(auth?.permission)
                let data;
                if (auth?.permission !== 0) {
                    const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${auth?.sub}`) as Employee

                    data = await makeGetRequest(`/user-stocks/${worker.firmaId}`);

                } else {
                    data = await makeGetRequest(`/user-stocks/${auth?.id}`);
                }
                //const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${getMe()?.sub}`) as Employee
                console.log("DATA JE KURAC");
                console.log(data);
                if(data){
                    setUserStocks(data);
                }
                /*if (auth?.permission) {
                    const stocks = await makeGetRequest(`/user-stocks/-1`);
                    if (stocks) {
                        setUserStocks(stocks);
                    }
                }*/
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