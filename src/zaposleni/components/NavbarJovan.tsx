import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMe } from '../../utils/getMe';
import { hasPermission } from 'utils/permissions';
import { EmployeePermissionsV2 } from 'utils/types';  
import { jwtDecode } from 'jwt-decode';

const pages = [
  { name: 'Početna', path: '', permissions: [] },
  { name: 'Korisnici', path: 'listaKorisnika', permissions: [EmployeePermissionsV2.list_users] },
  { name: 'Zaposleni', path: 'listaZaposlenih', permissions: [EmployeePermissionsV2.list_workers] },
  { name: 'Firme', path: 'listaFirmi', permissions: [EmployeePermissionsV2.list_firms] },
  { name: 'Kartice', path: 'kartice', permissions: [EmployeePermissionsV2.list_cards] },
  { name: 'Krediti', path: 'listaKredita', permissions: [EmployeePermissionsV2.list_credits] },
  { name: 'Verifikacija', path: '/verifikacija', permissions: [EmployeePermissionsV2.payment_access] },
  { name: 'Profit', path: '/profit', permissions: [EmployeePermissionsV2.profit_access] },
  { name: 'OTC', path: 'otc', permissions: [] },
];

const checkUserPermissions = (requiredPermissions: EmployeePermissionsV2[]) => {
  const token = localStorage.getItem('si_jwt');
  if (token) {
    const decodedToken = jwtDecode(token) as { permission: number };
    return hasPermission(decodedToken.permission, requiredPermissions);
  }
  return false;
};

const showPorudzbine1 = checkUserPermissions([EmployeePermissionsV2.order_access]);
const showPorudzbine2 = checkUserPermissions([EmployeePermissionsV2.list_orders]);

const checkNoPermissions = () => {
  const token = localStorage.getItem('si_jwt');
  if (token) {
    const decodedToken = jwtDecode(token) as { permission: number };
    return !hasPermission(decodedToken.permission, [EmployeePermissionsV2.list_users]);
  }
  return false;
};

const checkHartijePermissions = () => {
  const token = localStorage.getItem('si_jwt');
  if (token) {
    const decodedToken = jwtDecode(token) as { permission: number };
    return (
      hasPermission(decodedToken.permission, [EmployeePermissionsV2.action_access]) ||
      hasPermission(decodedToken.permission, [EmployeePermissionsV2.option_access]) ||
      hasPermission(decodedToken.permission, [EmployeePermissionsV2.termin_access]) ||
      hasPermission(decodedToken.permission, [EmployeePermissionsV2.order_access])
    );
  }
  return false;
};

const auth = getMe();
const user = auth?.permission === 0 ? true : false;

const ImgContainer = styled.div`
  height: 64px;
  width: 64px;
  min-width: 64px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
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

const StyledLink = styled(Link)`
  color: white;
  font-size: 21px;
  text-decoration: none;
  padding: 6px 10px;
  &:hover {
    background-color: #5B0000;
    padding-bottom: 4px;
    border-bottom: 2px solid white;
  }
`;

const DropdownButton = styled.div`
  color: white;
  font-size: 21px;
  text-decoration: none;
  padding: 6px 10px;
  &:hover {
    background-color: #5B0000;
    padding-bottom: 4px;
    border-bottom: 2px solid white;
  }
`;

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };  

  const handleLogout = () => {
    localStorage.removeItem('si_jwt');
    window.location.reload();
  };

  const handleReset = () => {
    navigate('/resetPassword');
  };

  const jwt = getMe();

  return (
    <AppBar position="static"sx={{ bgcolor: "#990000" }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <ImgContainer>
            <StyledImage
              src={process.env.PUBLIC_URL + "/logo2.jpeg"}
              alt="Logo"
            />
          </ImgContainer>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              PaperProps={{
                sx: {
                  bgcolor: '#808080', 
                },
              }}
            >
              {pages.map((page) =>
                jwt ? (
                  checkUserPermissions(page.permissions) && (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <StyledLink to={page.path}>{page.name}</StyledLink>
                    </MenuItem>
                  )
                ) : null
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
              Комунистичка Банка РАФА
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {jwt
              ? pages
                  .filter((page) => checkUserPermissions(page.permissions))
                  .map((page) => (
                    <StyledLink
                      key={page.name}
                      onClick={handleCloseNavMenu}


                      to={page.path}
                    >
                      {page.name}
                    </StyledLink>
                  ))
              : null}
               {checkNoPermissions() && (
              <StyledLink key={"Plaćanja"} to={"/placanja"}>
                {"Plaćanja"}
              </StyledLink>
              )}
            {checkNoPermissions() && (<StyledLink key={"ATM"} to={"/atm"}>
              {"ATM"}
            </StyledLink>

            )}
            {checkNoPermissions() && (<StyledLink key={"Menjačnica"} to={"/menjacnica"}>
              {"Menjačnica"}
            </StyledLink>

            )}
            { checkNoPermissions() && (
              <StyledLink key={"Verifikacija"} to={"/verifikacija"}>
                {"Verifikacija"}
              </StyledLink>
            )}
            {checkNoPermissions() && (
              <StyledLink key={"Kartice"} to={"/kartice"}>
                {"Kartice"}
              </StyledLink>
            )}
            {checkNoPermissions() && (
              <StyledLink key={"Krediti"} to={"/listaKredita"}>
                {"Krediti"}
              </StyledLink>
            )}
            {(checkNoPermissions() || checkHartijePermissions()) && (
              <StyledLink key={"Hartije"} to={"/hartije"} style={{ margin: ' 0', color: 'white', display: 'block' }}>
                {"Hartije"}
              </StyledLink>
            )}
            <DropdownButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ margin: '  0', color: 'white', display: 'block' }}
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
              {hasPermission(getMe()!.permission, [EmployeePermissionsV2.termin_access]) ? <MenuItem onClick={() => { navigate('/terminski'); setAnchorEl(null) }}>Terminski</MenuItem>: null}
              {showPorudzbine1 && (
              <MenuItem onClick={() => { navigate('/listaPorudzbina'); setAnchorEl(null) }}>Prihvatanje porudzbina</MenuItem>
            )}

            {(showPorudzbine2 || user) && (
               <MenuItem onClick={() => { navigate('/listaPorudzbinaKorisnici'); setAnchorEl(null) }}>Porudzbine</MenuItem>
            )}
            </Menu>


          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile Picture" src={process.env.PUBLIC_URL + '/diktator100.png'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '0px', bgcolor: 'transparent' }} 
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Nalog" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Nalog</Typography>
              </MenuItem>
              <MenuItem key="Resetovanje" onClick={handleReset}>
                <Typography textAlign="center">Resetovanje</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
