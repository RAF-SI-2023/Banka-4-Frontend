// @ts-nocheck

import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import ExchangeRatesTable from "menjacnica/ExchangeRatesTable";

type CurrencyRate = {
  code: string;
  rate: number; // Exchange rate in relation to dinar
};

// Example currency rates
const MOCK_CURRENCY_RATES: CurrencyRate[] = [
  { code: "EUR", rate: 117.5 },
  { code: "USD", rate: 97.3 },
  { code: "GBP", rate: 137.2 },
];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [currencyRates, setCurrencyRates] =
    useState<CurrencyRate[]>(MOCK_CURRENCY_RATES);

  useEffect(() => {
    // Backend call for exchange rates could be implemented here.
  }, []);

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newFromCurrency = e.target.value as string;
    if (newFromCurrency === toCurrency) {
      setToCurrency(fromCurrency);
    }
    setFromCurrency(newFromCurrency);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newToCurrency = e.target.value as string;
    if (newToCurrency === fromCurrency) {
      setFromCurrency(toCurrency);
    }
    setToCurrency(newToCurrency);
  };

  const calculateConversion = () => {
    if (!amount) return;
    const fromRate =
      currencyRates.find((cr) => cr.code === fromCurrency)?.rate || 1;
    const toRate =
      currencyRates.find((cr) => cr.code === toCurrency)?.rate || 1;
    const result = (parseFloat(amount) * fromRate) / toRate;
    setConvertedAmount(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <TextField
        label="Enter amount"
        variant="outlined"
        value={amount}
        onChange={handleAmountChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>From Currency</InputLabel>
        <Select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          label="From Currency"
        >
          {currencyRates.map((currency) => (
            <MenuItem key={currency.code} value={currency.code}>
              {currency.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>To Currency</InputLabel>
        <Select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          label="To Currency"
        >
          {currencyRates.map((currency) => (
            <MenuItem key={currency.code} value={currency.code}>
              {currency.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6" gutterBottom>
        Calculated value: {convertedAmount.toFixed(2)}
      </Typography>
      <ExchangeRatesTable />
      {amount === "" && (
        <Typography color="error" style={{ marginTop: 20 }}>
          Please enter an amount.
        </Typography>
      )}
    </div>
  );
};

export default CurrencyConverter;
