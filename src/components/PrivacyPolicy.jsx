//src/components/PrivacyPolicy.jsx
import React from "react";
import "./../styles/legal.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <h1>Política de Privacidad</h1>
      <p><strong>Fecha de entrada en vigor:</strong> 19 de noviembre de 2024</p>

      <p>
        En <strong>Electrónica Digital MX</strong> nos comprometemos a proteger tu privacidad y garantizar
        la seguridad de tus datos personales. Esta política describe cómo recopilamos, usamos, almacenamos
        y protegemos la información que compartes con nosotros.
      </p>

      <h3>1. Información que recopilamos</h3>
      <p>Podemos recopilar las siguientes categorías de información:</p>

      <ul>
        <li><strong>Información personal proporcionada por el usuario:</strong> Nombre, dirección, correo electrónico, número de teléfono, entre otros.</li>
        <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo, y datos sobre tu uso de nuestro sitio o aplicación.</li>
        <li><strong>Datos de navegación y cookies:</strong> Información sobre tus preferencias, comportamiento de navegación y tiempos de sesión.</li>
      </ul>

      <h3>2. Cómo usamos tu información</h3>
      <p>La información recopilada se utiliza para los siguientes fines:</p>
      <ul>
        <li>Brindar y personalizar los servicios ofrecidos.</li>
        <li>Enviar actualizaciones, promociones o notificaciones relevantes.</li>
        <li>Mejorar la experiencia del usuario en nuestra plataforma.</li>
        <li>Cumplir con requisitos legales o normativos.</li>
      </ul>

      <h3>3. Cómo compartimos tu información</h3>
      <p>No compartiremos tu información personal con terceros, salvo en los siguientes casos:</p>
      <ul>
        <li>Con proveedores de servicios confiables que actúan en nuestro nombre.</li>
        <li>Cuando sea requerido por ley o para proteger nuestros derechos legales.</li>
      </ul>

      <h3>4. Seguridad de la información</h3>
      <p>
        Implementamos medidas técnicas y organizativas para proteger tus datos contra accesos no autorizados,
        pérdida o uso indebido. Estas incluyen:
      </p>
      <ul>
        <li>Cifrado de datos.</li>
        <li>Acceso restringido a la información.</li>
        <li>Monitoreo constante de nuestros sistemas.</li>
      </ul>

      <h3>5. Tus derechos</h3>
      <p>Tienes derecho a:</p>
      <ul>
        <li>Acceder, corregir o eliminar tus datos personales.</li>
        <li>Retirar tu consentimiento para el procesamiento de tus datos.</li>
        <li>
          Presentar una queja ante las autoridades competentes si consideras que se ha vulnerado tu privacidad.
        </li>
      </ul>
      <p>Para ejercer estos derechos, puedes contactarnos en: <strong>edmxrecepcion@gmail.com</strong>.</p>

      <h3>6. Uso de cookies</h3>
      <p>
        Nuestro sitio utiliza cookies para mejorar tu experiencia. Puedes administrar las preferencias de cookies
        desde la configuración de tu navegador.
      </p>

      <h3>7. Cambios a esta política</h3>
      <p>
        Nos reservamos el derecho de actualizar esta política de privacidad. Las modificaciones serán publicadas
        en esta página con una fecha de actualización revisada.
      </p>

      <h3>Contacto</h3>
      <p>
        Si tienes preguntas o inquietudes sobre esta política, contáctanos:
        <br />
        <strong>Correo electrónico:</strong> edmxrecepcion@gmail.com
        <br />
        <strong>Teléfono:</strong> 722 706 0068
      </p>
    </div>
  );
}
