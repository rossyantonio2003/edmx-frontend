//src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./../Styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white pt-4">
      <div className="container">
        <div className="row text-start">
          {/* Columna EDMX */}
          <div className="col-md-3 p-3">
            <h5>Electrónica Digital MX</h5>
            <p><i className="bi bi-geo-alt-fill"></i> Nos ubicamos en:</p>
            <p>Av. Prof, Heriberto Enríquez 606-B-Sur, Amp Lázaro Cárdenas, 50180 Toluca de Lerdo, Méx.</p>
            <a
              href="https://maps.app.goo.gl/jMCTdPgy5UkQYonw7"
              target="_blank"
              rel="noopener noreferrer"
              className="slider-btn mt-2"
            >
              Ir ahora!
            </a>
          </div>

          {/* Columna Contacto */}
          <div className="col-md-3 p-3">
            <h5>Contáctanos</h5>
            <p><i className="bi bi-telephone-fill"></i> Teléfono: <a href="https://wa.me/527227060068" className="text-white">722 706 0068</a></p>
            <p><i className="bi bi-envelope-fill"></i> Correo: <a href="mailto:edmxrecepcion2@gmail.com" className="text-white">edmxrecepcion2@gmail.com</a></p>
          </div>

          {/* Columna Privacidad */}
          <div className="col-md-3 p-3">
            <h5>Privacidad</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/terminos" className="text-white footer-link">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-white footer-link">
                  Políticas de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Social */}
          <div className="col-md-3 p-3">
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com/EDMXtoluca/?locale=es_LA" className="text-white footer-link"><i className="bi bi-facebook"></i> Facebook</a></li>
              <li><a href="https://www.facebook.com/EDMXtoluca/?locale=es_LA" className="text-white footer-link"><i className="bi bi-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>

        <hr className="bg-white" />
        <div className="text-center pb-3">
          <p>© 2025 Electrónica Digital MX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
