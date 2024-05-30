import ".//ExchangePage.css";
import { BankRoutes, User } from "../utils/types";
import { NoviPrenosSredstava } from "korisnici/types/Types";
import { makeApiRequest } from "utils/apiRequest";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled(Button)`
  max-width: 100px;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 10px;
`;

const FormWrapper = styled.div`
  background-color: #fafafa;
  padding: 30px;
  border-radius: 18px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: center;
  padding-bottom: 60px;
  max-height: max-content;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledParagraph = styled.p`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 1rem;
  line-height: 1.5rem;
`;

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
        await data.text();
        localStorage.removeItem("prenosPodaci");
      } catch (error) {
      }
    }
    setDetaljiTransfera(false);
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <StyledDiv>
          <Typography>Platilac:</Typography>
          <StyledParagraph>
            {user?.ime} {user?.prezime}, {user?.adresa}
          </StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <Typography>Sa racuna:</Typography>
          <StyledParagraph>{saRacunaBrRacuna}</StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <Typography>Iznos:</Typography>
          <StyledParagraph>
            {iznos} {saRacunaValuta}
          </StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <Typography>Na racun:</Typography>
          <StyledParagraph>{naRacunBrRacuna}</StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <Typography>Iznos:</Typography>
          <StyledParagraph>
            {iznos && (parseInt(iznos, 10) / kurs) * provizija} {naRacunValuta}
          </StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <Typography>Kurs:</Typography>
          <StyledParagraph>{kurs}</StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <Typography>Provizija:</Typography>
          <StyledParagraph>{provizija}</StyledParagraph>
        </StyledDiv>
        <StyledButtonsDiv>
          <StyledButton onClick={() => setDetaljiTransfera(false)}>
            Ponisti
          </StyledButton>
          <StyledButton id="potvrdiButton" onClick={handleSubmit}>
            Potvrdi
          </StyledButton>
        </StyledButtonsDiv>
      </FormWrapper>
    </PageWrapper>
  );
};
export default TransferDetails;
