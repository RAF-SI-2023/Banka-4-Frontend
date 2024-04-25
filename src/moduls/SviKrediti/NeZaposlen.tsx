import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const DugmePadding = styled(Button)`
  padding: 20px;
  margin: 20px !important;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  position: relative; /*position relative to allow absolute positioning of pseudo elements */
  transition: background-color 0.3s;

  &:hover {
    background-color: #297cb7;
  }

  &:before {
    content: '';
    position: absolute;
    top: -10px; /* up/down */
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent; /* width */
    border-right: 10px solid transparent; /* width */
    border-bottom: 10px solid #3498db; /* Color and size to match the button */
  }
`;


function NeZaposlen() {
    const navigate = useNavigate();

    const handleRequestLoan = () => {

        navigate('/trazenjeKredita');
    };

    return (
            <DugmePadding id="TraziKredit" variant="contained" onClick={handleRequestLoan}>
                <p>Zatraži kredit</p>
            </DugmePadding>
    );
}

export default NeZaposlen;
