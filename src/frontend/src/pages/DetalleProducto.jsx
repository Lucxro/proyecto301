import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerProducto();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!producto) return <p className="text-center mt-10">Producto no encontrado.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Imagen del producto */}
      <div className="flex justify-center items-center bg-gray-50 rounded-xl p-6 shadow-md">
        <img
          src={
            producto.imageUrl
              ? `http://localhost:3000${producto.imageUrl}`
              : "/placeholder.jpg"
          }
          alt={producto.name}
          className="object-contain h-96 w-full rounded-lg bg-white"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
      </div>

      {/* Información del producto */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {producto.name}
          </h1>
          <p className="text-gray-600 mb-3">{producto.description}</p>

          <div className="text-sm text-gray-500 space-y-1">
            {producto.marca && (
              <p>
                <strong>Marca:</strong> {producto.marca}
              </p>
            )}
            {producto.ram && (
              <p>
                <strong>RAM:</strong> {producto.ram}
              </p>
            )}
            {producto.almacenamiento && (
              <p>
                <strong>Almacenamiento:</strong> {producto.almacenamiento}
              </p>
            )}
            {producto.sistema && (
              <p>
                <strong>Sistema:</strong> {producto.sistema}
              </p>
            )}
            {producto.stock !== undefined && (
              <p>
                <strong>Stock:</strong>{" "}
                {producto.stock > 0 ? producto.stock : "Agotado"}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ${producto.price?.toFixed(2)}
          </span>
          {producto.oldPrice && (
            <span className="text-gray-400 line-through">
              ${producto.oldPrice}
            </span>
          )}
        </div>

        <div className="mt-5 flex gap-4">
          <button
            onClick={() => addToCart(producto)}
            disabled={producto.stock === 0}
            className={`flex items-center gap-2 rounded-lg px-5 py-2 text-white font-medium transition ${
              producto.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={18} />
            {producto.stock === 0 ? "Agotado" : "Agregar al carrito"}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg px-5 py-2 border text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} /> Volver
          </button>
        </div>
      </div>
    </div>
  );
}

