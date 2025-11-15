import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import Footer from "./Footer"; 

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

  if (loading)
    return (
      <p className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Cargando...
      </p>
    );

  if (!producto)
    return (
      <p className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Producto no encontrado.
      </p>
    );

  // 🔹 Calcular porcentaje de descuento si aplica
  const descuento =
    producto.oferta && producto.oldPrice
      ? Math.round(((producto.oldPrice - producto.price) / producto.oldPrice) * 100)
      : null;

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto mt-24 bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="relative flex justify-center items-center bg-gray-50 rounded-xl p-6 shadow-md">
            {producto.oferta && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                {descuento ? `-${descuento}%` : "Oferta"}
              </span>
            )}
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

          {/* Información */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{producto.name}</h1>
            <p className="text-gray-600 text-base leading-relaxed">{producto.description}</p>

            {/* 🔹 Características principales */}
            <div className="text-sm text-gray-700 space-y-1">
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
              {producto.pantalla && (
                <p>
                  <strong>Pantalla:</strong> {producto.pantalla}
                </p>
              )}
              {producto.camara && (
                <p>
                  <strong>Cámara:</strong> {producto.camara}
                </p>
              )}
              {producto.bateria && (
                <p>
                  <strong>Batería:</strong> {producto.bateria}
                </p>
              )}
              {producto.color?.length > 0 && (
                <p>
                  <strong>Colores:</strong> {producto.color.join(", ")}
                </p>
              )}
              {producto.stock !== undefined && (
                <p>
                  <strong>Stock:</strong>{" "}
                  {producto.stock > 0 ? producto.stock : "Agotado"}
                </p>
              )}
            </div>

            {/* 🔹 Detalles ampliados */}
            {producto.detalles && (
              <div className="mt-3 bg-gray-50 p-3 rounded-lg text-gray-700 text-sm">
                <strong>Detalles:</strong>
                <p className="mt-1">{producto.detalles}</p>
              </div>
            )}

            {/* 🔹 Precio */}
            <div className="mt-4 flex items-center gap-3">
              {producto.oferta && producto.oldPrice ? (
                <>
                  <span className="text-gray-400 line-through text-lg">
                    ${producto.oldPrice}
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    ${producto.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${producto.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* 🔹 Botones */}
            <div className="mt-6 flex gap-4">
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
      </div>

      <Footer />
    </>
  );
}
