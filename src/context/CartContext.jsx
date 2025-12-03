/*
//src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify"; //para notificaciones bonitas

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  //Cargar carrito al iniciar sesión
  useEffect(() => {
    if (user && token) fetchCart();
  }, [user, token]);

  //Obtener carrito actual desde backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener carrito");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //Agregar producto al carrito
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Error al agregar producto al carrito");
      await fetchCart(); // Refrescar carrito
      toast.success("Producto agregado al carrito 🛒");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo agregar el producto 😢");
    }
  };

  //Eliminar producto del carrito
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      await fetchCart();
      toast.info("Producto eliminado del carrito 🗑️");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el producto 😢");
    }
  };

  //Actualizar cantidad de producto
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await fetch("http://localhost:4000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Error al actualizar cantidad");
      await fetchCart();
      toast.info("Cantidad actualizada 🧮");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar la cantidad 😢");
    }
  };

  //Vaciar carrito completo
  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/cart/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al vaciar carrito");
      await fetchCart();
      toast.warn("Carrito vacio 🧹");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo vaciar el carrito 😢");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

codigo funcional pero redirigiendo a localhost:4000*/



//src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify"; //para notificaciones bonitas

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  //Cargar carrito al iniciar sesión
  useEffect(() => {
    if (user && token) fetchCart();
  }, [user, token]);

  //Obtener carrito actual desde backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener carrito");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //Agregar producto al carrito
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Error al agregar producto al carrito");
      await fetchCart(); // Refrescar carrito
      toast.success("Producto agregado al carrito 🛒");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo agregar el producto 😢");
    }
  };

  //Eliminar producto del carrito
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      await fetchCart();
      toast.info("Producto eliminado del carrito 🗑️");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el producto 😢");
    }
  };

  //Actualizar cantidad de producto
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Error al actualizar cantidad");
      await fetchCart();
      toast.info("Cantidad actualizada 🧮");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar la cantidad 😢");
    }
  };

  //Vaciar carrito completo
  const clearCart = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al vaciar carrito");
      await fetchCart();
      toast.warn("Carrito vacio 🧹");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo vaciar el carrito 😢");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);