import styled from 'styled-components';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { makeApiRequest, makeGetRequest } from '../../utils/apiRequest';
import { Badge, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { Context } from 'App';
import { Akcija } from 'berza/types/types';
import { useNavigate } from 'react-router-dom';

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

const convertObjectToArray = (inputObj: any) => {
  const result = [];

  for (const date in inputObj) {
    if (Object.prototype.hasOwnProperty.call(inputObj, date)) {
      const newObj = {
        date: date,
        ...inputObj[date]
      };
      result.push(newObj);
    }
  }

  return result;
}

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

interface StockHistory {
  open: string,
  close: string,
  high: string,
  low: string,
  volume: string
}

const DetaljiAkcije: React.FC = () => {
  const [ticker, setTicker] = useState('');
  const [stock, setStock] = useState<Akcija>();
  const [daily, setDaily] = useState<Array<StockHistory>>();
  const [weekly, setWeekly] = useState<Array<StockHistory>>();
  const [monthly, setMonthly] = useState<Array<StockHistory>>();
  const [dailyData, setDailyData] = useState<Array<{date: any; value: number;}>>();
  const [weeklyData, setWeeklyData] = useState<Array<{date: any; value: number;}>>();
  const [monthlyData, setMonthlyData] = useState<Array<{date: any; value: number;}>>();
  const [graphData, setGraphData] = useState<Array<number>>()
  const [graphDataX, setGraphDataX] = useState<Array<Date>>()

  const ctx = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        setTicker(urlParams?.get('ticker') ?? '')
        if (ticker) {
          const stock = await makeGetRequest(`/stock/${ticker}`, ctx);
          const daily = await makeGetRequest(`/stock/dailyHistory/${ticker}`, ctx);
          const weekly = await makeGetRequest(`/stock/weeklyHistory/${ticker}`, ctx);
          const monthly = await makeGetRequest(`/stock/monthlyHistory/${ticker}`, ctx);

          if (daily) {
            const dailyArray = convertObjectToArray(daily)
            setDaily(dailyArray)
            const averagePricesArray = dailyArray.map(obj => ({
              date: new Date(obj.date),
              value: parseFloat(((parseFloat(obj.low) + parseFloat(obj.high)) / 2).toFixed(4))
            }
            ));
            setDailyData(averagePricesArray)
          }
          if (stock) {
            setStock(stock)
          }
          if (weekly) {
            const weeklyArray = convertObjectToArray(weekly)
            setWeekly(weeklyArray)
            const averagePricesArray = weeklyArray.map(obj => ({
              date: new Date(obj.date),
              value: parseFloat(((parseFloat(obj.low) + parseFloat(obj.high)) / 2).toFixed(4))
            }
            ));
            setWeeklyData(averagePricesArray)

          }
          if (monthly) {
            const monthlyArray = convertObjectToArray(monthly)
            setMonthly(monthlyArray)
            const averagePricesArray = monthlyArray.map(obj => ({
              date: new Date(obj.date),
              value: parseFloat(((parseFloat(obj.low) + parseFloat(obj.high)) / 2).toFixed(4))
            }
            ));
            setMonthlyData(averagePricesArray)
          }
        }
      } catch (error) {
      }
    };
    fetchData();

  }, [ticker]);



  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(oneYearAgo.getFullYear() - 5);


  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  


  const handleChangeGraph = (type: string) =>{
    if(type === "ytd"){
      const datas = monthlyData?.map(obj => (obj.value));
      const dates = monthlyData?.map(obj => (obj.date));
      setGraphData(datas)
      setGraphDataX(dates)
    }
    if(type === "1y"){
      const filteredData = weeklyData?.filter(obj => {
        const date = new Date(obj.date);
        return date >= oneYearAgo;
    });
      const datas = filteredData?.map(obj => (obj.value));
      const dates = filteredData?.map(obj => (obj.date));
      setGraphData(datas)
      setGraphDataX(dates)
    }
    if(type === "5y"){
      const filteredData = weeklyData?.filter(obj => {
        const date = new Date(obj.date);
        return date >= fiveYearsAgo;
    });
      const datas = filteredData?.map(obj => (obj.value));
      const dates = filteredData?.map(obj => (obj.date));
      setGraphData(datas)
      setGraphDataX(dates)
    }
    if (type === "1m") {
      const filteredData = dailyData?.filter(obj => {
        const date = new Date(obj.date);
        return date >= oneMonthAgo;
      });
      const datas = filteredData?.map(obj => obj.value);
      const dates = filteredData?.map(obj => obj.date);
      setGraphData(datas);
      setGraphDataX(dates);
    }
    if (type === "3m") {
      const filteredData = dailyData?.filter(obj => {
        const date = new Date(obj.date);
        return date >= threeMonthsAgo;
      });
      const datas = filteredData?.map(obj => obj.value);
      const dates = filteredData?.map(obj => obj.date);
      setGraphData(datas);
      setGraphDataX(dates);
    }
    if (type === "6m") {
      const filteredData = weeklyData?.filter(obj => {
        const date = new Date(obj.date);
        return date >= sixMonthsAgo;
      });
      const datas = filteredData?.map(obj => obj.value);
      const dates = filteredData?.map(obj => obj.date);
      setGraphData(datas);
      setGraphDataX(dates);
    }
  
  }

  useEffect(() => {
    if(oneYearAgo && dailyData && !graphData){
      handleChangeGraph("1m")
    }
  },[oneYearAgo, dailyData, graphData])

  return (
    <PageWrapper>
      <ContentWrapper>
        <RowWrapper>
          <ImgContainer>
            <StyledImg src={process.env.PUBLIC_URL + '/ussr.svg'} alt="apple" />
          </ImgContainer>
          <HeadingText>{stock?.nameDescription.split(" is ")[0]}</HeadingText>
          <Heading2Text>{ticker}</Heading2Text>
          {/* <DotWithText text="Berza je neaktivna" color="error" /> */}
          {/* <DotWithText text="Berza je aktivna" color="success" /> */}
        </RowWrapper>
        <DataRowWrapper>
          <StyledTextField
            label="trenutnaCena"
            name="trenutnaCena"
            variant="outlined"
            value={stock?.price || ''}
            disabled
            size='small'
            margin="dense"
          />
          <StyledTextField
            label="highCena"
            name="highCena"
            variant="outlined"
            value={stock?.high || ''}
            disabled
            size='small'
            margin="dense"
          />
          <StyledTextField
            label="lowCena"
            name="lowCena"
            variant="outlined"
            value={stock?.low || ''}
            disabled
            size='small'
            margin="dense"
          />
        </DataRowWrapper>
        <RowWrapper>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={() => handleChangeGraph("1m")}>1m</Button>
            <Button onClick={() => handleChangeGraph("3m")}>3m</Button>
            <Button onClick={() => handleChangeGraph("6m")}>6m</Button>
            <Button onClick={() => handleChangeGraph("1y")}>1y</Button>
            <Button onClick={() => handleChangeGraph("5y")}>5y</Button>
            <Button onClick={() => handleChangeGraph("ytd")}>ytd</Button>
          </ButtonGroup>
        </RowWrapper>
        <RowWrapper>
          <LineChart
            xAxis={[{ data: [...graphDataX ?? []], scaleType: 'time', valueFormatter: (date) => date.toDateString() }]}
            colors={['#951414']}
            series={[
              {
                data: [...graphData ?? []],
                area: true,
                showMark: false
              },
            ]}
            width={800}
            height={300}
          />
        </RowWrapper>
        <DataRowWrapper>
          <DataWithLabel label="Change" data={stock?.change ?? ""} />
          <DataWithLabel label="Day Range" data={`$${daily && daily.length > 0 ? daily[0]?.low : ''} - $${daily && daily.length > 0 ? daily[0]?.high : ''}`} />
          <DataWithLabel label="Open" data={daily && daily.length > 0 ? daily[0]?.open : ''} />
        </DataRowWrapper>
        <DataRowWrapper>
          <DataWithLabel label="Volume" data={stock?.volume ?? ""} />
          <DataWithLabel label="Outstanding shares" data={stock?.outstandingShares ?? ""} />
          <DataWithLabel label="Previous Close" data={daily && daily.length > 0 ? daily[0]?.close : ''} />
        </DataRowWrapper>
        <Button onClick={() => { navigate(`/opcije?ticker=${ticker}&name=${stock?.nameDescription.split(" is ")[0]}&price=${stock?.price}`) }} variant="contained" color="primary">
          Opcije
        </Button>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default DetaljiAkcije;
