import { Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import styled from 'styled-components';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from 'utils/tableStyles';
import ScrollableTableBody from 'utils/ScrollableTableBody';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setType(urlParams?.get('type') ?? '')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <PageWrapper>
            <HeadingAndButtonWrapper>
                <HeadingText>{type} Contracts</HeadingText>
            </HeadingAndButtonWrapper>

            <TableWrapper>
                <StyledTable>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, marginTop: 0 }}>
                            <StyledTableHead>
                                <TableRow>
                                    <StyledHeadTableCell>Name</StyledHeadTableCell>
                                    <StyledHeadTableCell>Contract unit</StyledHeadTableCell>
                                    <StyledHeadTableCell>Contract Size</StyledHeadTableCell>
                                    <StyledHeadTableCell>Maintenance Margin</StyledHeadTableCell>
                                </TableRow>
                            </StyledTableHead>
                        </Table>
                        <ScrollableTableBody>
                            <TableBody>
                                {[]?.map((contract: any) => (
                                    <StyledTableRow key={contract.name} id={contract.name}>
                                        <StyledTableCell>{contract.name}</StyledTableCell>
                                        <StyledTableCell>{contract.unit}</StyledTableCell>
                                        <StyledTableCell>{contract.size}</StyledTableCell>
                                        <StyledTableCell>{contract.margin}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </ScrollableTableBody>
                    </TableContainer>
                </StyledTable>
            </TableWrapper>
        </PageWrapper>
    );
};


export default ContractsPage;
