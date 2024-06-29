export type Stock = {
    ticker: string,
    strike: string,
    lastPrice: string,
    bid: string,
    ask: string,
    change: string,
    changePercent: string,
    contractSize: string,
    openInterest: string,
    impliedVolatility: string
}
export type StockList = {
    stocks: Stock[]
}
export type UserStock = {
    ticker: string,
    strike: string,
    lastPrice: string,
    premium: string,
    amount: string,
}
export type UserStockList = {
    stocks: UserStock[]
}
export type Akcija = {
    ticker: string,
    price: string,
    volume: string,
    change: string,
    dividendYield: string,
    lastRefresh: string,
    nameDescription: string,
    high: string,
    low: string,
    outstandingShares: string,
}
export type AkcijaList = {
    stocks: Akcija[]
}
export type IOTC = {
    ticker: string,
    amount: number,
}
export type IOtcList = {
    otcs: IOTC[]
}

export type ForeignOffer = {
    id: string,
    quantity: number,
    amountOffered: number,
    offerId: string,
    ticker: string,
    amount: number,
    price: number,
    idBank: number,
    offerStatus: string,
}

export type ForeignOfferList = {
    offers: ForeignOffer[]
}

export type OurOffer = {
    myOfferId: string,
    ticker: string,
    amount: number,
    price: number,
    offerStatus: string,
}

export type OurOfferList = {
    offers: OurOffer[]
}
export type Options = {
    id: number | null,
    ticker: string,
    lastPrice: string,
    strikePrice: string,
    bid: string,
    ask: string,
    change: string,
    percentChange: string,
    contractSize: string,
    openInterest: string,
    impliedVolatility: string
}

export type OptionsList = {
    options: Options[]
}

export type Order = {
    id: string;
    action: string;
    ticker: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
    createdBy: string;
    status: 'approved' | 'rejected' | 'pending';
    approvedBy?: string;
    userId: string;
}

export type UserStock2 = {
    id: number;
    ticker: string;
    quantity: number;
    currentBid: number;
    currentAsk: number;
};

export type Option2 = {
    korisnikId: number;
    opcijaId: number;
    akcijaId: number;
    akcijaTickerCenaPrilikomIskoriscenja: number;
};

export type Option = {
    korisnikId: number;
    opcijaId: number;
    akcijaId: number;
    akcijaTickerCenaPrilikomIskoriscenja: number;
};

export type Future = {
    type: string;
    name: string;
    price: number;
    contractSize: number;
    contractUnit: "string";
    openInterest: 0;
    settlementDate: 0;
    maintenanceMargin: 0;
};
