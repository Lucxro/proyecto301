import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductosVista from "./pages/ProductosVista";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./pages/Navbar";
import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";
import CarritoVista from "./pages/CarritoVista";
import Checkout from "./pages/Checkout"; 

// 👇 Importa react-hot-toast
import { Toaster } from "react-hot-toast";

function App() {
  const { token, login, logout, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const hideNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    const message = params.get("message");

    if (tokenParam) {
      login(tokenParam);
      navigate("/", { replace: true });
    }
    if (message && location.pathname === "/login") {
      alert("Error al iniciar sesión: " + message);
      navigate("/login", { replace: true });
    }
  }, [location.search, location.pathname, login, navigate]);

  if (loading) return <div>Cargando...</div>;

  return (
    <CartProvider>
      <CompareProvider>
        {shouldShowNavbar && <Navbar token={token} onLogout={handleLogout} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" replace />}
          />
          <Route path="/carrito" element={<CarritoVista />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productos-vista" element={<ProductosVista />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#2563eb",
              color: "#fff",
              borderRadius: "10px",
              padding: "10px 16px",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#fff",
                secondary: "#2563eb",
              },
            },
            error: {
              style: {
                background: "#dc2626", 
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#dc2626",
              },
            },
          }}
        />
      </CompareProvider>
    </CartProvider>
  );
}

export default App;
