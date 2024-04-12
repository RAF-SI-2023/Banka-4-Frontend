import styled from 'styled-components';

export enum Palette {
    WarningRed = '#D32F2F',
    ButtonBlue = '#1976D2',
    SecondaryBlue = '#3d88d3',
    ApprovalGreen = '#388E3C',
    LightGreen = '#81C784',
    AuxiliaryBeige = '#FFF8E1'
  }
  

export const PointyButton = styled.button`
    background-color: ${Palette.ButtonBlue};
    color: white;
    padding: 10px 20px;
    font-size: 17px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    position: relative; // Needed for positioning pseudo-elements
    transition: background-color 0.3s;

  &:hover {
    background-color: darken(${Palette.ButtonBlue}, 10%);
  }

  &::before {
    content: '';
    position: absolute;
    top: -9px; // Adjusts position of pointy bit
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${Palette.ButtonBlue};
  }

  &:disabled {
    background-color: grey;
    &::before {
      border-bottom: 10px solid grey; // Grey color for the pointy bit when disabled
    }
  }
`