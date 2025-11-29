//src/pages/Catalog.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import "../styles/catalog.css";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Catalog() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();


  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        const productosFiltrados = categoria
          ? data.filter(
            (p) =>
              p.category &&
              p.category.name.toLowerCase() === categoria.toLowerCase()
          )
          : data;

        setProductos(productosFiltrados);
      } catch (err) {
        console.error(err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  if (loading) return <div className="catalog-loading">Cargando productos...</div>;
  if (error) return <div className="catalog-error">{error}</div>;

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">
        {categoria
          ? `Productos de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`
          : "Catálogo de Productos"}
      </h2>

      {productos.length === 0 ? (
        <p className="no-products">No hay productos disponibles en esta categoría.</p>
      ) : (
        <div className="catalog-grid">
          {productos.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-img-container">
                <img
                  src={`http://localhost:4000/uploads/${p.image}`}
                  alt={p.name}
                  className="product-img"
                />
              </div>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-desc">{p.description}</p>
              <div className="price-container">
                <span className="product-price">${p.price?.toLocaleString()}</span>
                <button
                  className="btn-add-cart"
                  onClick={() => {
                    if (!user) {
                      navigate("/login"); //a que direccion envia primero o cambiarlo a "/register"
                      return;
                    }
                    addToCart(p.id);
                  }}
                >
                  Agregar al carrito
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
