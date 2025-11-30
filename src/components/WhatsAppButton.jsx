// src/components/WhatsAppButton.jsx
import React, { useEffect, useState } from "react";
import "./../Styles/footer.css";

export default function WhatsAppButton() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 10000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showMessage && (
        <div className="whatsapp-bubble">
          ¿Requieres más información?
        </div>
      )}

      <a
        href="https://wa.me/527227060068"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>
    </>
  );
}
