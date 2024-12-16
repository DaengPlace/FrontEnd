"use client";

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoia2FrYW9fMzgwNjEyNzc5OSIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MzQwNjg0ODUsImV4cCI6MTczNDEyODQ4NX0.RkZ9oXIk-EOpuVPdI57YNzgU04pQFDtPkbEdtbJOB9E');

  return (
    <AuthContext.Provider value={{accessToken, setAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);