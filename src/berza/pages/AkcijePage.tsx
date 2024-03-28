import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { makeGetRequest } from '../../utils/apiRequest';
import { AppBar, Button, Tab, Tabs, TextField } from '@mui/material';
import AkcijeList from 'berza/components/AkcijeList';
import MojeAkcijeList from 'berza/components/MojeAkcijeList';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 0px;
`
const TableContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
`
const StyledTable = styled.div`
  display: flex;
  max-width: 1200px;
  flex-grow: 1;
  flex-direction: column;
`

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;
`
const StyledTextField = styled(TextField)`
    margin-left: auto!important;
    margin-right: 20px!important;
`

const AkcijePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filter, setFilter] = useState('');

  const handleChange = (event: React.SyntheticEvent<unknown>, newValue: number) => {
    if (newValue !== 0 && newValue !== 1 && event.target instanceof HTMLInputElement) {
      handleChangeFilter(event as React.ChangeEvent<HTMLInputElement>)
      return
    }
    setSelectedTab(newValue);
  };
  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };



  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const users = await makeGetRequest('/korisnik');
  //         setUsrs(users);
  //         const employees = await makeGetRequest('/radnik');
  //         setEmployees(employees)
  //         const companies = await makeGetRequest('/racuni/izlistajSveFirme');
  //         setCompanies(companies)
  //       } catch (error) {
  //         console.error('Error fetching user list:', error);
  //       }
  //     };
  //     fetchData();
  // 
  //   }, []);

  return (
    <PageWrapper>
      <TableContainer>
        <StyledTable>
          <AppBar position="static" >
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <Tab label="Akcije" />
              <Tab label="Moje Akcije" />
              <StyledTextField
                label="Pretraga"
                variant="standard"
                value={filter}
                onChange={handleChangeFilter}
                margin="normal"
                size='small'
                sx={{ marginTop: 0, marginBottom: 1 }}
              />
            </StyledTabs>
          </AppBar>
          {selectedTab === 0 && <AkcijeList stocks={[]} />}
          {selectedTab === 1 && <MojeAkcijeList stocks={[]} />}
        </StyledTable>
      </TableContainer>
    </PageWrapper>
  );
};

export default AkcijePage;
