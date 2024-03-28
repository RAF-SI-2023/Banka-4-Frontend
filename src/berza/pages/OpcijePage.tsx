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

    const handleChange = (event: React.SyntheticEvent<unknown>, newValue: number) => {
      setSelectedTab(newValue);
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
            <StockWrapper>
                <TitleContainer>
                    <HeadingText>
                        Apple Inc.
                    </HeadingText>
                    <Heading2Text>
                        AAPL
                    </Heading2Text>
                </TitleContainer>
                <Heading3Text>
                    $123
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
                    <StyledTable>
                        <AppBar position="static" >
                            <StyledTabs value={selectedTab} onChange={handleChange}>
                                <Tab label="Calls" />
                                <Tab label="Puts" />
                            </StyledTabs>
                        </AppBar>
                        {selectedTab === 0 && <CallsList stocks={[]}/>}
                        {selectedTab === 1 && <PutsList stocks={[]}/>}
                    </StyledTable>
            </TableContainer>
        </PageWrapper>
    );
};

export default OpcijePage;
