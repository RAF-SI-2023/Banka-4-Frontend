export type Account = {
  id: number;
  brojRacuna: string;
  vlasnik: number;
  stanje: number;
  raspolozivoStanje: number;
  zaposledni: number;
  datumKreiranja: number;
  datumIsteka: number;
  currency: string;
  aktivan: boolean;
};

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
