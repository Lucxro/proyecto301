import { Star, ShoppingCart, Scale, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";

export default function ProductCardModern({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const inCompare = isInCompare(product.id);

  const handleCompare = () => {
    if (inCompare) removeFromCompare(product.id);
    else addToCompare(product);
  };

  const handleView = () => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Imagen */}
      <div className="relative w-full h-52 bg-gray-50 flex items-center justify-center">
        <img
          src={
            product.imageUrl
              ? product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `http://localhost:3000/${product.imageUrl.replace(/^\//, "")}`
              : "/placeholder.jpg"
          }
          alt={product.name}
          className="object-contain h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 text-center">
        {/* Rating */}
        <div className="flex justify-center items-center gap-1 text-yellow-400">
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

        {/* Nombre */}
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">
          {product.almacenamiento} • {product.ram} • {product.sistema}
        </p>

        {/* Descripción breve */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Precio */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={handleView}
            className="flex items-center gap-1 border rounded-lg px-3 py-1 text-sm hover:bg-gray-100 text-gray-800"
          >
            <Eye size={16} /> Ver
          </button>

          <button
            onClick={handleCompare}
            className={`flex items-center gap-1 border rounded-lg px-3 py-1 text-sm transition ${
              inCompare
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            <Scale size={16} />
            {inCompare ? "En comparación" : "Comparar"}
          </button>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 rounded-lg px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingCart size={16} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
