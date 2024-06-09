import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../utils/getMe";
import { hasPermission } from "utils/permissions";
import { EmployeePermissionsV2 } from "utils/types";
import { jwtDecode } from "jwt-decode";

const StyledAppBar = styled(AppBar)`
  background-color: #23395b !important;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 25px;
  text-decoration: none;
  padding: 6px 10px;
  &:hover {
    background-color: #2c4975ea;
    padding-bottom: 4px; // To avoid jumping when adding border
    border-bottom: 2px solid white;
  }
`;
const NavItems = styled(Box)`
  flex-grow: 1; //was 1
  display: flex;
  margin-left: 20px;
  gap: 10px;
`;
const NavUser = styled(Box)`
  flex-grow: 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImgContainer = styled.div`
  height: 96px;
  width: 96px;
  min-width: 96px;
`;

const DropdownButton = styled.div`
  color: white !important;
  font-size: 25px !important;
  text-decoration: none !important;
  padding: 4px 10px !important;
  font-weight: normal !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif !important;
  &:hover {
    background-color: #2c4975ea;
    padding-bottom: 4px; // To avoid jumping when adding border
    border-bottom: 2px solid white;
  }
`;

interface DecodedToken {
  permission: number;
}

const pages = [
  { name: "Početna", path: "", permissions: [] },
  { name: "Korisnici", path: "listaKorisnika", permissions: [EmployeePermissionsV2.list_users] },
  { name: "Zaposleni", path: "listaZaposlenih", permissions: [EmployeePermissionsV2.list_workers] },
  { name: "Firme", path: "listaFirmi", permissions: [EmployeePermissionsV2.list_firms] },
  { name: "Kartice", path: "kartice", permissions: [EmployeePermissionsV2.list_cards] },
  { name: "Krediti", path: "listaKredita", permissions: [EmployeePermissionsV2.list_credits] },
  { name: "Verifikacija", path: "/verifikacija", permissions: [EmployeePermissionsV2.payment_access] },
  { name: "Hartije od vrednosti", path: "hartije" },
  {name: "OTC", path:"otc", permissions: []},


  //{ name: "Plaćanja", path: "/placanja", permissions: [EmployeePermissionsV2.payment_access] },
  //{ name: "Menjačnica", path: "/menjacnica", permissions: [] },
];

const checkUserPermissions = (requiredPermissions: EmployeePermissionsV2[]) => {
  const token = localStorage.getItem('si_jwt');
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return hasPermission(decodedToken.permission, requiredPermissions);
  }
  return false;
};

const checkNoPermissions = () => {
  const token = localStorage.getItem('si_jwt');
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return !hasPermission(decodedToken.permission, [EmployeePermissionsV2.list_users]);
  }
  return false;
}

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("si_jwt");
    window.location.reload();
  };

  const handleReset = () => {
    navigate("/resetPassword");
  };

  const jwt = getMe();

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <ImgContainer>
            <StyledImage src={process.env.PUBLIC_URL + "/logo2.jpeg"} alt="Logo" />
          </ImgContainer>
          <NavItems>
            {jwt ? pages.filter(page => page.permissions && checkUserPermissions(page.permissions)).map((page) => (
              <StyledLink key={page.name} to={page.path}>
                {page.name}
              </StyledLink>
            )) : null}
            {
              checkNoPermissions() && (<StyledLink key={"Plaćanja"} to={"/placanja"}>
                {"Plaćanja"}
              </StyledLink>

              )}
            {checkNoPermissions() && (<StyledLink key={"Menjačnica"} to={"/menjacnica"}>
              {"Menjačnica"}
            </StyledLink>

            )}
            {
              checkNoPermissions() && (<StyledLink key={"Verifikacija"} to={"/verifikacija"}>
                {"Verifikacija"}
              </StyledLink>
              )}
            {
              checkNoPermissions() && (<StyledLink key={"Kartice"} to={"/kartice"}>
                {"Kartice"}
              </StyledLink>
              )}
            {
              checkNoPermissions() && (<StyledLink key={"Krediti"} to={"/listaKredita"}>
                {"Krediti"}
              </StyledLink>
              )}
            
            <DropdownButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              style={{ textTransform: "none" }}
              onClick={handleClick}
            >
              Berza
            </DropdownButton>
            
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => { navigate('/akcije'); setAnchorEl(null) }}>Akcije</MenuItem>
              <MenuItem onClick={() => { navigate('/terminski'); setAnchorEl(null) }}>Terminski</MenuItem>
            </Menu>
          </NavItems>
          <NavUser>
            <Tooltip
              title="Nalog"
              componentsProps={{ tooltip: { sx: { fontSize: "1.35em" } } }}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Profile Picture"
                  src={process.env.PUBLIC_URL + "/diktator100.png"}
                  sx={{ width: 70, height: 70 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"Nalog"} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{"Nalog"}</Typography>
              </MenuItem>
              <MenuItem key={"Resetovanje"} onClick={handleReset}>
                <Typography textAlign="center">{"Resetovanje"}</Typography>
              </MenuItem>
              <MenuItem key={"Logout"} onClick={handleLogout}>
                <Typography textAlign="center">{"Logout"}</Typography>
              </MenuItem>
            </Menu>
          </NavUser>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Navbar;
