/*
// src/pages/admin/UsersPage.jsx
import React, { useEffect, useState } from "react";
import { getUsers, registerUserByAdmin } from "../../services/userService";
import Swal from "sweetalert2";
import "../../Styles/UsersPage.css";
import { FaUserPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("token");

  // 🔹 Cargar usuarios
  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error("Error en los datos recibidos");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Registrar nuevo usuario
  const handleAddUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar nuevo usuario",
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre completo">
        <input id="email" type="email" class="swal2-input" placeholder="Correo electrónico">
        <input id="password" type="password" class="swal2-input" placeholder="Contraseña">
        <select id="role" class="swal2-input">
          <option value="client">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;
        if (!name || !email || !password) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }
        return { name, email, password, role };
      },
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    });

    if (formValues) {
      try {
        const response = await registerUserByAdmin(formValues, token);
        if (response.error) throw new Error(response.message);
        Swal.fire("Éxito", "Usuario registrado correctamente", "success");
        fetchUsers();
      } catch (err) {
        Swal.fire("Error", err.message || "No se pudo registrar el usuario", "error");
      }
    }
  };

  // 🔹 Ver información del usuario
  const handleViewUser = () => {
    if (!selectedUser) return;
    Swal.fire({
      title: "Información del usuario",
      html: `
        <p><strong>Nombre:</strong> ${selectedUser.name}</p>
        <p><strong>Correo:</strong> ${selectedUser.email}</p>
        <p><strong>Rol:</strong> ${selectedUser.role}</p>
      `,
      confirmButtonText: "Cerrar",
      icon: "info",
    });
  };

  // 🔹 Editar usuario (solo nombre y rol)
  const handleEditUser = async () => {
    if (!selectedUser) return;

    const { value: formValues } = await Swal.fire({
      title: "Editar usuario",
      html: `
        <input id="name" class="swal2-input" value="${selectedUser.name}" placeholder="Nombre completo">
        <select id="role" class="swal2-input">
          <option value="client" ${selectedUser.role === "client" ? "selected" : ""}>Cliente</option>
          <option value="admin" ${selectedUser.role === "admin" ? "selected" : ""}>Administrador</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const role = document.getElementById("role").value;
        if (!name) {
          Swal.showValidationMessage("El nombre no puede estar vacío");
          return false;
        }
        return { name, role };
      },
    });

    if (formValues) {
      try {
        // Aquí agregarás tu endpoint updateUserByAdmin en userService.js
        const res = await fetch(`http://localhost:4000/api/users/${selectedUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        });

        if (!res.ok) throw new Error("Error al actualizar el usuario");
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
        setSelectedUser(null);
        fetchUsers();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  // 🔹 Eliminar usuario
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const confirm = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará al usuario: ${selectedUser.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${selectedUser.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al eliminar usuario");
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        setSelectedUser(null);
        fetchUsers();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  // 🔹 Filtrar usuarios
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-container">
      <h2 className="users-title">Gestión de Usuarios</h2>

      {/* 🔍 Barra de búsqueda y botón de crear */          /*}
      <div className="users-search-container">
        <input
          type="text"
          placeholder="Buscar usuario por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="users-search-input"
        />
        <button className="btn-add-user" onClick={handleAddUser}>
          <FaUserPlus /> Nuevo usuario
        </button>
      </div>

      {/* 🔹 Acciones sobre el usuario seleccionado */                  /*}
      {selectedUser && (
        <div className="user-actions">
          <button className="btn-action view" onClick={handleViewUser}>
            <FaEye /> Ver
          </button>
          <button className="btn-action edit" onClick={handleEditUser}>
            <FaEdit /> Editar
          </button>
          <button className="btn-action delete" onClick={handleDeleteUser}>
            <FaTrash /> Eliminar
          </button>
        </div>
      )}

      {/* 🧾 Tabla */          /*}
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={selectedUser?.id === user.id ? "selected-row" : ""}
                >
                  <td>{user.id}</td>
                  <td>{user.name || "Sin nombre"}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`role-badge ${
                        user.role === "admin" ? "role-admin" : "role-client"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users-msg">
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
*/


// src/pages/admin/UsersPage.jsx
import React, { useEffect, useState } from "react";
import { getUsers, registerUserByAdmin } from "../../services/userService";
import Swal from "sweetalert2";
import "../../Styles/UsersPage.css";
import { FaUserPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("token");

  // ⭐ Se define la base del backend usando la variable
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Cargar usuarios
  const fetchUsers = async () => {
    try {
      const data = await getUsers(token);
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error("Error en los datos recibidos");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Registrar nuevo usuario
  const handleAddUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registrar nuevo usuario",
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre completo">
        <input id="email" type="email" class="swal2-input" placeholder="Correo electrónico">
        <input id="password" type="password" class="swal2-input" placeholder="Contraseña">
        <select id="role" class="swal2-input">
          <option value="client">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;
        if (!name || !email || !password) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }
        return { name, email, password, role };
      },
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    });

    if (formValues) {
      try {
        const response = await registerUserByAdmin(formValues, token);
        if (response.error) throw new Error(response.message);
        Swal.fire("Éxito", "Usuario registrado correctamente", "success");
        fetchUsers();
      } catch (err) {
        Swal.fire("Error", err.message || "No se pudo registrar el usuario", "error");
      }
    }
  };

  // 🔹 Ver información del usuario
  const handleViewUser = () => {
    if (!selectedUser) return;
    Swal.fire({
      title: "Información del usuario",
      html: `
        <p><strong>Nombre:</strong> ${selectedUser.name}</p>
        <p><strong>Correo:</strong> ${selectedUser.email}</p>
        <p><strong>Rol:</strong> ${selectedUser.role}</p>
      `,
      confirmButtonText: "Cerrar",
      icon: "info",
    });
  };

  // 🔹 Editar usuario (solo nombre y rol)
  const handleEditUser = async () => {
    if (!selectedUser) return;

    const { value: formValues } = await Swal.fire({
      title: "Editar usuario",
      html: `
        <input id="name" class="swal2-input" value="${selectedUser.name}" placeholder="Nombre completo">
        <select id="role" class="swal2-input">
          <option value="client" ${selectedUser.role === "client" ? "selected" : ""}>Cliente</option>
          <option value="admin" ${selectedUser.role === "admin" ? "selected" : ""}>Administrador</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const role = document.getElementById("role").value;
        if (!name) {
          Swal.showValidationMessage("El nombre no puede estar vacío");
          return false;
        }
        return { name, role };
      },
    });

    if (formValues) {
      try {
        // ⭐ URL actualizada (antes: http://localhost:4000/api/users/...)
        const res = await fetch(`${API_URL}/api/users/${selectedUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        });

        if (!res.ok) throw new Error("Error al actualizar el usuario");

        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
        setSelectedUser(null);
        fetchUsers();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  // 🔹 Eliminar usuario
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const confirm = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará al usuario: ${selectedUser.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        // ⭐ URL actualizada
        const res = await fetch(`${API_URL}/api/users/${selectedUser.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al eliminar usuario");

        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        setSelectedUser(null);
        fetchUsers();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  // 🔹 Filtrar usuarios
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-container">
      <h2 className="users-title">Gestión de Usuarios</h2>

      {/* 🔍 Barra de búsqueda y botón de crear */}
      <div className="users-search-container">
        <input
          type="text"
          placeholder="Buscar usuario por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="users-search-input"
        />
        <button className="btn-add-user" onClick={handleAddUser}>
          <FaUserPlus /> Nuevo usuario
        </button>
      </div>

      {/* 🔹 Acciones sobre el usuario seleccionado */}
      {selectedUser && (
        <div className="user-actions">
          <button className="btn-action view" onClick={handleViewUser}>
            <FaEye /> Ver
          </button>
          <button className="btn-action edit" onClick={handleEditUser}>
            <FaEdit /> Editar
          </button>
          <button className="btn-action delete" onClick={handleDeleteUser}>
            <FaTrash /> Eliminar
          </button>
        </div>
      )}

      {/* 🧾 Tabla */}
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={selectedUser?.id === user.id ? "selected-row" : ""}
                >
                  <td>{user.id}</td>
                  <td>{user.name || "Sin nombre"}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`role-badge ${
                        user.role === "admin" ? "role-admin" : "role-client"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users-msg">
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
