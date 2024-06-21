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
  justify-content: space-between;
  width: 90%;
`;

const MainSectionContainer = styled(Container)`
  flex-grow: 1;
`;

const ExchangeRatesContainer = styled(Container)`
  width: auto;
`;

const ExchangePage = () => {
  const [iznos, setIznos] = useState<string>();
  const [kurs, setKurs] = useState<number>(0);
  const [detaljiTransfera, setDetaljiTransfera] = useState<boolean>(false);
  const [saRacunaBrRacuna, setSaRacunaBrRacuna] = useState<string>();
  const [naRacunBrRacuna, setNaRacunBrRacuna] = useState<string>();
  const [saRacunaValuta, setSaRacunaValuta] = useState<string>();
  const [naRacunValuta, setNaRacunValuta] = useState<string>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    try {
      const user = getMe();
      if (!user) return;
      const data = await makeGetRequest(`/korisnik/id/${user.id}`);
      if (data) {
        setUser(data);
      }
    } catch (error) {}
  };

  return (
    <ContainerStyled>
      {detaljiTransfera ? (
        <MainSectionContainer>
          <TransferDetails
            {...{
              kurs,
              user,
              setDetaljiTransfera,
              iznos,
              saRacunaBrRacuna,
              naRacunBrRacuna,
              naRacunValuta,
              saRacunaValuta,
            }}
          />
        </MainSectionContainer>
      ) : (
        <MainSectionContainer>
          <ExchangeMainSection
            {...{
              setKurs,
              setNaRacunBrRacuna,
              setSaRacunaBrRacuna,
              setDetaljiTransfera,
              setIznos,
              setSaRacunaValuta,
              setNaRacunValuta,
            }}
          />
        </MainSectionContainer>
      )}
      <ExchangeRatesContainer>
        <ExchangeRatesTable />
      </ExchangeRatesContainer>
    </ContainerStyled>
  );
};
export default ExchangePage;
