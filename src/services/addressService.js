/*
// src/services/addressService.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/addresses";

export const getAddress = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("getAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};

export const createAddress = async (addressData, token) => {
  try {
    const res = await axios.post(API_URL, addressData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("createAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};

export const updateAddress = async (addressData, token) => {
  try {
    const res = await axios.put(API_URL, addressData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("updateAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};

export const deleteAddress = async (token) => {
  try {
    const res = await axios.delete(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("deleteAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};

*/


// src/services/addressService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/addresses`;

export const getAddress = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("getAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};

export const createAddress = async (addressData, token) => {
  try {
    const res = await axios.post(API_URL, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error("createAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};

export const updateAddress = async (addressData, token) => {
  try {
    const res = await axios.put(API_URL, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error("updateAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};

export const deleteAddress = async (token) => {
  try {
    const res = await axios.delete(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("deleteAddress error:", err?.response?.data || err.message);
    return { error: true, message: err?.response?.data?.message || err.message };
  }
};
