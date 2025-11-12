import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  if (!product) return null;

  const enComparacion = isInCompare(product.id);

  const handleCompare = () => {
    if (enComparacion) {
      removeFromCompare(product.id);
      toast.error(` ${product.name} eliminado de comparación`, {
        position: "bottom-right",
        style: {
          background: "#dc2626",
          color: "#fff",
          borderRadius: "10px",
          padding: "10px 15px",
        },
        icon: "⚖️",
      });
    } else {
      addToCompare(product);
      toast.success(`⚖️ ${product.name} agregado a comparación`, {
        position: "bottom-right",
        style: {
          background: "#2563eb",
          color: "#fff",
          borderRadius: "10px",
          padding: "10px 15px",
        },
      });
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart(product);
    toast.success(`🛒 ${product.name} agregado al carrito`, {
      position: "bottom-right",
      style: {
        background: "#2563eb",
        color: "#fff",
        borderRadius: "10px",
        padding: "10px 15px",
      },
    });
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={
            i <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      );
    }
    return <div className="flex gap-1 mt-1 justify-center">{stars}</div>;
  };

  return (
    <div className="rounded-2xl shadow p-4 bg-white relative flex flex-col justify-between h-full transition-transform duration-200 hover:scale-[1.02]">
      {/* Etiquetas */}
      {product.oferta && (
        <span className="absolute top-10 left-8 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          Oferta
        </span>
      )}
      {product.stock === 0 && (
        <span className="absolute top-3 right-3 bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-md">
          Agotado
        </span>
      )}

      {/* Imagen */}
      <div className="flex justify-center items-center h-48">
        <img
          src={`http://localhost:3000${product.imageUrl}`}
          alt={product.name}
          className="h-full object-contain rounded-lg"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col flex-grow justify-between text-center">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          {renderStars(product.rating)}
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        </div>

        {/* Precio */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="font-bold text-lg text-gray-800">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="mt-3 flex justify-center gap-2">
          <button
            onClick={handleCompare}
            className={`flex items-center gap-1 border rounded-lg px-3 py-1 text-sm transition font-medium ${
              enComparacion
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            {enComparacion ? "En comparación ✅" : "Comparar ⚖️"}
          </button>
          <button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className={`flex items-center gap-1 rounded-lg px-3 py-1 text-sm text-white ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <ShoppingCart size={16} />
            {product.stock === 0 ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

