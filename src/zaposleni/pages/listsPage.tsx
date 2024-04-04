import { AppBar, Tabs, Tab, Button } from '@mui/material';
import UserList from '../components/userList'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/employeeList';
import CompanyList from '../components/companyList';
import { useEffect, useState } from 'react';
import { makeGetRequest } from '../../utils/apiRequest';

import '../../App.css';

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;

`

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
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
  padding-left:15px;
  padding-right:15px;
`

const HeadingText = styled.div`
  font-size: 2.617924rem;
  font-Family: Georgia , serif;
`

const HeadingAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: bottom;
  padding: 0 10px; /* Add padding according to your layout */
  max-width: 1200px; /* Match this with your StyledTable's max-width for alignment */
  margin-bottom: 16px; /* Space between the heading/button and the table below */
`

const buttonStyle = {
  backgroundColor: 'var(--secondary-blue)',
  width: '155px',
  height: '70px',
  minWidth: '100px',
  minHeight: '30px',
  maxWidth: '200px',
  maxHeight: '50px',
  fontSize:'0.81rem',
  whiteSpace: 'nowrap'
};



const UserAndAccountList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [usrs, setUsrs] = useState([])
  const [employees, setEmployees] = useState([])
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await makeGetRequest('/korisnik');
        setUsrs(users);
        const employees = await makeGetRequest('/radnik');
        setEmployees(employees)
        const companies = await makeGetRequest('/racuni/izlistajSveFirme');
        setCompanies(companies)
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };
    fetchData();

  }, []);

  const navigate = useNavigate();

  const handleCreateUser = (event: any) => {
    navigate(`/kreirajKorisnika`)
  };
  const handleCreateEmployee = (event: any) => {
    navigate(`/kreirajZaposlenog`)
  };
  const handleCreateCompany = (event: any) => {
    navigate(`/kreirajFirmu`)
  };
  const handleChange = (event: React.SyntheticEvent<unknown>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const permissions = true
  const permissions3 = true
  const permissions4 = true


  return (
    <PageWrapper>

      <HeadingAndButtonWrapper>
        <HeadingText>Spiskovi</HeadingText>
        {permissions && selectedTab === 0 && (
          <Button variant="contained" onClick={handleCreateUser} sx={buttonStyle} >
            Dodaj Korisnika
          </Button>
        )}
        {permissions3 && selectedTab === 1 && (
          <Button variant="contained" onClick={handleCreateEmployee} sx={buttonStyle}>
            Dodaj Zaposlenog
          </Button>
        )}
        {permissions4 && selectedTab === 2 && (
          <Button variant="contained" onClick={handleCreateCompany} sx={buttonStyle}>
            Dodaj Firmu
          </Button>
        )}
      </HeadingAndButtonWrapper>

      <TableWrapper>
        <StyledTable>
          <AppBar position="static" >
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <Tab label="Lista Korisnika" />
              <Tab label="Lista Zaposlenih" />
              <Tab label="Lista Firmi" />
            </StyledTabs>
          </AppBar>
          {selectedTab === 0 && <UserList users={usrs} />}
          {selectedTab === 1 && <EmployeeList employees={employees} />}
          {selectedTab === 2 && <CompanyList companies={companies} />}
        </StyledTable>
      </TableWrapper>
    </PageWrapper>
  );
};

export default UserAndAccountList;
