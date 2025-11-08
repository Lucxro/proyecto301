import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductCard from "../components/ProductCard";

function ProductosVista({ token, handleLogout }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar token={token} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nuestros Productos
        </h2>

        {/* Contenedor responsivo y centrado */}
        <div
          className="
            grid 
            grid-cols-[repeat(auto-fit,minmax(280px,1fr))] 
            gap-8 
            justify-items-center"
        >
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductosVista;
