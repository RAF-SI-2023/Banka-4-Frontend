import React, { useState, useEffect } from 'react';
import KreditiTabela from './KreditiTabela';
import TransakcijeTabela from './TransakcijeTabela';
import { BankRoutes, KreditPojedinacni, Transakcija } from '../../utils/types';
import { makeGetRequest } from 'utils/apiRequest';

const PojedinacniKreditStranica = () => {
  const [kredit, setKredit] = useState<KreditPojedinacni | null>(null);
  const [transakcije, setTransakcije] = useState<Transakcija[]>([]);

  useEffect(() => {
    const storedKredit = localStorage.getItem('selectedKredit');
    let parsedKredit = {
      id: ''
    };

    if (storedKredit) {
      parsedKredit = JSON.parse(storedKredit);
    }

    const fetchData = async () => {
      try {
        const data = await makeGetRequest(`${BankRoutes.credit_detailed}/`+parsedKredit.id);
        setKredit(data);
        setTransakcije(data?.transakcije);
        
      } catch (error) {
      }
    };

    if (parsedKredit) {
      fetchData();
    }
  }, []);

  return (
    <div>
       {kredit && <KreditiTabela kredit={kredit} />}
     
    </div>
  );
};

export default PojedinacniKreditStranica;
