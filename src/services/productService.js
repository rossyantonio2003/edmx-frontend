/*

//src/services/productService.js
const API_URL = "http://localhost:4000/api/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
};

// funciones admin (usar token)
export const createProduct = async (formData, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` // No incluir Content-Type para FormData
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

export const updateProduct = async (id, formData, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}` // No incluir Content-Type para FormData
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
};
*/


//src/services/productService.js
const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
};

// funciones admin (usar token)
export const createProduct = async (formData, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` // No incluir Content-Type para FormData
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

export const updateProduct = async (id, formData, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}` // No incluir Content-Type para FormData
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
};