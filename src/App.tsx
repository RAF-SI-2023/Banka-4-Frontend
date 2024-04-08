import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getMe } from './utils/getMe';
import styled from 'styled-components';

// Lazy load all pages and components
const UserInfoTable = lazy(() => import('./zaposleni/pages/userPage'));
const Navbar = lazy(() => import('./zaposleni/components/Navbar'));
const CreateUserPage = lazy(() => import('./zaposleni/pages/createUserPage'));
const EditUserPage = lazy(() => import('./zaposleni/pages/editUserPage'));
const CreateAccountPage = lazy(() => import('./zaposleni/pages/createAccountPage'));
const AccountInfoPage = lazy(() => import('./zaposleni/pages/accountPage'));
const CreateEmployeePage = lazy(() => import('./zaposleni/pages/createEmployeePage'));
const EditEmployeePage = lazy(() => import('./zaposleni/pages/editEmployeePage'));
const CreateCompanyPage = lazy(() => import('./zaposleni/pages/createCompanyPage'));
const EditCompanyPage = lazy(() => import('./zaposleni/pages/editCompanyPage'));
const LoginPage = lazy(() => import('./moduls/LogReg/LoginPage'));
const RegistrationPage = lazy(() => import('./moduls/LogReg/RegistrationPage'));
const Placanje = lazy(() => import('./korisnici/pages/PlacanjePage'));
const UserHomePage = lazy(() => import('korisnici/pages/UserHomePage'));
const ResetPasswordPage = lazy(() => import('korisnici/pages/ResetPasswordPage'));
const Verifikacija = lazy(() => import('korisnici/pages/StranicaZaVerifikacijuPlacanja'));
const StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike = lazy(() => import('korisnici/pages/StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike'));
const PregledKartica = lazy(() => import('moduls/Kartice/PregledKartica'));
const DodajKarticu = lazy(() => import('moduls/Kartice/DodajKarticu'));
const DetaljiKartice = lazy(() => import('moduls/Kartice/DetaljiKartice'));
const ListaKredita = lazy(() => import('moduls/SviKrediti/listaKredita'));
const TraziKreditStranica = lazy(() => import('moduls/TrazenjeKredita/TraziKreditOdBanke'));
const PojedinacniKreditStranica = lazy(() => import('moduls/PojedinacniKredit/PojedinacniKreditStranica'));
const OpcijePage = lazy(() => import('berza/pages/OpcijePage'));
const UserOpcijePage = lazy(() => import('berza/pages/UserOptionsPage'));
const Transaction = lazy(() => import('zaposleni/pages/TransactionPage'));
const AkcijePage = lazy(() => import('berza/pages/AkcijePage'));
const DetaljiAkcije = lazy(() => import('berza/pages/DetaljiAkcijePage'));
const ExchangePage = lazy(() => import('menjacnica/ExchangePage'));
const UserAndAccountList = lazy(() => import('./zaposleni/pages/listsPage'));

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const auth = getMe()
function App() {
  return (
    <>
      {/* {!auth?.id &&
        <VideoWrapper>
          <video autoPlay muted width="800" controls>
            <source src={'https://cdn.discordapp.com/attachments/1161024401001680987/1224340251385004052/stop.mp4?ex=661d22b7&is=660aadb7&hm=b023e16a8c263142fbeeed37e364132d6cf6a447561502c19c405b201cfa6040&'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </VideoWrapper>
      } */}

      <BrowserRouter>
      <Suspense fallback={<div style={{
    color: 'white',
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '5px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    animation: 'fadeIn 1s ease-out'
}}>Loading...</div>}>
        {auth?.id && <Navbar></Navbar>}
        <Routes>
          <Route path="/" element={auth?.id ? <UserHomePage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/listaKorisnika" element={auth?.id ? <UserAndAccountList /> : <LoginPage />} />
          <Route path="/korisnik" element={auth?.id ? <UserInfoTable /> : <LoginPage />} />
          <Route path="/kreirajKorisnika" element={auth?.id ? <CreateUserPage /> : <LoginPage />} />
          <Route path="/izmeniKorisnika" element={auth?.id ? <EditUserPage /> : <LoginPage />} />
          <Route path="/racun" element={auth?.id ? <AccountInfoPage /> : <LoginPage />} />
          <Route path="/kreirajRacun" element={auth?.id ? <CreateAccountPage /> : <LoginPage />} />
          <Route path="/kreirajZaposlenog" element={auth?.id ? <CreateEmployeePage /> : <LoginPage />} />
          <Route path="/izmeniZaposlenog" element={auth?.id ? <EditEmployeePage /> : <LoginPage />} />
          <Route path="/kreirajFirmu" element={auth?.id ? <CreateCompanyPage /> : <LoginPage />} />
          <Route path="/izmeniFirmu" element={auth?.id ? <EditCompanyPage /> : <LoginPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/verifikacija" element={auth?.id ? <Verifikacija /> : <LoginPage />} />
          <Route path="/listaKredita" element={auth?.id ? <ListaKredita /> : <LoginPage />} />
          <Route path="/placanja" element={auth?.id ? <Placanje /> : <LoginPage />} />
          <Route path="/kartice" element={auth?.id ? <PregledKartica /> : <LoginPage />} />
          <Route path="/dodaj-karticu" element={auth?.id ? <DodajKarticu /> : <LoginPage />} />
          <Route path="/kartica" element={auth?.id ? <DetaljiKartice /> : <LoginPage />} />
          <Route path="/trazenjeKredita" element={auth?.id ? <TraziKreditStranica /> : <LoginPage />} />
          <Route path="/pojedinacniKredit" element={auth?.id ? <PojedinacniKreditStranica /> : <LoginPage />} />
          <Route path="/stranica-za-pojedinacni-racun" element={auth?.id ? <StranicaZaPojedinacniRacunSaPocetneStraniceZaKorisnike /> : <LoginPage />} />
          <Route path="/opcije" element={auth?.id ? <OpcijePage /> : <LoginPage />} />
          <Route path="/userOpcije" element={auth?.id ? <UserOpcijePage /> : <LoginPage />} />
          <Route path="/transakcija" element={auth?.id ? <Transaction /> : <LoginPage />} />
          <Route path="/akcije" element={auth?.id ? <AkcijePage /> : <LoginPage />} />
          <Route path="/detaljiAkcije" element={auth?.id ? <DetaljiAkcije /> : <LoginPage />} />
          <Route path="/menjacnica" element={auth?.id ? <ExchangePage /> : <LoginPage />} />

        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
