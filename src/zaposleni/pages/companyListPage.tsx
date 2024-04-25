import { AppBar, Tabs, Tab } from '@mui/material';
import CompanyList from '../components/companyList'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { makeGetRequest } from '../../utils/apiRequest';
import { Context } from 'App';

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;
  & > * > * {
    display: flex!important;
    justify-content: space-between!important;
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
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 0px;
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

const CompanyListPage: React.FC = () => {
  const [companies, setCompanies] = useState([])
  const ctx = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await makeGetRequest('/racuni/izlistajSveFirme', ctx);
        setCompanies(companies);
      } catch (error) {
        console.error('Error fetching company list:', error);
      }
    };
    fetchData();

  }, []);

  const navigate = useNavigate();

  const handleCreateCompany = (event: any) => {
    navigate(`/kreirajFirmu`)
  };

  return (
    <PageWrapper>

      <HeadingAndButtonWrapper>
        <HeadingText>Lista Firmi</HeadingText>
      </HeadingAndButtonWrapper>

      <TableWrapper>
        <StyledTable>
          <AppBar position="static" >
            <StyledTabs value={0}>
              <Tab label="Lista Firmi" />
              <ButtonTab onClick={handleCreateCompany}
                label="Dodaj Firmu" />
            </StyledTabs>
          </AppBar>
          <CompanyList companies={companies} />
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default CompanyListPage;
