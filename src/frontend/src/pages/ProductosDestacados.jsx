import React, { useEffect, useState } from "react";
import ProductoCard from "../components/ProductCard";
import VerTodosButton from "../components/ButtonReu";

function ProductosDestacados() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // 🔹 Solo mostramos los primeros 5 productos
  const productosDestacados = productos.slice(0, 5);

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
      <p className="text-gray-600 mb-10">
        Descubre los últimos modelos de celulares con la mejor tecnología y
        precios increíbles
      </p>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {productos.length > 0 ? (
          productosDestacados.map((product) => (
            <ProductoCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500">Cargando productos...</p>
        )}
      </div>

      {/* Botón reutilizable */}
      <div className="mt-10">
        <VerTodosButton />
      </div>
    </section>
  );
}

export default ProductosDestacados;
