
//src/services/orderService.js
const API_URL = "http://localhost:4000/api/orders";

// 🛍 Crear un nuevo pedido desde el carrito del usuario
export const createOrder = async (token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Error al crear pedido");
  return res.json();
};

// 👤 Obtener los pedidos del usuario logueado
export const getMyOrders = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Error al obtener pedidos del usuario");
  return res.json();
};

// 🧑‍💼 Obtener todos los pedidos (admin)
export const getAllOrders = async (token) => {
  const res = await fetch(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Error al obtener pedidos del administrador");
  return res.json();
};

// 🔄 Actualizar el estado de un pedido (admin)
export const updateOrderStatus = async (id, status, token) => {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Error al actualizar estado del pedido");
  return res.json();
};
