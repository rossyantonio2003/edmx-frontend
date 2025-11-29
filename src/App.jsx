/*
//App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
//import MyOrders from "./pages/MyOrders";

// Context
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

//Pages públicas
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CheckoutPage from "./pages/CheckoutPage";
import Profile from "./pages/Profile";

//rutas nuevas para redirigir lo de mercado pago 21-11-2025
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import PaymentPending from "./pages/PaymentPending";


//Admin Layout y Pages
import AdminPanelLayout from "./layouts/AdminPanelLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import OrdersPage from "./pages/admin/OrdersPage";
import UsersPage from "./pages/admin/UsersPage";

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/catalogo/:categoria" element={<Catalog />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/terminos" element={<TermsAndConditions />} />
                <Route path="/privacidad" element={<PrivacyPolicy />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failure" element={<PaymentFailure />} />
                <Route path="/payment-pending" element={<PaymentPending />} />


                 <Route path="/admin" element={<AdminPanelLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="users" element={<UsersPage />} />
                </Route>
              </Routes>
            </main>
            <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
*/

//App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Context
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

//Pages públicas
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CheckoutPage from "./pages/CheckoutPage";
import Profile from "./pages/Profile";

//rutas nuevas para redirigir lo de mercado pago 21-11-2025
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import PaymentPending from "./pages/PaymentPending";


//Admin Layout y Pages
import AdminPanelLayout from "./layouts/AdminPanelLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import OrdersPage from "./pages/admin/OrdersPage";
import UsersPage from "./pages/admin/UsersPage";

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/catalogo/:categoria" element={<Catalog />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/terminos" element={<TermsAndConditions />} />
                <Route path="/privacidad" element={<PrivacyPolicy />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failure" element={<PaymentFailure />} />
                <Route path="/payment-pending" element={<PaymentPending />} />


                <Route path="/admin" element={<AdminPanelLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="users" element={<UsersPage />} />
                </Route>
              </Routes>
            </main>
            <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
