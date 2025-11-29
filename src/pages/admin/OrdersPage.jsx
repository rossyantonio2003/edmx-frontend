
//src/pages/admin/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";
import "../../Styles/OrdersPage.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [filterEstado, setFilterEstado] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  // Traducciones
  const traducirEstadoPedido = (estado) => {
    const map = {
      pending: "Pendiente",
      paid: "Pagado",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
    };
    return map[estado] || estado;
  };

  const traducirEstadoPago = (estado) => {
    const map = {
      pending: "Pendiente",
      approved: "Aprobado",
      rejected: "Rechazado",
      refunded: "Reembolsado",
    };
    return map[estado] || estado;
  };

  // Cargar pedidos desde backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllOrders(token);
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        Swal.fire("Error", "No se pudieron cargar los pedidos.", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filtros
  useEffect(() => {
    let filtered = [...orders];

    if (filterEstado !== "todos") {
      filtered = filtered.filter((p) => p.status === filterEstado);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.id.toString().includes(term) ||
          (p.user?.name || "").toLowerCase().includes(term)
      );
    }

    setFilteredOrders(filtered);
  }, [filterEstado, searchTerm, orders]);

  const handleActualizarEstadoPedido = async (pedidoId) => {
    const pedido = orders.find((p) => p.id === pedidoId);
    if (!pedido) return;

    const opciones = {
      pending: "Pendiente",
      paid: "Pagado",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
    };

    const estados = Object.keys(opciones);

    const { value: nuevoEstado } = await Swal.fire({
      title: "Actualizar estado",
      input: "select",
      inputOptions: opciones,
      inputValue: pedido.status,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    });

    if (!nuevoEstado) return;

    try {
      await updateOrderStatus(pedidoId, nuevoEstado, token);
      Swal.fire("Actualizado", "Estado actualizado correctamente", "success");

      setOrders((prev) =>
        prev.map((o) =>
          o.id === pedidoId ? { ...o, status: nuevoEstado } : o
        )
      );
    } catch {
      Swal.fire("Error", "No se pudo actualizar el estado", "error");
    }
  };

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div className="admin-orders-container">

      <h2 className="titulo">Gestión de Pedidos</h2>

      <div className="top-bar">
        <select onChange={(e) => setFilterEstado(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagado</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregado</option>
          <option value="cancelled">Cancelado</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por ID o usuario..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Envío</th>
              <th>Estado Pedido</th>
              <th>Estado Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr className="no-results-row">
                <td colSpan="7">No se encontraron resultados</td>
              </tr>
            ) : (
              filteredOrders.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.user?.name}</td>
                  <td>${p.total}</td>
                  <td>${p.shipping}</td>
                  <td>
                    <span className={`estado ${p.status}`}>
                      {traducirEstadoPedido(p.status)}
                    </span>
                  </td>
                  <td>
                    <span className={`pago ${p.payment?.estado_pago || "pending"}`}>
                      {traducirEstadoPago(p.payment?.estado_pago || "pending")}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        className="btn-estado"
                        onClick={() => handleActualizarEstadoPedido(p.id)}
                      >
                        Actualizar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
