import { AppBar, Paper, Tab, Table, TableBody, TableContainer, TableRow, Tabs } from '@mui/material';
import styled from 'styled-components';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from 'utils/tableStyles';
import { useEffect, useState } from 'react';
import BuyStockPopup from 'berza/components/BuyStockPopup';
import { makeGetRequest } from 'utils/apiRequest';
import { getMe } from 'utils/getMe';

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
const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;
`
const StyledSubTabs = styled(StyledTabs)`
    background-color: #f2f2f2;
    & > * > * {
    display: flex!important;
    justify-content: right!important;
    margin: 6px!important;
  }
`

const ButtonTab = styled(Tab)`
  background-color: #718bb0!important;
  color: white!important;
  border-radius: 13px!important;
  &:hover{
    background-color: #39547a!important;
  }
`

const SpecificContractListPage = () => {
    const [type, setType] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setType(urlParams?.get('type') ?? '');

        (async () => {
            const result = await makeGetRequest("/futures/kupac/" + getMe()?.id);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleBuy = () => {

    }


    return (
        <PageWrapper>
            <HeadingAndButtonWrapper>
                <HeadingText>{type} Contracts</HeadingText>
            </HeadingAndButtonWrapper>

            <TableWrapper>
                <StyledTable>
                    <AppBar position="static" >
                        <StyledTabs value={0}>
                            <Tab label="Terminski ugovori" />
                            <Tab label="Moji terminski ugovori" />

                        </StyledTabs>
                    </AppBar>
                    <AppBar position="static" >
                        <StyledSubTabs>
                            <ButtonTab onClick={handleBuy}
                                label="Kupi sa limitom" />

                        </StyledSubTabs>

                    </AppBar>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, marginTop: 0 }}>
                            <StyledTableHead>
                                <TableRow>
                                    <StyledHeadTableCell>Naziv</StyledHeadTableCell>
                                    <StyledHeadTableCell>Vlasnik</StyledHeadTableCell>
                                    <StyledHeadTableCell>Cena</StyledHeadTableCell>
                                    <StyledHeadTableCell>Datum</StyledHeadTableCell>
                                    <StyledHeadTableCell>Opcije</StyledHeadTableCell>
                                    <StyledHeadTableCell>OTC</StyledHeadTableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {[{ name: 'asd', owner: 'asd', price: '231', date: '123', }]?.map((contract: any) => (
                                    <StyledTableRow key={contract.name} id={contract.name}>
                                        <StyledTableCell>{contract.name}</StyledTableCell>
                                        <StyledTableCell>{contract.owner}</StyledTableCell>
                                        <StyledTableCell>{contract.price}</StyledTableCell>
                                        <StyledTableCell>{contract.date}</StyledTableCell>
                                        <StyledTableCell><BuyStockPopup /></StyledTableCell>
                                        <StyledTableCell><BuyStockPopup /></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </StyledTable>
            </TableWrapper>
        </PageWrapper>
    );
};


export default SpecificContractListPage;
