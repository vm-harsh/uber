import React, { createContext, useState } from 'react'


export const CaptainContext = createContext();

const CaptainProvider = ({ children }) => {

  const [captain, setCaptain] = useState(() => {
    const saved = localStorage.getItem("captain");
    return saved ? JSON.parse(saved) : null;
  });

  const value = { captain, setCaptain };

  
  return (
    <CaptainContext.Provider value={value}>
      {children}
    </CaptainContext.Provider>
  );
};


export default CaptainProvider