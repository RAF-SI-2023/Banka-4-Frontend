import { useEffect, useState } from "react";
import ".//ExchangePage.css";
import ExchangeRatesTable from "./ExchangeRatesTable";
import TransferDetails from "./TransferDetails";
import ExchangeMainSection from "./ExchangeMainSection";

import { makeGetRequest } from "./utils/apiRequest";
import { getMe } from "./utils/getMe";
import { User } from "./utils/types";

const ExchangePage = () => {
  const [iznos, setIznos] = useState<string>();
  const [detaljiTransfera, setDetaljiTransfera] = useState<boolean>(false);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = getMe();
      if (!user) return;
      const data = await makeGetRequest(`/korisnik/email/${user.sub}`);
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 
};
export default ExchangePage;
