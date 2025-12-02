/*
//src/services/userService.js
const API_URL = "http://localhost:4000/api/users"; //url del backend

//Listar usuarios (admin)
export const getUsers = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

//Registrar usuario por parte del admin
export const registerUserByAdmin = async (userData, token) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al registrar usuario");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Actualizar usuario (admin)
export const updateUserByAdmin = async (id, userData, token) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al actualizar usuario");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export const deleteUserByAdmin = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al eliminar usuario");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async (token) => {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error al obtener el perfil");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Actualizar perfil del usuario autenticado
export const updateProfile = async (token, userData) => {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error al actualizar perfil");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};
*/

// src/services/userService.js
const API_URL = `${import.meta.env.VITE_API_URL}/users`; // url del backend

// Listar usuarios (admin)
export const getUsers = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Registrar usuario por parte del admin
export const registerUserByAdmin = async (userData, token) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al registrar usuario");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Actualizar usuario (admin)
export const updateUserByAdmin = async (id, userData, token) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al actualizar usuario");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Eliminar usuario (admin)
export const deleteUserByAdmin = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al eliminar usuario");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async (token) => {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error al obtener el perfil");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Actualizar perfil del usuario autenticado
export const updateProfile = async (token, userData) => {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error al actualizar perfil");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};



