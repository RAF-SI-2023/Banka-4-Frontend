import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { makeGetRequest } from '../../utils/apiRequest';
import { Badge, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
`
const ContentWrapper = styled.div`
 padding: 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 20px;
  gap: 20px;
`
const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const DataRowWrapper = styled(RowWrapper)`
  justify-content: space-between;
  width: 100%;

`
const ImgContainer = styled.div`
  height: 100px;
`
const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  align-self: center;
`
const HeadingText = styled.div`
  margin-left: 20px;
  font-size: 32px;
`
const Heading2Text = styled.div`
  font-size: 28px;
`

const DWLWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTextField = styled(TextField)`
  width: 100px;
`
const DotWrapper = styled(Badge)`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid #e2e2e2;
  padding: 0px 10px;
`
interface DotWithTextProps {
  text: string;
  color: "default" | "error" | "primary" | "secondary" | "success" | undefined;
}

const DotWithText = ({ text, color }: DotWithTextProps) => {
  return (
    <DotWrapper>
      <Badge variant="dot" color={color}>
      </Badge>
      <p>{text}</p>
    </DotWrapper>
  );
}

const DataWithLabel = ({ label, data }: { label: string, data: string }) => {
  return (
    <DWLWrapper>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h6">
        {data}
      </Typography>
    </DWLWrapper>
  );
};



const DetaljiAkcije: React.FC = () => {

  const [trenutnaCena, setTrenutnaCena] = useState('$123')
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
      <ContentWrapper>
        <RowWrapper>
          <ImgContainer>
            <StyledImg src={process.env.PUBLIC_URL + '/www.apple.png'} alt="apple" />
          </ImgContainer>
          <HeadingText>Apple Inc.</HeadingText>
          <Heading2Text>AAPL</Heading2Text>
          <DotWithText text="Berza je neaktivna" color="error" />
          {/* <DotWithText text="Berza je aktivna" color="success" /> */}
        </RowWrapper>
        <DataRowWrapper>
          <StyledTextField
            label="trenutnaCena"
            name="trenutnaCena"
            variant="outlined"
            value={trenutnaCena}
            disabled
            size='small'
            margin="dense"
          />
          <StyledTextField
            label="highCena"
            name="highCena"
            variant="outlined"
            value={trenutnaCena}
            disabled
            size='small'
            margin="dense"
          />
          <StyledTextField
            label="lowCena"
            name="lowCena"
            variant="outlined"
            value={trenutnaCena}
            disabled
            size='small'
            margin="dense"
          />
        </DataRowWrapper>
        <RowWrapper>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>1d</Button>
            <Button>5d</Button>
            <Button>1m</Button>
            <Button>6m</Button>
            <Button>1y</Button>
            <Button>ytd</Button>
          </ButtonGroup>
        </RowWrapper>
        <RowWrapper>
          <LineChart
            xAxis={[{ data: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5] }]}
            colors={['#23395b']}
            series={[
              {
                data: [130, 129, 131, 128, 162, 131, 143, 130, 129, 170.5, 128, 131, 132, 130, 131.5, 130, 131, 129, 130, 128.5],
                area: true,
                showMark: false
              },
            ]}
            width={800}
            height={300}
          />
        </RowWrapper>
        <DataRowWrapper>
          <DataWithLabel label="Change" data="$2.53" />
          <DataWithLabel label="Day Range" data="$140.53 - $170.22" />
          <DataWithLabel label="Open" data="$154.53" />
        </DataRowWrapper>
        <DataRowWrapper>
          <DataWithLabel label="Volume" data="51m" />
          <DataWithLabel label="Outstanding shares" data="16b" />
          <DataWithLabel label="Previous Close" data="$162.83" />
        </DataRowWrapper>
        <Button variant="contained" color="primary">
          Opcije
        </Button>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default DetaljiAkcije;
