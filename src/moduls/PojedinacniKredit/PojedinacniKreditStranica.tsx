import { useState, useEffect } from 'react';
import KreditiTabela from './KreditiTabela';
import { BankRoutes, KreditPojedinacni, Transakcija } from '../../utils/types';
import { makeGetRequest } from 'utils/apiRequest';

const PojedinacniKreditStranica = () => {
  const [kredit, setKredit] = useState<KreditPojedinacni | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const data = await makeGetRequest(`${BankRoutes.credit_detailed}/` + parsedKredit.id);
        setKredit(data);
        setTransakcije(data?.transakcije);

      } catch (error) {
      }
    };

    if (parsedKredit) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {kredit && <KreditiTabela kredit={kredit} />}

    </div>
  );
};

export default PojedinacniKreditStranica;
