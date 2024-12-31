import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch available currencies
    fetch('https://v6.exchangerate-api.com/v6/8929ed379f0e2b83a1b8d2cb/codes')
      .then(response => response.json())
      .then(data => setCurrencies(data.supported_codes))
      .catch(error => console.error('Error fetching currency codes:', error));
  }, []);

  useEffect(() => {
    // Fetch exchange rate
    if (fromCurrency && toCurrency) {
      fetch(`https://v6.exchangerate-api.com/v6/8929ed379f0e2b83a1b8d2cb/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => setConversionRate(data.conversion_rates[toCurrency]))
        .catch(error => console.error('Error fetching rates:', error));
    }
  }, [fromCurrency, toCurrency]);

  const handleConversion = () => {
    // Perform conversion (already calculated in state)
  };

  return (
    <div>
      <div className="mb-4">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label>From Currency:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>{`${code} - ${name}`}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label>To Currency:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>{`${code} - ${name}`}</option>
          ))}
        </select>
      </div>
      <button onClick={handleConversion} className="bg-blue-500 text-white p-2 rounded">
        Convert
      </button>
      {conversionRate && (
        <p className="mt-4 text-lg">
          {amount} {fromCurrency} = {(amount * conversionRate).toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
