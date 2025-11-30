// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";
import {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress
} from "../services/addressService";
import { getMyOrders } from "../services/orderService";

import "../Styles/profile.css";

export default function Profile() {

  // Traducción del método de pago
  const translatePaymentMethod = (method) => {
    if (!method) return "No especificado";
    const map = {
      "mercadopago": "Mercado Pago",
      "card": "Tarjeta",
      "cash": "Efectivo",
    };
    return map[method] || method;
  };

  // Traducción del estado del pedido
  const translateOrderStatus = (status) => {
    const map = {
      pending: "Pendiente",
      paid: "Pagado",
      processing: "Procesando",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
    };
    return map[status] || status;
  };

  // Traducción del estado del pago
  const translatePaymentStatus = (status) => {
    const map = {
      pending: "Pendiente",
      approved: "Aprobado",
      rejected: "Rechazado",
      cancelled: "Cancelado",
      refunded: "Reembolsado",
      in_process: "En proceso",
    };
    return map[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
      case "paid":
        return "text-green-600 font-semibold";
      case "pending":
      case "in_process":
        return "text-yellow-600 font-semibold";
      case "cancelled":
      case "rejected":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600 font-semibold";
    }
  };



  //-------------------- ESTADOS DE USUARIO --------------------
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  //-------------------- ESTADOS DE DIRECCIÓN --------------------
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(false);

  // -------------------- ESTADOS DE PEDIDOS --------------------
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  //-------------------- VALIDACIONES --------------------
  const [addressErrors, setAddressErrors] = useState({});

  //-------------------- TOAST Y MENSAJES --------------------
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [activeTab, setActiveTab] = useState("personal");
  const token = localStorage.getItem("token");

  //-------------------- CARGAR PERFIL --------------------
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const res = await getProfile(token);
      if (res.error) setError(res.message);
      else setUser(res.user || res);
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  //-------------------- CARGAR DIRECCIÓN --------------------
  useEffect(() => {
    const fetchAddress = async () => {
      setAddressLoading(true);
      const res = await getAddress(token);

      if (res.error || !res.address) {
        setAddress(null);
      } else {
        setAddress(res.address);
      }

      setAddressLoading(false);
    };
    fetchAddress();
  }, [token]);

  // -------------------- CARGAR PEDIDOS (usa service existente) --------------------
  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      setOrders([]);
      try {
        if (!token) {
          console.warn("No token — el usuario no está logueado");
          setLoadingOrders(false);
          return;
        }

        const data = await getMyOrders(token); // usa orderService -> correcta URL backend

        // getMyOrders devuelve array (según tu backend). Aseguramos formato:
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else if (data && data.error) {
          console.error("Error desde el servicio de pedidos:", data.message || data);
          setOrders([]);
        } else {
          // Fallback: si backend devolvió un objeto pedido singular
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        // Aquí atrapamos cualquier error (network, JSON, CORS, etc.)
        console.error("Error al cargar pedidos:", err);
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [token]);

  //-------------------- HANDLERS PERFIL --------------------
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await updateProfile(token, {
      name: user.name,
      email: user.email,
    });

    if (res.error) {
      setError(res.message);
    } else {
      setMessage(res.msg || "Perfil actualizado correctamente");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setEditing(false);
    }
  };

  //-------------------- VALIDACIONES DIRECCIÓN --------------------
  const validators = {
    telefono: /^[0-9]{10}$/,
    soloNumeros: /^[0-9]+$/,
    numeroInterior: /^([0-9]+|SN|sn)?$/,
    soloLetras: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/,
    calle: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ #.\-]+$/
  };

  const validateField = (name, value) => {
    let err = "";
    switch (name) {
      case "telefono":
        if (!validators.telefono.test(value)) err = "Debe tener 10 dígitos.";
        break;
      case "calle":
        if (!validators.calle.test(value)) err = "La calle no permite caracteres inválidos.";
        break;
      case "numero_exterior":
        if (!validators.soloNumeros.test(value)) err = "Solo números.";
        break;
      case "numero_interior":
        if (!validators.numeroInterior.test(value)) err = 'Use solo números o "SN".';
        break;
      case "colonia":
      case "ciudad":
      case "estado":
        if (!validators.soloLetras.test(value)) err = "Solo letras.";
        break;
      case "codigo_postal":
        if (!/^\d{5}$/.test(value)) err = "Debe tener exactamente 5 números.";
        break;
      default:
        break;
    }
    setAddressErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    validateField(name, value);
  };

  const validateAddress = () => {
    for (const k in addressErrors) if (addressErrors[k]) return "Corrige los errores antes de continuar.";
    return null;
  };

  //-------------------- GUARDAR DIRECCIÓN --------------------
  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validateAddress();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = { ...address, pais: "México" };

    let res;
    if (address?.id) res = await updateAddress(payload, token);
    else res = await createAddress(payload, token);

    if (res.error) {
      setError(res.message);
    } else {
      setMessage("Dirección guardada correctamente");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setEditingAddress(false);
    }
  };

  //-------------------- ELIMINAR DIRECCIÓN --------------------
  const handleDeleteAddress = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar tu dirección?")) return;

    const res = await deleteAddress(token);

    if (res.error) {
      setError(res.message);
    } else {
      setMessage("Dirección eliminada correctamente");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      setAddress(null);
      setEditingAddress(false);
    }
  };

  // Toggle expand order to show items
  const toggleOrder = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (loading || addressLoading) return <p className="loading">Cargando...</p>;

  return (
    <>
      {showToast && <div className="toast-popup fade-in-out">{message}</div>}

      <div className="profile-page">
        {/* --- LATERAL --- */}
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : "👤"}</div>
            <div>
              <h3>{user.name || "Usuario"}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <ul className="profile-menu">
            <li className={activeTab === "personal" ? "active" : ""} onClick={() => setActiveTab("personal")}>
              DATOS PERSONALES
            </li>

            <li className={activeTab === "address" ? "active" : ""} onClick={() => setActiveTab("address")}>
              INFORMACIÓN DE DOMICILIO
            </li>

            <li className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
              MIS PEDIDOS
            </li>
          </ul>
        </aside>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="profile-content">
          {error && <p className="error-msg">{error}</p>}

          {/* PERFIL */}
          {activeTab === "personal" && (
            <>
              {!editing ? (
                <div className="profile-card fade-in">
                  <h2>INFORMACIÓN DE LA CUENTA</h2>
                  <p><strong>Nombre:</strong> {user.name}</p>
                  <p><strong>Correo:</strong> {user.email}</p>
                  <p><strong>Rol:</strong> {user.role === "admin" ? "Administrador" : "Cliente"}</p>

                  <button className="btn btn-edit" onClick={() => setEditing(true)}>Editar Cuenta</button>
                </div>
              ) : (
                <form onSubmit={handleSubmitProfile} className="profile-form fade-in">
                  <h2>EDITAR PERFIL</h2>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} required />
                  </div>

                  <div className="profile-buttons">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" className="btn btn-cancel" onClick={() => setEditing(false)}>Cancelar</button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* DIRECCIÓN */}
          {activeTab === "address" && (
            <div className="profile-card fade-in">
              <h2>INFORMACIÓN DE DOMICILIO</h2>

              {!address && !editingAddress && (
                <>
                  <p>No has agregado una dirección aún.</p>
                  <button className="btn btn-primary" onClick={() => {
                    setEditingAddress(true);
                    setAddress({
                      calle: "", numero_exterior: "", numero_interior: "",
                      colonia: "", ciudad: "", estado: "", codigo_postal: "",
                      pais: "México", referencia: "", telefono: ""
                    });
                  }}>Agregar Dirección</button>
                </>
              )}

              {address && !editingAddress && (
                <>
                  <div className="address-box">
                    <p><strong>Teléfono:</strong> {address.telefono}</p>
                    <p><strong>Dirección:</strong> {address.calle} #{address.numero_exterior}{address.numero_interior ? ` Int. ${address.numero_interior}` : ""}</p>
                    <p><strong>Colonia:</strong> {address.colonia}</p>
                    <p><strong>Ciudad:</strong> {address.ciudad}</p>
                    <p><strong>Estado:</strong> {address.estado}</p>
                    <p><strong>Código postal:</strong> {address.codigo_postal}</p>
                    <p><strong>Referencia:</strong> {address.referencia}</p>
                  </div>

                  <div className="profile-buttons">
                    <button className="btn btn-edit" onClick={() => setEditingAddress(true)}>Editar Dirección</button>
                    <button className="btn btn-cancel" onClick={handleDeleteAddress}>Eliminar Dirección</button>
                  </div>
                </>
              )}

              {editingAddress && (
                <form onSubmit={handleSubmitAddress} className="profile-form fade-in">
                  <h2>{address?.id ? "EDITAR DIRECCIÓN" : "Agregar dirección"}</h2>

                  {[
                    ["telefono", "Teléfono"],
                    ["calle", "Calle"],
                    ["numero_exterior", "Número exterior"],
                    ["numero_interior", "Número interior"],
                    ["colonia", "Colonia"],
                    ["ciudad", "Ciudad / Municipio"],
                    ["estado", "Estado"],
                    ["codigo_postal", "Código postal"],
                    ["referencia", "Referencia"],
                  ].map(([field, label]) => (
                    <div className="form-group" key={field}>
                      <label>{label}</label>
                      <input type="text" name={field} value={address[field] || ""} onChange={handleAddressChange}
                        required={!["numero_interior", "referencia"].includes(field)}
                        className={addressErrors[field] ? "input-error" : ""} />
                      {addressErrors[field] && <small className="field-error">{addressErrors[field]}</small>}
                    </div>
                  ))}

                  <div className="profile-buttons">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" className="btn btn-cancel" onClick={() => setEditingAddress(false)}>Cancelar</button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* MIS PEDIDOS */}
          {activeTab === "orders" && (
            <div className="profile-card fade-in">
              <h2>MIS PEDIDOS</h2>

              {loadingOrders && <p>Cargando pedidos...</p>}

              {!loadingOrders && orders.length === 0 && (
                <p>No has realizado ningún pedido.</p>
              )}

              <div className="my-orders-container-profile">
                {orders.map(order => (
                  <div key={order.id} className="order-card-profile">

                    {/* HEADER DEL PEDIDO */}
                    <div className="order-header-profile">
                      <div className="order-header-left">
                        <p className="order-date-profile strong-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="order-status-group-profile">
                        {/* Estado del Pedido */}
                        <div className="badge-group-label">
                          <span className="badge-label">PEDIDO:</span>

                          <span className={`badge pedido ${order.status}`}>
                            {translateOrderStatus(order.status)}
                          </span>
                        </div>

                        {/* Estado del Pago */}
                        <div className="badge-group-label">
                          <span className="badge-label">PAGO:</span>

                          <span className={`badge pago ${order.payment?.estado_pago || "pendiente"}`}>
                            {translatePaymentStatus(order.payment?.estado_pago || "pendiente")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PRODUCTOS */}
                    <div className="order-items-profile">
                      {order.items.map(item => (
                        <div key={item.id} className="order-item-profile">
                          <img
                            src={`http://localhost:4000/uploads/${item.product?.image || ""}`}
                            alt={item.product?.name}
                            className="item-img-profile"
                          />

                          <div className="item-info-profile">
                            <p className="item-name-profile">{item.product?.name}</p>
                            <p className="item-qty-profile">Cantidad: {item.quantity}</p>
                            <p className="item-price-profile">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* TOTAL */}
                    <div className="order-total-profile">
                      <p>Envío: <strong>${order.shipping ?? 0}</strong></p>
                      <p>Total pagado: <strong>${order.total}</strong></p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
