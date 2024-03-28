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
      console.log('Učitani kredit iz local storage-a:', parsedKredit);
    }

    const fetchData = async () => {
      try {
        const data = await makeGetRequest(`${BankRoutes.credit_all}/not_approved`)
        setKredit(data?.kredit);
        setTransakcije(data?.transakcije);
      } catch (error) {
        console.error('Greška pri preuzimanju podataka:', error);
      }
    };

    if (parsedKredit) {
      fetchData();
    }
  }, []);

  return (
    <div>
      {kredit && <KreditiTabela kredit={kredit} />}
      {transakcije.length > 0 && <TransakcijeTabela transakcije={transakcije} />}
    </div>
  );
};

export default PojedinacniKreditStranica;
