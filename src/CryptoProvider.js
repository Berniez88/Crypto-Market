import React, { useContext, useState, useEffect, createContext } from "react";

export const CryptoContext = createContext();

//! Originally I wasnt able to grab my useContext due to line 59 the export default. In my Header.js when I did import CryptoContext  from "../CryptoProvider"; that grabbed default CryptoProvider. You must use CryptoContext with useContext so I can fix this issue by doing { CryptoContext } to grab the correct function

function CryptoProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  const updateCurrency = (updatedCurrency) => {
    setCurrency(updatedCurrency);
  };

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "INDR") setSymbol("₹");
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, updateCurrency, symbol }}>
      {children}
    </CryptoContext.Provider>
  );
}
export default CryptoProvider;

export const useCryptoState = () => {
  return useContext(CryptoContext);
};
