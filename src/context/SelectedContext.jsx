import React, { createContext, useState, useContext } from "react";

const SelectedContext = createContext();

export function SelectedProvider({ children }) {
  const [selected, setSelected] = useState(null);
  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
}

export function useSelectedContext() {
  return useContext(SelectedContext);
}
