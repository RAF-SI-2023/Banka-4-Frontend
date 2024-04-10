import ".//ExchangePage.css";
import { BankRoutes, User } from "../utils/types";
import { NoviPrenosSredstava } from "korisnici/types/Types";
import { makeApiRequest } from "utils/apiRequest";
import { Box, Button, Container, Typography } from "@mui/material";

const provizija = 0.005;
const kurs = 117.6926;

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  iznos: string | undefined;
  saRacunaBrRacuna: string | undefined;
  naRacunBrRacuna: string | undefined;
  user: User | undefined;
  saRacunaValuta: string | undefined;
  naRacunValuta: string | undefined;
};

const TransferDetails = ({
  setDetaljiTransfera,
  iznos,
  saRacunaBrRacuna,
  naRacunBrRacuna,
  user,
  saRacunaValuta,
  naRacunValuta,
}: Props) => {
  const handleSubmit = async () => {
    if (iznos && saRacunaBrRacuna && naRacunBrRacuna) {
      const noviPrenos: NoviPrenosSredstava = {
        racunPosiljaoca: saRacunaBrRacuna,
        racunPrimaoca: naRacunBrRacuna,
        iznos: parseInt(iznos, 10),
      };

      try {
        const data = await makeApiRequest(
          BankRoutes.transaction_new_transfer,
          "POST",
          noviPrenos,
          false,
          true
        );
        const rac = await data.text();
        console.log(rac);
        localStorage.removeItem("prenosPodaci");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Box>
        <Typography>Platilac:</Typography>
        <Typography>
          {user?.ime} {user?.prezime}, {user?.adresa}
        </Typography>
      </Box>
      <Box>
        <Typography>Sa racuna:</Typography>
        <Typography>{saRacunaBrRacuna}</Typography>
      </Box>
      <Box>
        <Typography>Iznos:</Typography>
        <Typography>
          {iznos} {saRacunaValuta}
        </Typography>
      </Box>
      <Box>
        <Typography>Na racun:</Typography>
        <Typography>{naRacunBrRacuna}</Typography>
      </Box>
      <Box>
        <Typography>Iznos:</Typography>
        <Typography>
          {iznos && (parseInt(iznos, 10) / kurs) * provizija} {naRacunValuta}
        </Typography>
      </Box>
      <Box>
        <Typography>Kurs:</Typography>
        <Typography>{kurs}</Typography>
      </Box>
      <Box>
        <Typography>Provizija:</Typography>
        <Typography>{provizija}</Typography>
      </Box>
      <Box>
        <Button onClick={() => setDetaljiTransfera(false)}>Ponisti</Button>
        <Button onClick={handleSubmit}>Potvrdi</Button>
      </Box>
    </Container>
  );
};
export default TransferDetails;
