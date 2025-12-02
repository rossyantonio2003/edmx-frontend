
/*
//src/services/categoryService.js
const API_URL = "http://localhost:4000/api/categories";

//Obtener todas las categorías (público)
export const getCategories = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
};

//Obtener categoría por ID (público)
export const getCategoryById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener categoría");
  return res.json();
};

//Crear categoría (solo admin)
export const createCategory = async (data, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
};

//Actualizar categoría (solo admin)
export const updateCategory = async (id, data, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return res.json();
};

//Eliminar categoría (solo admin)
export const deleteCategory = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
  return res.json();
};
*/

//src/services/categoryService.js
const API_URL = `${import.meta.env.VITE_API_URL}/api/categories`;

//Obtener todas las categorías (público)
export const getCategories = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
};

//Obtener categoría por ID (público)
export const getCategoryById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener categoría");
  return res.json();
};

//Crear categoría (solo admin)
export const createCategory = async (data, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
};

//Actualizar categoría (solo admin)
export const updateCategory = async (id, data, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar categoría");
  return res.json();
};

//Eliminar categoría (solo admin)
export const deleteCategory = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
  return res.json();
};
