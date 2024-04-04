import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getMe } from '../../utils/getMe';

const StyledAppBar = styled(AppBar)`
    background-color: var(--button-blue)!important;

    @media (max-width: 768px) {
        padding: 0 10px;
    }
`

const StyledLink = styled(Link)`
    color: white;
    font-size:1.618rem;
    text-decoration: none;
    padding: 6px 10px;
    &:hover{
        background-color: var(--secondary-blue);
        padding-bottom: 4px; // To avoid jumping when adding border
        border-bottom: 2px solid white;
    }
`
const NavItems = styled(Box)`
    display: flex;
    flex-grow: 1;
    margin-left: 20px;
    gap: 10px;

    @media (max-width: 768px) { /*trying to be repsponsive*/
        margin-left: 0;
        justify-content: space-between;
    }
`
const NavLogo = styled.div`
  display: flex;
  align-items: center;
  height: 100%; 
  padding: 10px 0;

  
  img {
    max-height: calc(100% - 20px);
    width: auto;
  }
`


const NavUser = styled(Box)`
    @media (max-width: 768px) {
        flex-grow: 0;
    }
`

const pages = [{ name: 'Liste', path: 'listaKorisnika' },
{ name: 'Kreiraj zaposlenog', path: 'kreirajZaposlenog' },
{ name: 'Kreiraj firmu', path: 'kreirajFirmu' },
{ name: 'Kartice', path: '/kartice' },
{ name: 'Lista kredita', path: '/listaKredita' }
];

const pagesUser = [
    { name: 'Početna', path: '' },
    { name: 'Plaćanja', path: '/placanja' },
    { name: 'Verifikacija', path: '/verifikacija' },
    { name: 'Kartice', path: '/kartice' },
    { name: 'Lista kredita', path: '/listaKredita' }
];


const auth = getMe()
const user = auth?.permission === 0 ? true : false;
function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('si_jwt');
        window.location.reload();
    }
    const handleReset = () => {
        navigate('/resetPassword')
    };
    return (
        <StyledAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <NavLogo>
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
                    </NavLogo>
                    <NavItems>
                        {user && pagesUser?.map((page) => (
                            <StyledLink key={page.name} to={page.path}>{page.name}</StyledLink>
                        ))}
                        {!user && pages?.map((page) => (
                            <StyledLink key={page.name} to={page.path}>{page.name}</StyledLink>
                        ))}
                    </NavItems>

                    <NavUser>
                        <Tooltip title="Nalog" componentsProps={{ tooltip: { sx: { fontSize: '1.618em' } } }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile Picture" src={process.env.PUBLIC_URL + '/diktator100.png'} sx={{ width: 70, height: 70 }} /> {/* Increased Avatar size */}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
                            <MenuItem key={'Nalog'} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{'Nalog'}</Typography>
                            </MenuItem>
                            <MenuItem key={'Resetovanje'} onClick={handleReset}>
                                <Typography textAlign="center">{'Resetovanje'}</Typography>
                            </MenuItem>
                            <MenuItem key={'Logout'} onClick={handleLogout}>
                                <Typography textAlign="center">{'Logout'}</Typography>
                            </MenuItem>
                        </Menu>
                    </NavUser>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Navbar;
