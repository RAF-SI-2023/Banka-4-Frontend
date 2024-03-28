export enum UserPermissions {
  listanje_korisnika = 'listanje_korisnika',
  dodavanje_korisnika = 'dodavanje_korisnika',
  editovanje_korisnika = 'editovanje_korisnika',
  deaktiviranje_korisnika = 'deaktiviranje_korisnika',
  kreiranje_racuna = 'kreiranje_racuna',
  editovanje_racuna = 'editovanje_racuna',
  brisanje_racuna = 'brisanje_racuna',
}

export enum EmployeePermissions {
  listanje_korisnika = 'listanje_korisnika',
  dodavanje_korisnika = 'dodavanje_korisnika',
  editovanje_korisnika = 'editovanje_korisnika',
  deaktiviranje_korisnika = 'deaktiviranje_korisnika',
  kreiranje_racuna = 'kreiranje_racuna',
  editovanje_racuna = 'editovanje_racuna',
  brisanje_racuna = 'brisanje_racuna',
  listanje_radnika = 'listanje_radnika',
  dodavanje_radnika = 'dodavanje_radnika',
  editovanje_radnika = 'editovanje_radnika',
  deaktiviranje_radnika = 'deaktiviranje_radnika'
}

export type User = {
  ime: string;
  prezime: string;
  jmbg: string;
  datumRodjenja: string;
  pol: string;
  adresa: string;
  email: string;
  brojTelefona: string;
  permisije: UserPermissions[];
}

export type UserListProps = {
  users: User[];
}

export type UserPageProps = {
  user: User;
}

export enum AccountType {
  tekuci = 'tekuci',
  stedni = 'stedni',
  penzionerski = 'penzionerski',
  racun_za_mlade = 'racun_za_mlade',
  devizni = 'devizni',
  poslovni = 'poslovni '
}

export type Account = {
  brojRacuna: string;
  stanje: number;
  raspolozivoStanje: number;
  datumKreiranja: string;
  datumIsteka: string;
  currency: string;
  vrstaRacuna: string;
  aktivan: boolean;
  kamatnaStopa?: string;
  odrzavanjeRacuna?: string;
  vlasnik?: number,
  zaposleni?: number
}

export type AccountBasicInfo = {
  brojRacuna: string;
  stanje: number;
}

export type AccountListProps = {
  accounts: Account[];
}

export type AccountPageProps = {
  account: Account;
}

export type Employee = {
  ime: string;
  prezime: string;
  jmbg: string;
  username: string;
  datumRodjenja: string;
  pol: string;
  adresa: string;
  email: string;
  brojTelefona: string;
  pozicija: string;
  departman: string;
  password: string;
  permisije: number;
}

export type EmployeeListProps = {
  employees: Employee[];
}

export type Company = {
  nazivPreduzeca: string;
  brojTelefona: string;
  brojFaksa: string;
  pib: string;
  maticniBroj: string;
  sifraDelatnosti: string;
  registarskiBroj: string;
}

export type CompanyListProps = {
  companies: Company[];
}

export type Kartica = {
  id: number;
  naziv: string;
  broj: string;
  vrsta: 'kreditna' | 'debitna';
  datum_kreiranja: number;
  datum_isteka: number;
  broj_racuna: string;
  cvv: string;
  limit: number;
  status: 'aktivna' | 'deaktivirana' | 'blokirana';
}

export type TransakcijaKarticePrikaz = {
  id: number;
  nazivPrimaoca: string;
  brojRacunaPrimaoca: string;
  iznos: number;
  sifraPlacanja: string;
  pozivNaBroj: string;
  svrhaPlacanja: string;
  status: 'U obradi' | 'Uspeh' | 'Neuspeh';
  vremeTransakcije: number; // JS timestamp
  vremeIzvrsavanja: number;
}

export type Kredit = {
  id: number;
  type: string;
  amount: string;
  salary: number;
  currentEmploymentPeriod: number;
  loanTerm: number;
  branchOffice: string;
  bankAccountNumber: number;
  loanPurpose: string;
  permanentEmployee: boolean;
  status: string;
}

export type KreditPojedinacni = {
  naziv: string;
  broj: string;
  iznos: number;
  period: number;
  nominalnaKamatnaStopa: number;
  efektivnaKamatnaStopa: number;
  datumUgovaranja: number;
  datumDospeca: number;
  iznosRate: number;
  datumSledeceRate: number;
  preostaloDugovanje: number;
  iznosPretplate: number;
  valuta: string;
};

export type Transakcija = {
  nazivPrimaoca: string,
  racunPrimaoca: string,
  iznos: number,
  pozivNaBroj: string,
  status: string,
  vremeTransakcije: string;
  sifraPlacanja: string;
  svrhaPlacanja: string;
  vremeIzvrsavanja: string;
}

export enum UserRoutes {
  favorite_users = "/omiljeni-korisnik",
  validate_otp = "/validate-otp",
  generate_otp = "/generate-otp",
  user_generate_reset = "/korisnik/generate-reset",
  user_reset_password = "/korisnik/reset-password",
  user_login = "/korisnik/login",
  user_generate_login = "/korisnik/generate-login",
  user_register = "/korisnik/verifikacija",
  user_add = "/korisnik/add",
  user = "/korisnik",
  worker = "/radnik",
}

export enum BankRoutes {
  transaction_new_payment = "/transaction/nova-uplata",
  transaction_new_transfer = "/transaction/nova-uplata",
  cards = "/cards",
  cards_create = "/cards/create",
  credit_approve = "/credit/approve",
  credit_deny = "/credit/deny",
  credit_apply = "/credit/apply",
  credit_all = "/credit/all",
  credit_detailed = "/detailed-credit/creditRequestId",
  account_add_tekuci = "/racuni/dodajTekuci",
  account_add_devizni = "/racuni/dodajDevizni",
  account_find_by_number = "/racuni/deleteRacunPoBroju",
  account_find_user_account = "/racuni/nadjiRacuneKorisnika",
  company_create = "/racuni/kreirajFirmu",
}

export enum StockRoutes {

}

export type Transaction = {
  senderAccountNumber: string;
  recipientName: string;
  recipientAccountNumber: string;
  amount: number;
  referenceNumber: string;
  status: "U obradi" | "Uspeh" | "Neuspeh";
  timestamp: string;
};

export type ExchangeRate = {
  currencyCode: string;
  rate: number;
};