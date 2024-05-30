import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import KAlert from 'utils/alerts';
import { Company } from 'utils/types';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 80px;
`

const FormWrapper = styled.div`
    background-color: #fafafa;
    padding: 30px 40px;
    border-radius: 18px;
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const HeadingText = styled.div`
  font-size: 32px;
`

const H2Text = styled.div`
  font-size: 22px;
  text-align: center;
  margin: 6px 0px;
`

const StyledTableCell = styled(TableCell)`
  text-align: center!important;
  &:not(:last-child){
    border-right: 1px solid #e2e2e2;
    text-align: left!important;
  }
  &:last-child{
    word-break: break-all;
  }
`

const formatTitle = (title: string): string => {
  return title.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const CompanyInfoTable: React.FC = () => {
  const location = useLocation();
  const { company } = location.state as { company: Company };
  const [successPopup, setSucessPopup] = useState<boolean>(false);

  return (
    <PageWrapper>
      <HeadingText>Company</HeadingText>
      <FormWrapper>
        {successPopup && <KAlert severity="success" exit={() => setSucessPopup(false)}>Successfully updated.</KAlert>}
        <H2Text>Info</H2Text>
        <TableContainer component={Paper}>
          <Table aria-label="company information table">
            <TableBody>
              {company && Object.entries(company).map(([field, info]) => (
                field !== 'accounts' && <TableRow key={field}>
                  <StyledTableCell component="th" scope="row">
                    {formatTitle(field)}
                  </StyledTableCell>
                  <StyledTableCell>{field === "date_of_establishment" ? new Date(info).toLocaleDateString("en-de") : info}</StyledTableCell>
                </TableRow>
              ))}
              <TableRow>
              
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <H2Text>Accounts</H2Text>
        
      </FormWrapper>
    </PageWrapper>
  );
};

export default CompanyInfoTable;
