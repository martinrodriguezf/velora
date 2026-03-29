'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATE = 43; // 1 USD = 43 UYU Fixed Rate

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('velora_currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('velora_currency', currency);
    }
  }, [currency, isInitialized]);

  const formatPrice = (priceInUsd) => {
    if (priceInUsd === undefined || priceInUsd === null) return '$0.00';
    
    // Conversion math
    const converted = currency === 'UYU' ? priceInUsd * EXCHANGE_RATE : priceInUsd;
    
    // Formatting
    const symbol = currency === 'UYU' ? '$' : 'USD $';
    return `${symbol}${converted.toLocaleString('es-UY', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice,
      EXCHANGE_RATE
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
