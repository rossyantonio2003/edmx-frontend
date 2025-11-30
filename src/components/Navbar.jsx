//src/components/Navbar.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  Navbar as BsNavbar,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getCategories } from "../services/categoryService"; //Importar servicio de categorías
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext"; //importar contexto del carrito
import { FaShoppingCart } from "react-icons/fa"; //importar icono del carrito
import "./../Styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart(); //linea para el badge
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategories();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        {/* Logo + Nombre */}
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo EDMX"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          Electrónica Digital MX
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* --- USUARIO NO LOGUEADO --- */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <NavDropdown title="Productos" id="productos-dropdown">
                  {categorias.length === 0 ? (
                    <NavDropdown.Item disabled>
                      Sin categorías
                    </NavDropdown.Item>
                  ) : (
                    categorias.map((cat) => (
                      <NavDropdown.Item
                        key={cat.id}
                        as={Link}
                        to={`/catalogo/${cat.name.toLowerCase()}`}
                      >
                        {cat.name}
                      </NavDropdown.Item>
                    ))
                  )}
                </NavDropdown>
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrarse
                </Nav.Link>
              </>
            )}

            {/* --- USUARIO CLIENTE --- */}
            {user && user.role !== "admin" && (
              <>
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <NavDropdown title="Productos" id="productos-dropdown">
                  {categorias.length === 0 ? (
                    <NavDropdown.Item disabled>
                      Sin categorías
                    </NavDropdown.Item>
                  ) : (
                    categorias.map((cat) => (
                      <NavDropdown.Item
                        key={cat.id}
                        as={Link}
                        to={`/catalogo/${cat.name.toLowerCase()}`}
                      >
                        {cat.name}
                      </NavDropdown.Item>
                    ))
                  )}
                </NavDropdown>
                <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/checkout" className="position-relative ms-1">
                  <FaShoppingCart size={22} className="cart-icon" />
                  {cart.items?.length > 0 && (
                    <span
                      className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                    >
                      {cart.items.length}
                    </span>
                  )}
                </Nav.Link>

                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            )}

            {/* --- USUARIO ADMIN --- */}
            {user && user.role === "admin" && (
              <>
                <Nav.Link as={Link} to="/admin">Panel Admin</Nav.Link>
                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
