import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import { getMe } from "../utils/getMe";
import { makeGetRequest } from "../utils/apiRequest";
import { Account, BankRoutes, ExchangeRate } from "utils/types";

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  setIznos: (iznos: string) => void;
  setSaRacunaBrRacuna: (saRacunaBrRacuna: string) => void;
  setNaRacunBrRacuna: (naRacunBrRacuna: string) => void;
  setSaRacunaValuta: (saRacunaValuta: string) => void;
  setNaRacunValuta: (naRacunValuta: string) => void;
};

const ExchangeMainSection = ({
  setDetaljiTransfera,
  setIznos,
  setSaRacunaBrRacuna,
  setNaRacunBrRacuna,
  setSaRacunaValuta,
  setNaRacunValuta
}: Props) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [iznosError, setIznosError] = useState<boolean>(false);
  const [saRacuna2, setSaRacuna2] = useState<Account>();
  const [naRacun2, setNaRacun2] = useState<Account>();
  const [exchages, setExhanges] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    fetchAccounts();
    fetchExchange();
  }, []);

  const fetchExchange = async () => {
    try {
      const data = await makeGetRequest(`/exchange`);
      if (data) {
        setExhanges(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const user = getMe();
      if (!user) return;
      const data = await makeGetRequest(
        `${BankRoutes.account_find_user_account}/${user.id}`
      );
      if (data) {
        setAccounts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findExchangeRate = (
    currency1: string | undefined,
    currency2: string | undefined
  ) => {
    
    if (!currency1 || !currency2) return null;
    if(currency1 === "Srpski dinar") currency1 = "RSD"
    if(currency2 === "Srpski dinar") currency1 = "RSD"

    const rate1 = exchages.find(
      (exchage) => exchage.currencyCode === currency1
    )?.rate;

    const rate2 = exchages.find(
      (exchage) => exchage.currencyCode === currency2
    )?.rate;

    if (rate1 && rate2) {
      return rate1 / rate2;
    } else {
      return null;
    }
  };

  return (
    <div>
      <form
        className="main-section-div"
        onSubmit={(e) => {
          e.preventDefault();
          setDetaljiTransfera(true);
        }}
      >
        <div className="iznos-div">
          <p>Iznos:</p>
          <textarea
            rows={1}
            name={"iznos"}
            className="textarea"
            placeholder={"Upisite iznos..."}
            required={true}
            onChange={(e) => {
              setIznos(e.target.value);
              setIznosError(false);
            }}
          />
          {iznosError && <p className="error-text">Iznos je obavezan.</p>}
        </div>
        <div className="sa-racuna-div">
          <p>Sa racuna: </p>
          <select className="custom-select" defaultValue={"Broj racuna..."} onChange={(e) => {
            const selectedAccount = accounts.find(account => account.brojRacuna === e.target.value);
            if (selectedAccount) {
              setSaRacunaBrRacuna(selectedAccount.brojRacuna);
              setSaRacunaValuta(selectedAccount.currency);
              setSaRacuna2(selectedAccount);
            }
          }}
          >
            <option disabled value={"Broj racuna..."}  key="default">Broj racuna...</option>
            {accounts.map((account) => (
              <option
                key={account.brojRacuna}
                value={account.brojRacuna}
              >
                {account.brojRacuna}, {account.currency}
              </option>
            ))}
          </select>
        </div>
        <div className="na-racun-div">
          <p>Na racun: </p>
          <select className="custom-select" defaultValue={"Broj racuna..."} onChange={(e) => {
            const selectedAccount = accounts.find(account => account.brojRacuna === e.target.value);
            if (selectedAccount) {
              setNaRacunBrRacuna(selectedAccount.brojRacuna);
              setNaRacunValuta(selectedAccount.currency);
              setNaRacun2(selectedAccount);
            }
          }}> 
            <option disabled value={"Broj racuna..."} key="default">Broj racuna...</option>
            {accounts.map((account) => (
              <option
                key={account.brojRacuna}
                value={account.brojRacuna}
              >
                {account.brojRacuna}, {account.currency}
              </option>
            ))}
          </select>
        </div>
        <div className="kurs-div">
            Trenutni kurs izmedju 
            {saRacuna2 ?  <b className="selektovan_racun">{saRacuna2.currency}</b> : <p className="selektuj_racun">Izaberite racun</p>} 
            i 
            {naRacun2? <b className="selektovan_racun">{naRacun2.currency}</b> : <p className="selektuj_racun">Izaberite racun</p>}:{" "}
            {findExchangeRate(saRacuna2?.currency, naRacun2?.currency)}
        </div>
        <div className="buttons">
          <button className="button">Odustani</button>
          <button type="submit" className="button">
            Nastavi
          </button>
        </div>
      </form>
    </div>
  );
};
export default ExchangeMainSection;
