import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    // Fetch exchange rates from API
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  return (
    <div className="container">
      <div className="converter-card">
        <h1 className="title">Currency Converter</h1>

        {/* Currency Selection */}
        <div className="currency-selector">
          <select
            className="currency-dropdown"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <select
            className="currency-dropdown"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          className="amount-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Convert Button */}
        <button className="convert-btn">Convert</button>

        {/* Result Section */}
        <div className="result">
          <div className="converted-amount">
            {convertedAmount && `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}
          </div>
          <div className="rate-info">
            {exchangeRate && `Exchange Rate: 1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
