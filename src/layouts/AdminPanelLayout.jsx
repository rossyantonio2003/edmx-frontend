//src/layouts/AdminPanelLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/admin.css";
import adminImage from "../assets/admin.png";

export default function AdminPanelLayout() {
  return (
    <div className="admin-panel-wrapper">
      {/* Sidebar lateral */}
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <img src={adminImage} alt="Perfil Admin" className="admin-avatar" />
          <h5 className="admin-name">ADMIN</h5>
        </div>

        <nav className="admin-menu">
          <Link to="/admin/products" className="admin-menu-item">🛒 Productos</Link>
          <Link to="/admin/categories" className="admin-menu-item">📦 Categorías</Link>
          <Link to="/admin/orders" className="admin-menu-item">📋 Pedidos</Link>
          <Link to="/admin/users" className="admin-menu-item">👤 Usuarios</Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
