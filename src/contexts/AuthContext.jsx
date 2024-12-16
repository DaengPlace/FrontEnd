"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);

  // 로컬 스토리지에서 토큰 값을 가져와 초기 상태 설정
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  // accessToken이 바뀔 때마다 로컬 스토리지 업데이트
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{accessToken, setAccessToken, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);