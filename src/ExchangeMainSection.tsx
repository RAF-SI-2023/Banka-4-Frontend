import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import { getMe } from "./utils/getMe";
import { makeGetRequest } from "./utils/apiRequest";
import { Account, ExchangeRate } from "utils/types";

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  setIznos: (iznos: string) => void;
  setSaRacuna: (saRacuna: Account) => void;
  setNaRacun: (naRacun: Account) => void;
};

const ExchangeMainSection = ({
  setDetaljiTransfera,
  setIznos,
  setSaRacuna,
  setNaRacun,
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
      const data = await makeGetRequest(`/api/exchange`);
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
        `/racuni/nadjiRacuneKorisnika/${user.id}`
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
    <article>
      <form
        className="main-section-div"
        onSubmit={(e) => {
          e.preventDefault();
          setDetaljiTransfera(true);
        }}
      >
        <section className="iznos-div">
          <label>Iznos:</label>
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
        </section>
        <section className="sa-racuna-div">
          <label>Sa racuna: </label>
          <select className="custom-select" defaultValue={"Broj racuna..."}>
            <option defaultValue={"Broj racuna..."}>Broj racuna...</option>
            {accounts.map((account) => (
              <option
                value={account.brojRacuna}
                onChange={() => {
                  setSaRacuna(account);
                  setSaRacuna2(account);
                }}
              >
                {account.brojRacuna}, {account.currency}
              </option>
            ))}
          </select>
        </section>
        <section className="na-racun-div">
          <label>Na racun: </label>
          <select className="custom-select">
            <option defaultValue={"Broj racuna..."}>Broj racuna...</option>
            {accounts.map((account) => (
              <option
                value={account.brojRacuna}
                onChange={() => {
                  setNaRacun(account);
                  setNaRacun2(account);
                }}
              >
                {account.brojRacuna}, {account.currency}
              </option>
            ))}
          </select>
        </section>
        <section className="kurs-div">
          <label>
            Trenutni kurs izmedju: {saRacuna2?.currency} i {naRacun2?.currency}:{" "}
            {findExchangeRate(saRacuna2?.currency, naRacun2?.currency)}
          </label>
        </section>
        <section className="buttons">
          <button className="button">Odustani</button>
          <button type="submit" className="button">
            Nastavi
          </button>
        </section>
      </form>
    </article>
  );
};
export default ExchangeMainSection;
