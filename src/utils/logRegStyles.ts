import { Container } from "@mui/material";
import styled from "styled-components";

export const StyledContainerLogReg = styled(Container) <{ component: string }>`
display: flex !important;
flex-direction: column !important;
align-items: center !important;
justify-content: center !important;
height: 100vh !important;
background-color: #f9e7e7 !important; 
border: 1px solid #dedede !important;
border-radius: 8px !important;
box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15) !important;
margin-top: -8vh !important;
padding: 20px !important;
`;