import { Table, TableBody, TableRow } from "@mui/material"
import { Akcija, AkcijaList } from "berza/types/types"
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from '../../utils/tableStyles';
import BuyOptionPopup from "./BuyOptionPopup";
import BuyStockPopup from "./BuyStockPopup";
import ScrollableTableBody from "utils/ScrollableTableBody";

const AkcijeList: React.FC<AkcijaList> = ({ stocks }) => {

    const handleSelect = (event: any) => {
        const id = event.currentTarget.id;
        console.log(id)
    };

    return (
        <>
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
                        <StyledHeadTableCell>OTC</StyledHeadTableCell>
                    </TableRow>
                </StyledTableHead>
            </Table >
            <ScrollableTableBody>
                <TableBody>
                    {stocks?.map((stock: Akcija) => (
                        <StyledTableRow key={stock.oznaka} id={stock.oznaka} onClick={handleSelect}>
                            <StyledTableCell>{stock.oznaka}</StyledTableCell>
                            <StyledTableCell>{stock.cena}</StyledTableCell>
                            <StyledTableCell>{stock.volume}</StyledTableCell>
                            <StyledTableCell>{stock.promena}</StyledTableCell>
                            <StyledTableCell>{stock.promenaProcenat}</StyledTableCell>
                            <StyledTableCell>{stock.poslednjeAzuriranje}</StyledTableCell>
                            <StyledTableCell><BuyStockPopup /></StyledTableCell>
                            <StyledTableCell><BuyOptionPopup /></StyledTableCell>
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
export default AkcijeList;