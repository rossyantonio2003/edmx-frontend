/*
// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import "../Styles/home.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Servicios y beneficios (se quedan igual)
import serv1 from "../assets/serv1.png";
import serv2 from "../assets/serv2.png";
import serv3 from "../assets/serv3.png";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";

// Contextos
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Servicios
import { getProducts } from "../services/productService";

// Placeholder si no hay imagen (puedes cambiar a tu propio asset)
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial, sans-serif' font-size='18'%3ESin imagen%3C/text%3E%3C/svg%3E";

export default function Home() {
  const featuredRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToCart } = useCart();

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });

    // Cargar productos reales
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        // Si la API devuelve un objeto { products: [...] } ajusta aquí.
        const list = Array.isArray(data) ? data : data?.products || [];
        setFeaturedProducts(list.slice(0, 6)); // los primeros 6 productos
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };

    loadProducts();
  }, []);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Construye la URL de la imagen probando varias propiedades
  const resolveImageSrc = (prod) => {
    if (!prod) return PLACEHOLDER;
    // Si la API ya devuelve una URL absoluta
    if (prod.image && typeof prod.image === "string") {
      // si image contiene '/' o ext, asumimos nombre de archivo: /uploads/<image>
      if (prod.image.startsWith("http")) return prod.image;
      // si image tiene slash empezando por /uploads
      if (prod.image.startsWith("/")) return `http://localhost:4000${prod.image}`;
      return `http://localhost:4000/uploads/${prod.image}`;
    }
    // Si devuelven imageUrl (ej: /uploads/..)
    if (prod.imageUrl) {
      if (prod.imageUrl.startsWith("http")) return prod.imageUrl;
      return `http://localhost:4000${prod.imageUrl}`;
    }
    // Otros posibles campos (por seguridad)
    if (prod.image_path) return `http://localhost:4000${prod.image_path}`;
    if (prod.img) {
      if (prod.img.startsWith("http")) return prod.img;
      return `http://localhost:4000/uploads/${prod.img}`;
    }
    return PLACEHOLDER;
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      // Si se quiere que vaya primero a registro y después a login, usa /register
      navigate("/login");
      return;
    }

    try {
      await addToCart(productId, 1);
      // ir al carrito después de agregar
      navigate("/checkout");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <main className="home-container">
      {/* SLIDER */   /*}
      <div className="slider-container">
        <Slider />
        <div className="slider-text">
          <h1>ELECTRÓNICA DIGITAL MX</h1>
          <p>Cámaras de seguridad, GPS y más</p>
          <button onClick={scrollToFeatured} className="slider-btn">
            Comprar Ahora
          </button>
        </div>
      </div>

      {/* PRODUCTOS DESTACADOS */                  /*}
      <section ref={featuredRef} className="featured-products" data-aos="fade-up">
        <h2 className="section-title">Productos Destacados</h2>

        <div className="products-grid">
          {featuredProducts.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            featuredProducts.map((prod) => {
              const imgSrc = resolveImageSrc(prod);
              return (
                <div key={prod.id} className="product-card">
                  <img
                    src={imgSrc}
                    alt={prod.name || "Producto"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                  <h3>{prod.name}</h3>
                  <p className="price">${prod.price}</p>

                  <button
                    className="slider-btn"
                    onClick={() => handleAddToCart(prod.id)}
                  >
                    Agregar al carrito
                  </button>

                </div>
              );
            })
          )}
        </div>
      </section>

      {/* SERVICIOS */                              /*}
      <section className="services" data-aos="fade-up">
        <h2 className="section-title">Nuestros servicios</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src={serv2} alt="Venta" className="service-img" />
            <h3>Venta</h3>
            <p>
              Venta de cámaras de seguridad, GPS, Alarmas, Video porteros y paneles solares de alta calidad
            </p>
          </div>

          <div className="service-card">
            <img src={serv3} alt="Instalación" className="service-img" />
            <h3>Instalación</h3>
            <p>Instalación profesional para garantizar el mejor rendimiento.</p>
          </div>

          <div className="service-card">
            <img src={serv1} alt="Mantenimiento" className="service-img" />
            <h3>Mantenimiento y Soporte</h3>
            <p>Atención personalizada y soporte certificado.</p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */                  /*}
      <section className="benefits" data-aos="fade-up">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src={img1} alt="Envío rápido" className="service-img" />
            <h3>Envío rápido</h3>
            <p>Recibe tus productos rápido y seguro.</p>
          </div>

          <div className="service-card">
            <img src={img2} alt="Garantía" className="service-img" />
            <h3>Garantía</h3>
            <p>Todos nuestros productos cuentan con garantía oficial.</p>
          </div>

          <div className="service-card">
            <img src={img3} alt="Soporte técnico" className="service-img" />
            <h3>Soporte Técnico</h3>
            <p>Atención especializada para ayudarte siempre.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

*/



// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import "../Styles/home.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Servicios y beneficios (se quedan igual)
import serv1 from "../assets/serv1.png";
import serv2 from "../assets/serv2.png";
import serv3 from "../assets/serv3.png";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";

// Contextos
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Servicios
import { getProducts } from "../services/productService";

// Placeholder si no hay imagen
const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial, sans-serif' font-size='18'%3ESin imagen%3C/text%3E%3C/svg%3E";

export default function Home() {
  const featuredRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToCart } = useCart();

  const [featuredProducts, setFeaturedProducts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL; // ← ← ← aquí tomamos la URL global

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });

    const loadProducts = async () => {
      try {
        const data = await getProducts();
        const list = Array.isArray(data) ? data : data?.products || [];
        setFeaturedProducts(list.slice(0, 6));
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };

    loadProducts();
  }, []);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // SOLO SE ACTUALIZARON LAS URLS ↓↓↓↓↓
  const resolveImageSrc = (prod) => {
    if (!prod) return PLACEHOLDER;

    if (prod.image && typeof prod.image === "string") {
      if (prod.image.startsWith("http")) return prod.image;
      if (prod.image.startsWith("/")) return `${API_URL}${prod.image}`;
      return `${API_URL}/uploads/${prod.image}`;
    }

    if (prod.imageUrl) {
      if (prod.imageUrl.startsWith("http")) return prod.imageUrl;
      return `${API_URL}${prod.imageUrl}`;
    }

    if (prod.image_path) return `${API_URL}${prod.image_path}`;

    if (prod.img) {
      if (prod.img.startsWith("http")) return prod.img;
      return `${API_URL}/uploads/${prod.img}`;
    }

    return PLACEHOLDER;
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(productId, 1);
      navigate("/checkout");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <main className="home-container">
      <div className="slider-container">
        <Slider />
        <div className="slider-text">
          <h1>ELECTRÓNICA DIGITAL MX</h1>
          <p>Cámaras de seguridad, GPS y más</p>
          <button onClick={scrollToFeatured} className="slider-btn">
            Comprar Ahora
          </button>
        </div>
      </div>

      <section ref={featuredRef} className="featured-products" data-aos="fade-up">
        <h2 className="section-title">Productos Destacados</h2>

        <div className="products-grid">
          {featuredProducts.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            featuredProducts.map((prod) => {
              const imgSrc = resolveImageSrc(prod);
              return (
                <div key={prod.id} className="product-card">
                  <img
                    src={imgSrc}
                    alt={prod.name || "Producto"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                  <h3>{prod.name}</h3>
                  <p className="price">${prod.price}</p>

                  <button
                    className="slider-btn"
                    onClick={() => handleAddToCart(prod.id)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="services" data-aos="fade-up">
        <h2 className="section-title">Nuestros servicios</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src={serv2} alt="Venta" className="service-img" />
            <h3>Venta</h3>
            <p>
              Venta de cámaras de seguridad, GPS, Alarmas, Video porteros y paneles solares de alta calidad
            </p>
          </div>

          <div className="service-card">
            <img src={serv3} alt="Instalación" className="service-img" />
            <h3>Instalación</h3>
            <p>Instalación profesional para garantizar el mejor rendimiento.</p>
          </div>

          <div className="service-card">
            <img src={serv1} alt="Mantenimiento" className="service-img" />
            <h3>Mantenimiento y Soporte</h3>
            <p>Atención personalizada y soporte certificado.</p>
          </div>
        </div>
      </section>

      <section className="benefits" data-aos="fade-up">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src={img1} alt="Envío rápido" className="service-img" />
            <h3>Envío rápido</h3>
            <p>Recibe tus productos rápido y seguro.</p>
          </div>

          <div className="service-card">
            <img src={img2} alt="Garantía" className="service-img" />
            <h3>Garantía</h3>
            <p>Todos nuestros productos cuentan con garantía oficial.</p>
          </div>

          <div className="service-card">
            <img src={img3} alt="Soporte técnico" className="service-img" />
            <h3>Soporte Técnico</h3>
            <p>Atención especializada para ayudarte siempre.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

