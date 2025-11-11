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
          <Route path="/productos-vista" element={<ProductosVista />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CompareProvider>
    </CartProvider>
  );
}

export default App;
