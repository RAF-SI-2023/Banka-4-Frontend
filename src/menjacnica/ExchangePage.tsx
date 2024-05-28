import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import ExchangeRatesTable from "./ExchangeRatesTable";
import TransferDetails from "./TransferDetails";
import ExchangeMainSection from "./ExchangeMainSection";
import { makeGetRequest } from "../utils/apiRequest";
import { getMe } from "../utils/getMe";
import { User } from "../utils/types";
import { Container } from "@mui/material";
import styled from "styled-components";

const ContainerStyled = styled.div`
  display: flex;
`;

const ExchangePage = () => {
  const [iznos, setIznos] = useState<string>();
  const [detaljiTransfera, setDetaljiTransfera] = useState<boolean>(false);
  const [saRacunaBrRacuna, setSaRacunaBrRacuna] = useState<string>();
  const [naRacunBrRacuna, setNaRacunBrRacuna] = useState<string>();
  const [saRacunaValuta, setSaRacunaValuta] = useState<string>();
  const [naRacunValuta, setNaRacunValuta] = useState<string>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = getMe();
      if (!user) return;
      const data = await makeGetRequest(`/korisnik/id/${user.id}`);
      if (data) {
        setUser(data);
      }
    } catch (error) {
    }
  };

  return (
    <ContainerStyled>
      {detaljiTransfera ? (
        <Container>
          <TransferDetails
            user={user}
            setDetaljiTransfera={setDetaljiTransfera}
            iznos={iznos}
            saRacunaBrRacuna={saRacunaBrRacuna}
            naRacunBrRacuna={naRacunBrRacuna}
            saRacunaValuta={saRacunaValuta}
            naRacunValuta={naRacunValuta}
          />
        </Container>
      ) : (
        <Container>
          <ExchangeMainSection
            setNaRacunBrRacuna={setNaRacunBrRacuna}
            setSaRacunaBrRacuna={setSaRacunaBrRacuna}
            setDetaljiTransfera={setDetaljiTransfera}
            setIznos={setIznos}
            setSaRacunaValuta={setSaRacunaValuta}
            setNaRacunValuta={setNaRacunValuta}
          />
        </Container>
      )}
      <Container>
        <ExchangeRatesTable />
      </Container>
    </ContainerStyled>
  );
};
export default ExchangePage;
