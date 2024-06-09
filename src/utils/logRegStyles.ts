import { Container } from "@mui/material";
import styled from "styled-components";

export const StyledContainerLogReg = styled(Container) <{ component: string }>`
display: flex !important;
flex-direction: column !important;
align-items: center !important;
justify-content: center !important;
height: 800px !important;
background-color: #f9e7e7 !important; 
border: 1px solid #dedede !important;
border-radius: 8px !important;
box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15) !important;
margin-top: 80px !important;
padding: 20px !important;
width: 560px!important;
`