import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import BannerCarousel from "./BannerCarousel";
import ProductosDestacados from "./ProductosDestacados";
import Beneficios from "../components/Beneficios";
import Footer from "./Footer";

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
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Navbar token={token} onLogout={handleLogout} />

      {/* Carrusel */}
      <section className="mt-16">
        <BannerCarousel />
      </section>

      {/* Productos destacados */}
      <ProductosDestacados />

      {/*Beneficios */}
      <Beneficios/>

      <Footer/>
    </div>
  );
}

export default Home;



