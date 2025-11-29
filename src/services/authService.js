//src/services/authService.js
const API_URL = "http://localhost:4000/api/auth"; //url del backend

// Función para Registro
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      // Si el backend responde con error, lanzamos un error
      throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
  } catch (err) {
    // Retorna un objeto con error para que frontend lo maneje
    return { error: true, message: err.message };
  }
};

// Función para Login
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

// Validar token (si implementas endpoint verify en backend)
export const verifyToken = async (token) => {
  try {
    const res = await fetch(`${API_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Token inválido");
    return data;
  } catch (err) {
    return { error: true, message: err.message };
  }
};
