import { Alert, AlertColor } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledAlert = styled(Alert)`
  animation: ${fadeIn} 0.6s ease;
  border-radius: 6px!important;
  cursor: pointer;
`;

type AlertProps = {
  severity: AlertColor;
  exit: (value: React.SetStateAction<any>) => void;
  children: ReactNode;
}

const KAlert: React.FC<AlertProps> = ({ severity, exit, children }) => {
  return (
    <StyledAlert onClick={exit} severity={severity}>{children}</StyledAlert>
  );
}

export default KAlert;