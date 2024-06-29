import './App.css';
import UserListPage from './zaposleni/pages/userListPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserInfoTable from './zaposleni/pages/userPage';
import Navbar from './zaposleni/components/NavbarJovan';
import CreateUserPage from './zaposleni/pages/createUserPage';
import EditUserPage from './zaposleni/pages/editUserPage';
import CreateAccountPage from './zaposleni/pages/createAccountPage';
import AccountInfoPage from './zaposleni/pages/accountPage';
import CreateEmployeePage from './zaposleni/pages/createEmployeePage';
import EditEmployeePage from './zaposleni/pages/editEmployeePage';
import CreateCompanyPage from './zaposleni/pages/createCompanyPage';
import EditCompanyPage from './zaposleni/pages/editCompanyPage';
import LoginPage from './moduls/LogReg/LoginPage';
import OrdersPage from 'berza/pages/ListaPorudzbina';
import OrdersPageKorisnici from 'berza/pages/ListaPorudzbinaKorisnici';
import NewOrder from 'berza/pages/NewOrder';
import RegistrationPage from './moduls/LogReg/RegistrationPage';
import { getMe } from './utils/getMe';
import Placanje from './korisnici/pages/PlacanjePage';
import UserHomePage from 'korisnici/pages/UserHomePage';
import ResetPasswordPage from 'korisnici/pages/ResetPasswordPage';
import Verifikacija from 'korisnici/pages/StranicaZaVerifikacijuPlacanja';
import StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike from 'korisnici/pages/StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike';
import PregledKartica from 'moduls/Kartice/PregledKartica';
import DodajKarticu from 'moduls/Kartice/DodajKarticu';
import DetaljiKartice from 'moduls/Kartice/DetaljiKartice';
import ListaKredita from 'moduls/SviKrediti/listaKredita';
import TraziKreditStranica from 'moduls/TrazenjeKredita/TraziKreditOdBanke';
import PojedinacniKreditStranica from 'moduls/PojedinacniKredit/PojedinacniKreditStranica';
import OpcijePage from 'berza/pages/OpcijePage';
import UserOpcijePage from 'berza/pages/UserOptionsPage';
import Transaction from 'zaposleni/pages/TransactionPage';
import AkcijePage from 'berza/pages/AkcijePage';
import DetaljiAkcije from 'berza/pages/DetaljiAkcijePage';
import ExchangePage from 'menjacnica/ExchangePage';
import styled, { keyframes } from 'styled-components';
import { Box, Button, Dialog, Typography } from '@mui/material';
import CompanyListPage from 'zaposleni/pages/companyListPage';
import EmployeeListPage from 'zaposleni/pages/employeeListPage';
import NotFoundPage from 'moduls/DodatneStranice/NotFoundPage';
import TerminskiUgovoriPage from 'moduls/TerminskiUgovori/pages/TerminskiUgovoriPage';
import AgriculturePage from 'moduls/TerminskiUgovori/pages/ContractsPage';
import SpecificContractListPage from 'moduls/TerminskiUgovori/pages/SpecificContractListPage';
// import WSTest from 'WSTest';
import { Dispatch, SetStateAction, createContext, useEffect, useState, } from "react";
import CompanyInfoTable from "zaposleni/pages/companyPage";
import HartijeOdVrednosti from "berza/pages/hartije/HartijeOdVrednosti";
import ProfitPage from "profit/ProfitPage";
import ATMPage from 'korisnici/pages/ATMPage';
import OtcPage from 'berza/pages/OtcPage';
import OtcPageKorisnik from 'berza/pages/OtcPageKorisnik';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const AlertWrapperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: absolute;
  top: 100px;
  right: 20px;
`;
const AlertWrapper = styled.div`
  animation: ${fadeIn} 0.3s ease;
  min-width: 300px;
  padding-top: 10px;
  padding-bottom: 18px;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 50px;
  background-color: #cc0000; // soviet red tho
  color: #ffd700;
  font-weight: bold;
  border-radius: 10px;
`;
const SvgImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImgContainer = styled.div`
  height: 30px;
  width: 30px;
  padding-bottom: 10px;
`;

window.addEventListener("beforeunload", () => {
  localStorage.setItem("tokenRemovalTimestamp", Date.now().toString());
});

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface ContextType {
  errors: Array<string>;
  setErrors: Dispatch<SetStateAction<Array<string>>>;
}

export const Context = createContext<ContextType | null>(null);
const auth = getMe();
function App() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const [errors, setErrors] = useState([""]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrors([]);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [errors]);

  return (
    <>
      {/* RIP JWT STOP */}
      {!auth?.id && (
        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <VideoWrapper>
              <video autoPlay muted height="300" controls>
                <source

                  src="https://imgur.com/sqCNZHS.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </VideoWrapper>
            <Typography
              variant="body2"
              sx={{ mt: 2, marginLeft: "auto", marginRight: "auto" }}
            >
              JWT STOP
            </Typography>
            <Button id="exitPosionPill" onClick={handleClose} sx={{ color: 'red', textDecoration: 'none', '&:hover': { backgroundColor: '#FFDDDD', } }}>
              Exit
            </Button>
          </Box>
        </Dialog>
      )}
      {/* <WSTest></WSTest> */}

      <Context.Provider value={{ errors, setErrors }}>
        <AlertWrapperWrapper>
          {errors.length > 0 &&
            errors[0] !== "" &&
            errors?.map((err: string) => (
              <AlertWrapper key={err}>
                <ImgContainer>
                  <SvgImage
                    src={process.env.PUBLIC_URL + "/ussr.svg"}
                    alt="ussr"
                  />
                </ImgContainer>
                {err}
              </AlertWrapper>
            ))}
        </AlertWrapperWrapper>
        <BrowserRouter>
          {auth?.id && <Navbar></Navbar>}
          <Routes>
            <Route
              path="/"
              element={auth?.id ? <UserHomePage /> : <LoginPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/listaKorisnika" element={auth?.id ? <UserListPage /> : <LoginPage />} />
            <Route path="/listaZaposlenih" element={auth?.id ? <EmployeeListPage /> : <LoginPage />} />
            <Route path="/listaFirmi" element={auth?.id ? <CompanyListPage /> : <LoginPage />} />
            <Route path="/firma" element={auth?.id ? <CompanyInfoTable /> : <LoginPage />} />
            <Route path="/korisnik" element={auth?.id ? <UserInfoTable /> : <LoginPage />} />
            <Route path="/kreirajKorisnika" element={auth?.id ? <CreateUserPage /> : <LoginPage />} />
            <Route path="/listaPorudzbina" element={auth?.id ? <OrdersPage /> : <LoginPage />} />
            <Route path="/listaPorudzbinaKorisnici" element={auth?.id ? <OrdersPageKorisnici /> : <LoginPage />} />
            <Route path="/NewOrder" element={auth?.id ? <NewOrder /> : <LoginPage />} />
            <Route path="/izmeniKorisnika" element={auth?.id ? <EditUserPage /> : <LoginPage />} />
            <Route path="/racun" element={auth?.id ? <AccountInfoPage /> : <LoginPage />} />
            <Route path="/kreirajRacun" element={auth?.id ? <CreateAccountPage /> : <LoginPage />} />
            <Route path="/kreirajZaposlenog" element={auth?.id ? <CreateEmployeePage /> : <LoginPage />} />
            <Route path="/izmeniZaposlenog" element={auth?.id ? <EditEmployeePage /> : <LoginPage />} />
            <Route path="/kreirajFirmu" element={auth?.id ? <CreateCompanyPage /> : <LoginPage />} />
            <Route path="/izmeniFirmu" element={auth?.id ? <EditCompanyPage /> : <LoginPage />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route
              path="/verifikacija"
              element={auth?.id ? <Verifikacija /> : <LoginPage />}
            />
            <Route
              path="/listaKredita"
              element={auth?.id ? <ListaKredita /> : <LoginPage />}
            />
            <Route
              path="/placanja"
              element={auth?.id ? <Placanje /> : <LoginPage />}
            />
            <Route
              path="/atm"
              element={auth?.id ? <ATMPage /> : <LoginPage />}
            />
            <Route
              path="/kartice"
              element={auth?.id ? <PregledKartica /> : <LoginPage />}
            />
            <Route
              path="/dodaj-karticu"
              element={auth?.id ? <DodajKarticu /> : <LoginPage />}
            />
            <Route
              path="/kartica"
              element={auth?.id ? <DetaljiKartice /> : <LoginPage />}
            />
            <Route
              path="/trazenjeKredita"
              element={auth?.id ? <TraziKreditStranica /> : <LoginPage />}
            />
            <Route
              path="/pojedinacniKredit"
              element={auth?.id ? <PojedinacniKreditStranica /> : <LoginPage />}
            />
            <Route
              path="/stranica-za-pojedinacni-racun"
              element={
                auth?.id ? (
                  <StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/opcije"
              element={auth?.id ? <OpcijePage /> : <LoginPage />}
            />
            <Route
              path="/userOpcije"
              element={auth?.id ? <UserOpcijePage /> : <LoginPage />}
            />
            <Route
              path="/transakcija"
              element={auth?.id ? <Transaction /> : <LoginPage />}
            />
            <Route
              path="/akcije"
              element={auth?.id ? <AkcijePage /> : <LoginPage />}
            />
            <Route
              path="/otc"
              element={auth?.id ? <OtcPage /> : <LoginPage />}
            />
            <Route
              path="/otcKorisnik"
              element={auth?.id ? <OtcPageKorisnik /> : <LoginPage />}
            />
            <Route
              path="/detaljiAkcije"
              element={auth?.id ? <DetaljiAkcije /> : <LoginPage />}
            />
            <Route
              path="/menjacnica"
              element={auth?.id ? <ExchangePage /> : <LoginPage />}
            />
            <Route
              path="/terminski"
              element={auth?.id ? <TerminskiUgovoriPage /> : <LoginPage />}
            />
            <Route
              path="/contracts"
              element={auth?.id ? <AgriculturePage /> : <LoginPage />}
            />
            <Route
              path="/specContract"
              element={auth?.id ? <SpecificContractListPage /> : <LoginPage />}
            />
            <Route
              path="/profit"
              element={auth?.id ? <ProfitPage /> : <LoginPage />}
            />
            <Route
              path="/hartije"
              element={auth?.id ? <HartijeOdVrednosti /> : <LoginPage />}
            />

            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
