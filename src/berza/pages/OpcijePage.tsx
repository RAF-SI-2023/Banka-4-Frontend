import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { makeGetRequest } from '../../utils/apiRequest';
import { AppBar, Tab, Tabs, TextField } from '@mui/material';
import CallsList from 'berza/components/CallsList';
import PutsList from 'berza/components/PutsList';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 0px;
`
const StockWrapper = styled.div`
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    border-radius: 20px;
    gap: 10px;
`

const HeadingText = styled.div`
  font-size: 32px;
`
const Heading2Text = styled.div`
  font-size: 28px;
`
const Heading3Text = styled.div`
  font-size: 24px;
  color: green;
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
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


const OpcijePage: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [akcijaId, setAkcijaId] = useState('');
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [puts, setPuts] = useState([])
  const [calls, setCalls] = useState([])

  const handleChange = (event: React.SyntheticEvent<unknown>, newValue: number) => {
    setSelectedTab(newValue);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const allOptions = await makeGetRequest(`/opcija/sve-opcije`);
        // @ts-ignore
        const filteredOptions = allOptions.filter(e => (e.ticker === ticker))
        setAkcijaId(urlParams?.get('id') ?? '')
        setTicker(urlParams?.get('ticker') ?? '')
        setName(urlParams?.get('name') ?? '')
        setPrice(urlParams?.get('price') ?? '')
        // @ts-ignore
        const puts = filteredOptions.filter(e => (e.optionType === "PUT"))
        // @ts-ignore
        const calls = filteredOptions.filter(e => (e.optionType === "CALL"))
        
        if (puts && calls) {
          setPuts(puts)
          setCalls(calls)
        }
      } catch (error) {
      }
    };
    fetchData();

  }, [ticker]);

  return (
    <PageWrapper>
      <StockWrapper>
        <TitleContainer>
          <HeadingText>
            {name}
          </HeadingText>
          <Heading2Text>
            {ticker}
          </Heading2Text>
        </TitleContainer>
        <Heading3Text>
          ${price}
        </Heading3Text>
        <TextField
          name="date"
          label="Datum"
          type="date"
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </StockWrapper>
      <TableContainer>
        {<StyledTable>
          <AppBar position="static" >
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <Tab label="Calls" />
              <Tab label="Puts" />
            </StyledTabs>
          </AppBar>
          {selectedTab === 0 && <CallsList options={calls} />}
          {selectedTab === 1 && <PutsList options={puts} />}
        </StyledTable>}
      </TableContainer>
    </PageWrapper>
  );
};

export default OpcijePage;
