import React from 'react';
import { Tab } from '@mui/material'; // Import Tab component from Material-UI
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DugmePadding = styled(Tab)`
  && {
    background-color: #AC190C !important;
    color: white !important;
    border-radius: 13px !important;
  
    &:hover {
      background-color: #EF2C1A !important;
    }
  }
`;

function NeZaposlen() {
    const navigate = useNavigate();

    const handleRequestLoan = () => {
        navigate('/trazenjeKredita');
    };

    return (
        <DugmePadding
            id="TraziKredit"
            onClick={handleRequestLoan}
            label="Zatraži kredit"
        />
    );
}

export default NeZaposlen;
