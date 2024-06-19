export enum EmployeePermissionsV2 {
  list_users = "list_users",
  create_users = "create_users",
  edit_users = "edit_users",
  deactivate_users = "deactivate_users",

  list_workers = "list_workers",
  create_workers = "create_workers",
  edit_workers = "edit_workers",
  deactivate_workers = "deactivate_workers",

  list_firms = "list_firms",
  create_firms = "create_firms",
  edit_firms = "edit_firms",
  deactivate_firms = "deactivate_firms",

  list_bank_accounts = "list_bank_accounts",
  create_bank_accounts = "create_bank_accounts",
  deactivate_bank_accounts = "deactivate_bank_accounts",

  list_credits = "list_credits",
  accept_redits = "accept_redits",
  deny_credits = "deny_credits",

  list_cards = "list_cards",
  activate_cards = "activate_cards",
  deactivate_cards = "deactivate_cards",
  block_cards = "block_cards",

  list_orders = "list_orders",
  accept_orders = "accept_orders",
  deny_orders = "deny_orders",

  exchange_access = "exchange_access",
  payment_access = "payment_access",
  action_access = "action_access",
  option_access = "option_access",
  order_access = "order_access",
  termin_access = "termin_access",
  profit_access = "profit_access",
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
};

export type UserListProps = {
  users: User[];
};

export type UserPageProps = {
  user: User;
};

export enum AccountType {
  tekuci = "tekuci",
  stedni = "stedni",
  penzionerski = "penzionerski",
  racun_za_mlade = "racun_za_mlade",
  devizni = "devizni",
  poslovni = "poslovni ",
  marzni = "marzni",
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
  vlasnik?: number;
  zaposleni?: number;
};

export enum GrupaHartijaOdVrednosti { // Bek moze da im da id
  Stock = "stock",
  Forex = "forex",
  Future = "future",
  Options = "options",
}

export type MarginAccount = {
  brojRacuna: string;
  currency: string;
  grupaHartijaOdVrednosti: GrupaHartijaOdVrednosti;
  ulozenaSredstva: number;
  pozajmljenaSredstva: number;
  marginaOdrzavanja: number;
  marginCall: boolean;
  /*datumKreiranja?: string; - Ne pise da treba
  datumIsteka?: string;
  aktivan?: boolean;
  kamatnaStopa?: string; 
  odrzavanjeRacuna?: string;
  vlasnik?: number,
  zaposleni?: number*/
};

export type MarginTransaction = {
  brojRacuna: string;
  vremeTransakcije: string;
  orderRef: number;
  korisnik: string;
  opis: string;
  currency: string;
  tipTransakcije: "uplata" | "isplata";
  ulog: number;
  pozajmljeno: number;
  marginaOdrzavanja: number;
  kamata: number; // 5% od pozajmljeno
};

export type AccountBasicInfo = {
  brojRacuna: string;
  stanje: number;
};

export type AccountListProps = {
  accounts: Account[];
};

export type AccountPageProps = {
  account: Account;
};

export type Employee = {
  ime: string;
  prezime: string;
  jmbg: string;
  username: string;
  datumRodjenja: string;
  pol: string;
  adresa: string;
  email: string;
  firmaId: number;
  brojTelefona: string;
  pozicija: string;
  departman: string;
  password: string;
  permisije: number;
};

export type EmployeeListProps = {
  employees: Employee[];
};

export type Company = {
  nazivPreduzeca: string;
  brojTelefona: string;
  brojFaksa: string;
  pib: string;
  id: string;
  maticniBroj: string;
  sifraDelatnosti: string;
  registarskiBroj: string;
};

export type CompanyListProps = {
  companies: Company[];
};

export type Kartica = {
  id: number;
  name: string;
  number: string;
  type: "kreditna" | "debitna";
  creationDate: number;
  expirationDate: number;
  bankAccountNumber: string;
  cvv: string;
  cardLimit: number;
  status: 'active' | 'inactive' | 'blocked';
  blocked: boolean;
};

export type TransakcijaKarticePrikaz = {
  id: number;
  nazivPrimaoca: string;
  brojRacunaPrimaoca: string;
  iznos: number;
  sifraPlacanja: string;
  pozivNaBroj: string;
  svrhaPlacanja: string;
  status: "U obradi" | "Uspeh" | "Neuspeh";
  vremeTransakcije: number; // JS timestamp
  vremeIzvrsavanja: number;
};

export type Kredit = {
  id: number;
  type: string;
  amount: string;
  salary: string;
  currentEmploymentPeriod: string;
  loanTerm: string;
  branchOffice: string;
  bankAccountNumber: string;
  loanPurpose: string;
  permanentEmployee: boolean;
  status: string;
};

export type KreditPojedinacni = {
  amount: number;
  bankAccountNumber: string;
  contractDate: number;
  currency: string;
  effectiveInterestRate: number;
  installmentAmount: number;
  loanMaturityDate: number;
  loanTerm: number;
  nextInstallmentDate: number;
  nominalInterestRate: number;
  prepayment: number;
  remainingDebt: number;
  type: string;
};

export type Transakcija = {
  nazivPrimaoca: string;
  racunPrimaoca: string;
  iznos: number;
  pozivNaBroj: string;
  status: string;
  vremeTransakcije: string;
  sifraPlacanja: string;
  svrhaPlacanja: string;
  vremeIzvrsavanja: string;
};

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
  worker_by_email = "/radnik/email",
  atm = "/racuni/atm",
  place_order = "/orders/place-order",
  buy_option = "/opcija/kreiraj-opciju-za-korisnika",
}

export enum BankRoutes {
  transaction_new_payment = "/transaction/nova-uplata",
  transaction_new_transfer = "/transaction/novi-prenos",
  cards_names = "/cards/names",
  cards = "/cards",
  cards_create = "/cards/create",
  credit_approve = "/credit/approve",
  credit_deny = "/credit/deny",
  credit_apply = "/credit/apply",
  credit_all = "/credit/all",
  credit_detailed = "/credit/detailed-credit/creditRequestId",
  account_add_tekuci = "/racuni/dodajTekuci",
  account_add_devizni = "/racuni/dodajDevizni",
  account_find_by_number = "/racuni/deleteRacunPoBroju",
  account_find_user_account = "/racuni/nadjiRacuneKorisnika",
  account_find_firm_user = "",
  company_create = "/racuni/kreirajFirmu",
  exchange = "/exchange",
  account_add_marzni = "/marzniRacuni",
  get_company_accounts = "/company/get-accounts",
  get_total_profit = "/marzniRacuni/bank-profit"
}

export enum StockRoutes {}

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

export type Profit = {
  senderAccount: string;
  toAccount: string;
  senderAmount: number;
  senderCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  profit: number;
  dateAndTime: number;
};
