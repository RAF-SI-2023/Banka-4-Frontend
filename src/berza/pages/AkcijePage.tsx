import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import { AppBar, Tab, Tabs, TextField } from '@mui/material';
import AkcijeList from 'berza/components/AkcijeList';
import MojeAkcijeList from 'berza/components/MojeAkcijeList';
import SearchIcon from '@mui/icons-material/Search';
import { Context } from 'App';

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

const SearchWrapper = styled.div`
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 10px;
  &:hover{
    color: #CC0000;
    transition: 20ms;
    border-radius: 10px;
    cursor: pointer;
  }
`

const AkcijePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filter, setFilter] = useState('');
  const [stocks, setStocks] = useState([]);
  const [userStocks, setUserStocks] = useState([]);
  const ctx = useContext(Context);

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

  const findStock = async () => {

    await makeApiRequest('/stock', 'POST', { 'ticker': filter }, false, false, ctx);
    setFilter('');
    const stocks = await makeGetRequest('/stock/all');
    if (stocks) {
      setStocks(stocks);
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const s = await makeApiRequest('/stock', 'POST', { 'ticker': 'aapl' });
        const stocks = await makeGetRequest('/stock/all');
        if (stocks) {
          setStocks(stocks);
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };
    fetchData();

  }, []);

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
              <SearchWrapper onClick={findStock}>
                <SearchIcon ></SearchIcon>
              </SearchWrapper>
            </StyledTabs>
          </AppBar>
          {selectedTab === 0 && <AkcijeList stocks={stocks} />}
          {selectedTab === 1 && <MojeAkcijeList />}
        </StyledTable>
      </TableContainer>
    </PageWrapper>
  );
};

export default AkcijePage;
