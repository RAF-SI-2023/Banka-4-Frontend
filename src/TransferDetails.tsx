import ".//ExchangePage.css";

import { User } from "./utils/types";

const provizija = 0.005;
const kurs = 117.6926;

type Props = {
  setDetaljiTransfera: (detaljiTransfera: boolean) => void;
  iznos: string | undefined;

  user: User | undefined;
};

const TransferDetails = ({
  setDetaljiTransfera,
  iznos,
 
  user,
}: Props) => {
 
};
export default TransferDetails;
