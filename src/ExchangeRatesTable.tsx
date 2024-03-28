import { useEffect, useState } from "react";
import { makeGetRequest } from "./utils/apiRequest";
import { ExchangeRate } from "utils/types";

const ExchangeRatesTable = () => {
  const [exchages, setExhanges] = useState<ExchangeRate[]>([]);

  const fetchExchange = async () => {
    try {
      const data = await makeGetRequest(`/api/exchange`);
      if (data) {
        setExhanges(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExchange();
  }, []);

  return (
    <div>
      <p>Kursna lista</p>
      <table>
        <thead>
          <tr>
            <th>Valuta</th>
            <th>Kurs</th>
          </tr>
        </thead>
        <tbody>
          {exchages.map((exchange1, index1) =>
            exchages.slice(index1 + 1).map((exchange2, index2) => (
              <tr key={`${exchange1.currencyCode}-${exchange2.currencyCode}`}>
                <td>
                  {exchange1.currencyCode}-{exchange2.currencyCode}
                </td>
                <td>{exchange2.rate / exchange1.rate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ExchangeRatesTable;
