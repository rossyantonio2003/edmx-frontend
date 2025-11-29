// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService.js";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async ({ email, password }, navigate) => {
    const data = await loginUser({ email, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);

      if (data.user.role === "admin") navigate("/admin");
      else navigate("/");
    }
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    return data;
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//para usar con mercado pago
export const useAuth = () => useContext(AuthContext);