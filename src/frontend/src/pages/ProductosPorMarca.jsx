import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCardModern from "../components/ProductCardModern";

export default function ProductosPorMarca() {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter(
          (p) => p.marca?.toLowerCase() === nombre.toLowerCase()
        );
        setProductos(filtrados);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, [nombre]);

  return (
    <div className="mt-24">
      {/* 🔹 Botón de volver */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Productos de {nombre}
      </h2>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos de esta marca.</p>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {productos.map((product) => (
              <ProductCardModern key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
