// src/pages/PaymentSuccess.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentSuccess(){
  const loc = useLocation();
  useEffect(()=> {
    console.log("Volvimos de MP:", loc.search);
    // Opcional: llamar a backend para confirmar orderId/mostrar detalles
  }, [loc]);
  return (
    <div className="container">
      <h2>Pago exitoso 🎉</h2>
      <p>Gracias por tu compra. En breve procesaremos tu pedido.</p>
    </div>
  );
}
