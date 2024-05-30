import styled from 'styled-components';
import UserOptions from 'berza/components/UserOptionList';

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

const UserOpcijePage: React.FC = () => {
  // const [date, setDate] = useState(new Date().toISOString().split('T')[0]);



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
    </StockWrapper>
    <TableContainer>
      <UserOptions stocks={[]}></UserOptions>
    </TableContainer>
  </PageWrapper>
);
};

export default UserOpcijePage;
