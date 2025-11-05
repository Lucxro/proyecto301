import React from "react";
import ProductoCard from "../components/ProductCard";

import imgHuaweiP50 from "../assets/images/imagen-huawei-p50.jpg";
import imgSamsungZ from "../assets/images/samsung-z-flip7.jpeg";
import imgIphone14 from "../assets/images/iphone-14-pro-max.webp";

function ProductosDestacados() {
  const productos = [
    { name: "Huawei P50 Pro", price: "$1,199", img: imgHuaweiP50, oferta: false },
    { name: "Samsung Z Flip7", price: "$999", img: imgSamsungZ, oferta: false },
    { name: "Iphone 14 Pro Max", price: "$899", img: imgIphone14, oferta: true },
  ];

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
      <p className="text-gray-600 mb-10">
        Descubre los últimos modelos de celulares con la mejor tecnología y precios increíbles
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {productos.map((producto, index) => (
          <ProductoCard key={index} producto={producto} />
        ))}
      </div>
    </section>
  );
}

export default ProductosDestacados;
