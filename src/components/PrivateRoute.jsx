// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // no logueado -> a login
  if (!user) return <Navigate to="/login" replace />;

  // si se pide rol y no coincide -> unauthorized (aqui redirigimos a home)
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}
