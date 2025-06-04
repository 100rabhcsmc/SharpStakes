import React, { createContext, useState } from 'react';
import sampleData from '../data/sampleData.json';

export const AppContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(sampleData.user);
  const [games, setGames] = useState(sampleData.games);

  return (
    <AppContext.Provider value={{ user, setUser, games, setGames }}>
      {children}
    </AppContext.Provider>
  );
};