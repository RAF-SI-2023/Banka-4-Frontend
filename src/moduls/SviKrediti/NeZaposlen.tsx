import React from 'react';
import { useNavigate } from 'react-router-dom';

function NeZaposlen() {
    const navigate = useNavigate();

    const handleRequestLoan = () => {

        navigate('/trazenjeKredita');
    };

    return (
        <div>
            <div className='learn-more-btn' onClick={handleRequestLoan}>
                <p>Zatraži kredit</p>
            </div>
        </div>
    );
}

export default NeZaposlen;
