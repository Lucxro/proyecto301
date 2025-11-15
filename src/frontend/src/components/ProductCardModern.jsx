import { Star, ShoppingCart, Scale, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import toast from "react-hot-toast";

export default function ProductCardModern({ product }) {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare();

  const inCompare = isInCompare(product.id);

  const itemEnCarrito = cart.find((item) => item.id === product.id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.quantity : 0;
  const sinStock = product.stock === 0;
  const maxAlcanzado = cantidadEnCarrito >= product.stock;
  const isAgotado = sinStock || maxAlcanzado;

  const handleCompare = () => {
    if (inCompare) {
      removeFromCompare(product.id);
      toast.error("Eliminado de comparación ❌");
    } else {
      addToCompare(product);
      toast.success("Añadido a comparación ✅");
    }
  };

  const handleAddToCart = () => {
    if (isAgotado) {
      toast.error("No hay stock disponible 😢", {
        position: "bottom-right",
        style: {
          background: "#dc2626",
          color: "#fff",
          borderRadius: "10px",
          padding: "10px 15px",
        },
      });
      return;
    }

    addToCart(product);
    toast.success("Producto agregado al carrito 🛒", {
      position: "bottom-right",
      style: {
        background: "#2563eb",
        color: "#fff",
        borderRadius: "10px",
        padding: "10px 15px",
      },
    });
  };

  const handleView = () => navigate(`/producto/${product.id}`);

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border hover:border-blue-200">
      <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center">
        {product.oferta && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            Oferta
          </span>
        )}

        {isAgotado && (
          <span className="absolute top-3 right-3 bg-gray-700 bg-opacity-80 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            Agotado
          </span>
        )}

        <img
          src={
            product.imageUrl
              ? product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `http://localhost:3000/${product.imageUrl.replace(/^\//, "")}`
              : "/placeholder.jpg"
          }
          alt={product.name}
          className={`object-contain h-full transition-transform duration-300 ${
            isAgotado ? "opacity-50" : "hover:scale-105"
          }`}
        />
      </div>

      <div className="flex flex-col justify-between flex-grow p-4">
        <div className="flex justify-center items-center gap-1 text-yellow-400 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.round(product.rating || 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-gray-600 text-sm">({product.rating || 0})</span>
        </div>

        <h3 className="font-semibold text-base text-gray-800 leading-tight mb-1 text-center">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-1 text-center">
          {product.almacenamiento} • {product.ram} • {product.sistema}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3 text-center">
          {product.description}
        </p>

        <div className="flex justify-center items-center gap-2 mb-3">
          {product.oferta && product.oldPrice ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                ${product.oldPrice}
              </span>
              <span className="text-xl font-bold text-black">
                ${product.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAgotado}
          className={`w-full flex justify-center items-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-300 mb-3 ${
            isAgotado
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg"
          }`}
        >
          <ShoppingCart size={16} />
          {sinStock
            ? "Sin stock"
            : maxAlcanzado
            ? "Límite alcanzado"
            : "Agregar al carrito"}
        </button>

        <div className="flex justify-center gap-2">
          <button
            onClick={handleView}
            className="flex justify-center items-center gap-1 border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100 text-gray-800 transition w-full"
          >
            <Eye size={16} /> Ver
          </button>

          <button
            onClick={handleCompare}
            disabled={!inCompare && compareList.length >= 4}
            className={`flex justify-center items-center gap-1 border rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 w-full ${
              inCompare
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                : compareList.length >= 4
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <Scale size={16} />
            {inCompare
              ? "Comparando"
              : compareList.length >= 4
              ? "Límite ⚠️"
              : "Comparar"}
          </button>
        </div>
      </div>
    </div>
  );
}
