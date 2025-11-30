// src/pages/admin/AdminDashboard.jsx
import React from "react";
import "../../Styles/adminDashboard.css"; // Asegúrate de crear este archivo

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <h2 className="admin-dashboard-title">
          Bienvenido al Panel de Administración
        </h2>

        <p className="admin-dashboard-text">
          Selecciona una sección en el menú lateral para gestionar tu tienda.
        </p>
      </div>
    </div>
  );
}

