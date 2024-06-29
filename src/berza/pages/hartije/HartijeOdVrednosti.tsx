import { Tabs, TextField, AppBar, Tab } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { makeApiRequest, makeGetRequest } from "utils/apiRequest";
import { getMe } from "utils/getMe";
import SearchIcon from "@mui/icons-material/Search";
import { Context } from "App";
import MojeAkcijeList from "berza/components/MojeAkcijeList";
import UserOptions from "berza/components/UserOptionList";
import { hasPermission } from "utils/permissions";
import { Employee, EmployeePermissionsV2, UserRoutes } from "utils/types";
import { jwtDecode } from "jwt-decode";
import SpecificContractListPage from "moduls/TerminskiUgovori/pages/SpecificContractListPage";
import OrdersPageKorisnici from "../ListaPorudzbinaKorisnici";
import ProfitHartijeTable from "profit/ProfitHartijeTable";
const employee = "employee";

interface DecodedToken {
  permission: number;
}

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
  const [firmId, setFirmId] = useState<number>(0);
  const ctx = useContext(Context);
  const auth = getMe();

  useEffect(() => {
    if (auth?.permission) setUserType(employee);

    const fetchFirm = async () => {
      try {
        if (userType === employee) {
          const worker = (await makeGetRequest(
            `${UserRoutes.worker_by_email}/${auth?.sub}`
          )) as Employee;
          if (worker) {
            setFirmId(worker.firmaId);
          }
        }
      } catch (err) {
        console.error("Error fetching employee firm id:", err);
      }
    };

    const fetchData = async () => {
      try {
        if (userType === employee) {
          const stocks = await makeGetRequest(`/user-stocks/-1`);
          if (stocks) {
            setUserStocks(stocks);
          }
        }
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };
    fetchFirm();
    fetchData();
  }, []);

  const checkAkcijePermissions = () => {
    const token = localStorage.getItem("si_jwt");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      return !hasPermission(decodedToken.permission, [
        EmployeePermissionsV2.action_access,
      ]);
    }
    return false;
  };

  const checkTerminskiPermissions = () => {
    const token = localStorage.getItem("si_jwt");
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      return hasPermission(decodedToken.permission, [
        EmployeePermissionsV2.termin_access,
      ]);
    }
    return false;
  };

  const handleChange = (
    event: React.SyntheticEvent<unknown>,
    newValue: number
  ) => {
    if (
      newValue !== 0 &&
      newValue !== 1 &&
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
      <ProfitHartijeTable />
      {/* <TableContainer>
        <StyledTable>
          <AppBar position="static">
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <Tab label="Moje akcije" />
              {userType === employee && <Tab label="Moji terminski ugovori" />}
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
          {checkAkcijePermissions() && selectedTab === 0 && <MojeAkcijeList />}
          {checkTerminskiPermissions() &&
            userType === employee &&
            selectedTab === 3 && <SpecificContractListPage />}
        </StyledTable>
      </TableContainer> */}
    </PageWrapper>
  );
};
export default HartijeOdVrednosti;

