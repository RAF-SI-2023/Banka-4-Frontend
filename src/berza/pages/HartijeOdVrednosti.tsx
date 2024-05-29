import { Tabs, TextField, AppBar, Tab } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeApiRequest, makeGetRequest } from "utils/apiRequest";
import { getMe } from "utils/getMe";
import SearchIcon from "@mui/icons-material/Search";
import { Context } from "App";
import MojeAkcijeList from "berza/components/MojeAkcijeList";
import UserOptions from "berza/components/UserOptionList";
const employee = "employee";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 0px;
`;
const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
`;
const StyledTable = styled.div`
  display: flex;
  max-width: 1200px;
  flex-grow: 1;
  flex-direction: column;
`;

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;
`;
const StyledTextField = styled(TextField)`
  margin-left: auto !important;
  margin-right: 20px !important;
`;

const SearchWrapper = styled.div`
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 10px;
  &:hover {
    color: #cc0000;
    transition: 20ms;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const HartijeOdVrednosti = () => {
  const [userType, setUserType] = useState<string>("user");
  const [userStocks, setUserStocks] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const auth = getMe();
  auth?.permission && setUserType(employee);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocks = await makeGetRequest(`/user-stocks/${auth?.id}`);
        if (stocks) {
          setUserStocks(stocks);
        }
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };
    fetchData();
  });

  const handleChange = (
    event: React.SyntheticEvent<unknown>,
    newValue: number
  ) => {
    if (
      newValue !== 0 &&
      newValue !== 1 &&
      // newValue !== 2 &&
      // newValue !== 3 &&
      event.target instanceof HTMLInputElement
    ) {
      handleChangeFilter(event as React.ChangeEvent<HTMLInputElement>);
      return;
    }
    setSelectedTab(newValue);
  };

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const findStock = async () => {
    await makeApiRequest(
      "/stock",
      "POST",
      { ticker: filter },
      false,
      false,
      ctx
    );
    setFilter("");
    const stocks = await makeGetRequest("/stock/all");
    if (stocks) {
      setStocks(stocks);
    }
  };

  return (
    <PageWrapper>
      <TableContainer>
        <StyledTable>
          <AppBar position="static">
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <Tab label="Akcije" />
              <Tab label="Opcije" />
              <Tab label="Porudžbine" />
              <StyledTextField
                label="Pretraga"
                variant="standard"
                value={filter}
                onChange={handleChangeFilter}
                margin="normal"
                size="small"
                sx={{ marginTop: 0, marginBottom: 1 }}
              />
              <SearchWrapper onClick={findStock}>
                <SearchIcon></SearchIcon>
              </SearchWrapper>
            </StyledTabs>
          </AppBar>
          {selectedTab === 0 && <MojeAkcijeList />}
          {selectedTab === 1 && <UserOptions stocks={stocks} />}
          {/* {selectedTab === 2 && <Porudzbine  />} */}
          {/* userType === employee && {selectedTab === 3 && <TerminskiUgovori />} */}
        </StyledTable>
      </TableContainer>
    </PageWrapper>
  );
};
export default HartijeOdVrednosti;
