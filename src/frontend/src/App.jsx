import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginError from "./pages/LoginError";
import ProductosVista from "./pages/ProductosVista";

function App() {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/productos-vista"
          element={<ProductosVista token={token} handleLogout={handleLogout} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
