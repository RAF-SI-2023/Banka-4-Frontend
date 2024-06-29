import { Button, Typography } from "@mui/material";
import { UserStock2 } from "berza/types/types";
import styled from "styled-components";
import OptionsTable from "./OptionsTable";
import OrdersTable from "./OrdersTable";

const PopUpBackground = styled.div`
  display: block;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(51, 65, 85, 0.5);
  z-index: 100;
`;

const PopUpPositioning = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding-top: 0px;
`;

const PopupDiv = styled.div`
  padding: 1.25rem;
  gap: 1.25rem;
  border-radius: 1rem;
  width: 80%;
  min-height: max-content;
  background-color: #ffffff;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 700px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PopupDiv2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

type Props = {
  setPopupOpen: (open: boolean) => void;
  selectedStock: UserStock2;
};

const HartijePopup = ({ setPopupOpen, selectedStock }: Props) => {
  return (
    <PopUpBackground>
      <PopUpPositioning>
        <PopupDiv>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            color="inherit"
            component="div"
          >
            {selectedStock.ticker}
          </Typography>
          <PopupDiv2>
            <OptionsTable {...{ selectedStock }} />
            <OrdersTable {...{ selectedStock }} />
          </PopupDiv2>
          <Button onClick={() => setPopupOpen(false)}>Zatvorite</Button>
        </PopupDiv>
      </PopUpPositioning>
    </PopUpBackground>
  );
};
export default HartijePopup;

