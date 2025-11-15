import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import CompararVista from "./pages/CompararVista";
import MarcasVista from "./pages/MarcasVista";
import ProductosPorMarca from "./pages/ProductosPorMarca";
import SoporteVista from "./pages/SoporteVista";
import VistaOferta from "./pages/VistaOferta";
import LoginSuccess from "./pages/LoginSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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

    if (tokenParam && !token) {
      const name = params.get("name");
      const email = params.get("email");
      const avatar = params.get("avatar");

      const userData = { name, email, avatar };

      login(tokenParam, userData);

      navigate("/", { replace: true });
      return; 
    }

    if (message && location.pathname === "/login") {
      alert("Error al iniciar sesión: " + message);
      navigate("/login", { replace: true });
    }
  }, [location.search, location.pathname, login, navigate, token]);

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
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/carrito" element={<CarritoVista />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productos-vista" element={<ProductosVista />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/comparar" element={<CompararVista />} />
          <Route path="/marcas" element={<MarcasVista />} />
          <Route path="/marca/:nombre" element={<ProductosPorMarca />} />
          <Route path="/soporte" element={<SoporteVista />} />
          <Route path="/ofertas" element={<VistaOferta />} />
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
