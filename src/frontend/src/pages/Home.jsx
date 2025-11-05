import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import BannerCarousel from "./BannerCarousel";
import ProductosDestacados from "./ProductosDestacados";

function Home() {
  const [token, setToken] = useState(null);

  // Obtener token del localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar token={token} onLogout={handleLogout} />

      {/* Carrusel */}
      <section className="mt-16">
        <BannerCarousel />
      </section>

      {/* Productos destacados */}
      <ProductosDestacados />
    </div>
  );
}

export default Home;



