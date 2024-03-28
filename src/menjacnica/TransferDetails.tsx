import ".//ExchangePage.css";
import { BankRoutes, User } from "../utils/types";
import { NoviPrenosSredstava } from "korisnici/types/Types";
import { makeApiRequest } from "utils/apiRequest";

const provizija = 0.005;
const kurs = 117.6926;

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  iznos: string | undefined;
  saRacunaBrRacuna: string | undefined;
  naRacunBrRacuna: string | undefined;
  user: User | undefined;
  saRacunaValuta: string | undefined;
  naRacunValuta:  string | undefined;
};

const TransferDetails = ({
  setDetaljiTransfera,
  iznos,
  saRacunaBrRacuna,
  naRacunBrRacuna,
  user,
  saRacunaValuta,
  naRacunValuta
}: Props) => {
  console.log("saRacunaBrRacuna:", saRacunaBrRacuna)
    console.log("naRacunBrRacuna:", naRacunBrRacuna)
    console.log("saRacunaValuta:", saRacunaValuta)
    console.log("naRacunValuta:", naRacunValuta)
    console.log("iznos:", iznos)


  const handleSubmit = async () => {

    if(iznos && saRacunaBrRacuna && naRacunBrRacuna) {

      const noviPrenos: NoviPrenosSredstava = {
        racunPosiljaoca: saRacunaBrRacuna,
        racunPrimaoca: naRacunBrRacuna,
        iznos: parseInt(iznos, 10)
      }

      try{
        const data = await makeApiRequest(BankRoutes.transaction_new_transfer, "POST", noviPrenos, false, true)
            const rac = await data.text()
            console.log(rac);
            localStorage.removeItem("prenosPodaci")
      } catch (error) {
        console.log(error)
      }

    }
  }

  return (
    <div className="main-section-details-div">
      <div className="details-section">
        <p>Platilac:</p>
        <p className="platilac">
          {user?.ime} {user?.prezime}, {user?.adresa}
        </p>
      </div>
      <div className="details-section">
        <p>Sa racuna:</p>
        <p>{saRacunaBrRacuna}</p>
      </div>
      <div className="details-section">
        <p>Iznos:</p>
        <p>
          {iznos} {saRacunaValuta}
        </p>
      </div>
      <div className="details-section">
        <p>Na racun:</p>
        <p>{naRacunBrRacuna}</p>
      </div>
      <div className="details-section">
        <p>Iznos:</p>
        <p>
          {iznos && parseInt(iznos, 10) / kurs * provizija} {naRacunValuta}
        </p>
      </div>
      <div className="details-section">
        <p>Kurs:</p>
        <p>{kurs}</p>
      </div>
      <div className="details-section">
        <p>Provizija:</p>
        <p>{provizija}</p>
      </div>
      <div className="buttons">
        <button className="button" onClick={() => setDetaljiTransfera(false)}>
          Ponisti
        </button>
        <button className="button" onClick={handleSubmit}>Potvrdi</button>
      </div>
    </div>
  );
};
export default TransferDetails;
