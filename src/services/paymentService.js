/*
// src/services/paymentService.js
import axios from "axios";

// URL
const API_BASE = "http://localhost:4000/api";
const PAYMENTS_URL = `${API_BASE}/payments`;


//Crear pedido + shipping (costo de envio)

export const createOrder = async (token, shipping = 0) => {
  const res = await axios.post(
    `${API_BASE}/orders`,
    { shipping }, // se enviam costo de envio al backend
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.order;
};

// Crear preferencia de Mercado Pago
export const createPreference = async (orderId, token) => {
  const res = await axios.post(
    `${PAYMENTS_URL}/create_preference`,
    { orderId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// (Opcional) Registrar pago
export const createPayment = async (paymentData) => {
  const res = await fetch(`${PAYMENTS_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });

  if (!res.ok) throw new Error("Error al registrar pago");
  return res.json();
};

*/


// src/services/paymentService.js
import axios from "axios";

// URL
const API_BASE = `${import.meta.env.VITE_API_URL}/api`;
const PAYMENTS_URL = `${API_BASE}/payments`;


//Crear pedido + shipping (costo de envio)

export const createOrder = async (token, shipping = 0) => {
  const res = await axios.post(
    `${API_BASE}/orders`,
    { shipping }, // se enviam costo de envio al backend
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.order;
};

// Crear preferencia de Mercado Pago
export const createPreference = async (orderId, token) => {
  const res = await axios.post(
    `${PAYMENTS_URL}/create_preference`,
    { orderId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// (Opcional) Registrar pago
export const createPayment = async (paymentData) => {
  const res = await fetch(`${PAYMENTS_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });

  if (!res.ok) throw new Error("Error al registrar pago");
  return res.json();
};