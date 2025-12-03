/*
//src/components/CheckoutPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import "../Styles/checkout.css";

//imports para mercado pago
import { useAuth } from "../context/AuthContext";
import { createOrder, createPreference } from "../services/paymentService";


export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const shipping = cart.total > 5000 ? 0 : cart.items.length > 0 ? 150 : 0;
  const totalFinal = cart.total + shipping;
  const { token } = useAuth(); //para mercadoPago
  

  const handleMercadoPago = async () => {
    try {
      if (!token) {
        alert("Debes iniciar sesión para continuar.");
        return;
      }

      // 1. Crear pedido en backend + shipping (costo de envio)
      const order = await createOrder(token, shipping);

      // 2. Crear preferencia de Mercado Pago
      const pref = await createPreference(order.id, token);

      if (!pref.init_point) {
        alert("No se pudo generar el pago.");
        return;
      }

      // 3. Redirigir a checkout Pro (Mercado Pago)
      window.location.href = pref.init_point;
    } catch (error) {
      console.error("Error al procesar pago:", error);
      alert("Ocurrió un error al procesar tu pago.");
    }
  };

  return (
    <div className="checkout-page container">
      <h2 className="checkout-title">🛍️ Finalizar compra</h2>

      <div className="checkout-layout">
        {/* 🧾 Carrito */                      /*}
        <div className="checkout-items">
          {cart.items.length === 0 ? (
            <p className="empty-cart">
              Tu carrito está vacío 🛒<br />
              Agrega productos desde el catálogo para continuar.
            </p>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={`http://localhost:4000/uploads/${item.product.image}`}
                  alt={item.product.name}
                  className="cart-image"
                />
                <div className="cart-info">
                  <h4>{item.product.name}</h4>
                  <p className="cart-price">${item.product.price.toLocaleString()}</p>

                  <div className="cart-quantity-control">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      ➖
                    </button>
                    <span className="cart-qty mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      ➕
                    </button>
                  </div>

                  <p className="cart-subtotal">
                    Subtotal: ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>


        {/* 💳 Resumen */                      /*}
        <div className="checkout-summary">
          <h3>Resumen de pedido</h3>

          {cart.items.length === 0 ? (
            <p className="empty-summary">Aún no hay productos seleccionados.</p>
          ) : (
            <>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cart.total.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Envío:</span>
                <span>{shipping === 0 ? "Gratis" : `$${shipping}`}</span>
              </div>

              <div className="summary-row total">
                <span>Total:</span>
                <span>${totalFinal.toLocaleString()}</span>
              </div>

              <button
                className="btn btn-warning w-100 mt-3"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>

              <button className="btn btn-primary w-100 mt-2" onClick={handleMercadoPago}>
                Proceder al pago
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

*/


//src/components/CheckoutPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import "../Styles/checkout.css";

//imports para mercado pago
import { useAuth } from "../context/AuthContext";
import { createOrder, createPreference } from "../services/paymentService";


export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const shipping = cart.total > 5000 ? 0 : cart.items.length > 0 ? 150 : 0;
  const totalFinal = cart.total + shipping;
  const { token } = useAuth(); //para mercadoPago
  

  const handleMercadoPago = async () => {
    try {
      if (!token) {
        alert("Debes iniciar sesión para continuar.");
        return;
      }

      // 1. Crear pedido en backend + shipping (costo de envio)
      const order = await createOrder(token, shipping);

      // 2. Crear preferencia de Mercado Pago
      const pref = await createPreference(order.id, token);

      if (!pref.init_point) {
        alert("No se pudo generar el pago.");
        return;
      }

      // 3. Redirigir a checkout Pro (Mercado Pago)
      window.location.href = pref.init_point;
    } catch (error) {
      console.error("Error al procesar pago:", error);
      alert("Ocurrió un error al procesar tu pago.");
    }
  };

  return (
    <div className="checkout-page container">
      <h2 className="checkout-title">🛍️ Finalizar compra</h2>

      <div className="checkout-layout">
        {/* 🧾 Carrito */}
        <div className="checkout-items">
          {cart.items.length === 0 ? (
            <p className="empty-cart">
              Tu carrito está vacío 🛒<br />
              Agrega productos desde el catálogo para continuar.
            </p>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.product.image}`}
                  alt={item.product.name}
                  className="cart-image"
                />
                <div className="cart-info">
                  <h4>{item.product.name}</h4>
                  <p className="cart-price">${item.product.price.toLocaleString()}</p>

                  <div className="cart-quantity-control">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      ➖
                    </button>
                    <span className="cart-qty mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      ➕
                    </button>
                  </div>

                  <p className="cart-subtotal">
                    Subtotal: ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>


        {/* 💳 Resumen */}
        <div className="checkout-summary">
          <h3>Resumen de pedido</h3>

          {cart.items.length === 0 ? (
            <p className="empty-summary">Aún no hay productos seleccionados.</p>
          ) : (
            <>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cart.total.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Envío:</span>
                <span>{shipping === 0 ? "Gratis" : `$${shipping}`}</span>
              </div>

              <div className="summary-row total">
                <span>Total:</span>
                <span>${totalFinal.toLocaleString()}</span>
              </div>

              <button
                className="btn btn-warning w-100 mt-3"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>

              <button className="btn btn-primary w-100 mt-2" onClick={handleMercadoPago}>
                Proceder al pago
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}