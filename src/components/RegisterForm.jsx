//src/components/RegisterForm.jsx
import React, { useState, useContext } from "react";
import { Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/login.css";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

import slide1 from "../assets/logoedmx.png";
import slide2 from "../assets/logoedmx.png";

export default function RegisterForm() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await register({ name, email, password });

      if (res.user) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: `Bienvenido ${res.user.email}`,
          confirmButtonColor: "#6c5ce7",
          timer: 2000,
        });

        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: res.message || "Verifica los datos",
          confirmButtonColor: "#d63031",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
        confirmButtonColor: "#d63031",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-section">
      <div className="login-box">
        <div className="row w-100">
          {/* Formulario - izquierda */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h3 className="header-title">Crear cuenta</h3>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? "Registrando..." : "Registrar"}
                </button>
              </div>

              <div className="form-group text-center">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </div>
            </form>
          </div>

          {/* Carrusel - derecha */}
          <div className="col-md-6 d-flex align-items-center justify-content-center hide-on-mobile">
            <div className="carousel-container w-100 carousel-lila">
              <Carousel controls={false} indicators={false} fade interval={3000} pause={false}>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-img-fixed" src={slide1} alt="Cámara 1" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-img-fixed" src={slide2} alt="Cámara 2" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


