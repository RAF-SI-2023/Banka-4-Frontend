import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import Ponude from 'berza/components/otcComponents/Ponude';
import MojePonude from 'berza/components/otcComponents/MojePonude';
import PrihvatanjePonuda from 'berza/components/otcComponents/PrihvatanjePonuda';
import { EmployeePermissionsV2 } from 'utils/types';
import { jwtDecode } from 'jwt-decode';
import { hasPermission } from 'utils/permissions';
import ObradjenePonude from 'berza/components/otcComponents/ObradjenePonude';

const checkUserPermissions = (requiredPermissions: EmployeePermissionsV2[]) => {
  const token = localStorage.getItem('si_jwt');
  if (token) {
    const decodedToken = jwtDecode(token) as { permission: number };
    return hasPermission(decodedToken.permission, requiredPermissions);
  }
  return false;
};

const odobrenje = checkUserPermissions([EmployeePermissionsV2.list_orders]);

const ButtonTab = styled(Button)`
  background-color: #AC190C!important;
  color: white!important;
border-color: #EF2C1A!important;
  &:hover{
    background-color: #EF2C1A!important;
  }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Navbar = styled(ButtonGroup)`
  margin-top: 20px;
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

const OtcPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(<Ponude />);

  const handleButtonClick = (component: React.ReactNode) => {
    setSelectedComponent(component);
  };

  return (
    <PageWrapper>
      <Navbar variant="contained">
        <ButtonTab id="ponude" onClick={() => handleButtonClick(<Ponude />)}>Ponude</ButtonTab>
        <ButtonTab id="mojeponude" onClick={() => handleButtonClick(<MojePonude />)}>Moje Ponude</ButtonTab>
        <ButtonTab id="obradjeneponude" onClick={() => handleButtonClick(<ObradjenePonude />)}>Obradjene Ponude</ButtonTab>
        {odobrenje && (<ButtonTab id="bankaponude" onClick={() => handleButtonClick(<PrihvatanjePonuda />)}>BANKA Ponude</ButtonTab>)}
      </Navbar>
      <TableContainer>
        {selectedComponent}
      </TableContainer>
    </PageWrapper>
  );
};

export default OtcPage;

