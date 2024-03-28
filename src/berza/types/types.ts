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
    oznaka: string,
    cena: string,
    volume: string,
    promena: string,
    promenaProcenat: string,
    poslednjeAzuriranje: string
}
export type AkcijaList = {
    stocks: Akcija[]
}