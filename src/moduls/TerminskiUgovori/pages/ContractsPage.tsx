import { Table, TableBody, TableRow } from '@mui/material';
import styled from 'styled-components';
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from 'utils/tableStyles';

import { useEffect, useState } from 'react';
import { makeGetRequest } from 'utils/apiRequest';
import BuyOptionPopup from 'berza/components/BuyOptionPopupContract';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 80px;
`

const TableWrapper = styled.div`
  width: 100%;
  display: flex!important;
  justify-content: center;
`
const StyledTable = styled.div`
  display: flex;
  max-width: 1200px;
  flex-grow: 1;
  flex-direction: column;
`

const HeadingText = styled.div`
  font-size: 45px;
`

const HeadingAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: bottom;
  padding: 0 10px; 
  max-width: 1200px; 
  margin-bottom: 86px; 
`


const ContractsPage = () => {
    const [type, setType] = useState('');
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setType(urlParams?.get('type') ?? '')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (type) {
                try {
                    console.log(type);
                    const con = await makeGetRequest(`/futures/type/${type.toUpperCase()}`);
                    if (con) {

                        setContracts(con)
                    }
                } catch (error) {
                }
            }
        };
        fetchData();

    }, [type]);

    return (
        <PageWrapper>
            <HeadingAndButtonWrapper>
                <HeadingText>{type} Contracts</HeadingText>
            </HeadingAndButtonWrapper>

            <TableWrapper>
                <StyledTable>

                    <ScrollContainer>
                        <Table sx={{ minWidth: 650, marginTop: 0 }}>
                            <StyledTableHead>
                                <TableRow>
                                    <StyledHeadTableCell>Name</StyledHeadTableCell>
                                    <StyledHeadTableCell>Contract unit</StyledHeadTableCell>
                                    <StyledHeadTableCell>Contract Size</StyledHeadTableCell>
                                    <StyledHeadTableCell>Maintenance Margin</StyledHeadTableCell>
                                    <StyledHeadTableCell>Buy</StyledHeadTableCell>

                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {contracts?.map((contract: any) => (
                                    <StyledTableRow key={contract.name} id={contract.name}>
                                        <StyledTableCell>{contract.name}</StyledTableCell>
                                        <StyledTableCell>{contract.contractUnit}</StyledTableCell>
                                        <StyledTableCell>{contract.contractSize}</StyledTableCell>
                                        <StyledTableCell>{contract.maintenanceMargin}</StyledTableCell>
                                        <StyledTableCell>
                                            <BuyOptionPopup contractId={contract.id || contract.name} />
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollContainer>
                </StyledTable>
            </TableWrapper>
        </PageWrapper>
    );
};


export default ContractsPage;
