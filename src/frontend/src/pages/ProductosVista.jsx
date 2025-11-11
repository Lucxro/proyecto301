import { useEffect, useState } from "react";
import ProductCardModern from "../components/ProductCardModern";

export default function ProductosVista() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerProductos();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Cargando productos...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Productos disponibles
      </h1>
      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <ProductCardModern key={producto.id} product={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
