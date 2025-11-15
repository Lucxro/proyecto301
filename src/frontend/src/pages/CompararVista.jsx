import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Footer from "./Footer";

export default function CompararVista() {
  const { compareList, addToCompare, removeFromCompare, clearCompare } = useCompare();
  const [allProducts, setAllProducts] = useState([]);

  // Cargar todos los productos desde la API
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  //  Usar addToCompare del contexto en lugar de modificar el array directamente
  const handleAddProduct = (id) => {
    const product = allProducts.find((p) => p.id === parseInt(id));
    if (product) addToCompare(product);
  };

  const campos = [
    ["Sistema Operativo", "sistema"],
    ["Almacenamiento", "almacenamiento"],
    ["Memoria RAM", "ram"],
    ["Cámara", "camara"],
    ["Batería", "bateria"],
    ["Pantalla", "pantalla"],
    ["Precio", "price"],
    ["Disponibilidad", "disponibilidad"],
    ["Calificación", "rating"],
  ];

  return (
    <>
      <div className="mt-16 p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
            Comparar Productos
          </h1>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                <Trash2 size={18} /> Limpiar Comparación
              </button>
            )}
            <Link
              to="/productos-vista"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>

        {/* Agregar producto manualmente */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <label className="font-semibold text-lg block mb-2">
            Agregar producto a la comparación:
          </label>
          <select
            className="border p-3 rounded-xl w-full md:w-1/2"
            onChange={(e) => handleAddProduct(e.target.value)}
            defaultValue=""
          >
            <option value="">Selecciona un producto</option>
            {allProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Productos seleccionados */}
        {compareList.length === 0 ? (
          <div className="text-center text-gray-600 mt-16">
            <p className="text-lg mb-3">No hay productos para comparar 😢</p>
            <Link
              to="/productos-vista"
              className="text-blue-600 hover:underline font-medium"
            >
              Explora productos para añadir a la comparación
            </Link>
          </div>
        ) : (
          <>
            {/* Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {compareList.map((p) => (
                <div
                  key={p.id}
                  className="bg-white shadow rounded-2xl p-4 relative flex flex-col items-center transition-transform hover:scale-[1.02]"
                >
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                  <img
                    src={
                      p.imageUrl
                        ? p.imageUrl.startsWith("http")
                          ? p.imageUrl
                          : `http://localhost:3000/${p.imageUrl.replace(/^\//, "")}`
                        : "/placeholder.jpg"
                    }
                    alt={p.name}
                    className="h-40 object-contain mb-4"
                  />
                  <h3 className="font-semibold text-center text-gray-800 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-yellow-500 text-sm mb-2">
                    ⭐ {p.rating || "N/A"}
                  </p>
                  <p className="font-bold text-gray-900">${p.price}</p>
                </div>
              ))}
            </div>

            {/* Tabla comparativa */}
            <div className="overflow-x-auto bg-white shadow rounded-2xl">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 font-semibold text-gray-800 text-lg border-b">
                      Característica
                    </th>
                    {compareList.map((p) => (
                      <th
                        key={p.id}
                        className="p-4 font-semibold text-center border-b text-gray-700"
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campos.map(([label, key]) => (
                    <tr key={key} className="border-b">
                      <td className="p-3 font-medium bg-gray-50">{label}</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3 text-center">
                          {key === "price" ? `$${p[key]}` : p[key] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}

                  <tr className="border-b">
                    <td className="p-3 font-medium bg-gray-50">Descripción</td>
                    {compareList.map((p) => (
                      <td
                        key={p.id}
                        className="p-3 text-gray-600 text-sm text-center"
                      >
                        {p.description || p.detalles || "-"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
