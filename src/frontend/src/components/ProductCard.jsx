import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import { ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useCompare();
  const [showOverlay, setShowOverlay] = useState(false);

  if (!product) return null;

  const handleCompare = () => {
    addToCompare(product);
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 2000); // 2 segundos de superposición
  };

  const enComparacion = isInCompare(product.id);

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
    <div className="rounded-2xl shadow p-4 bg-white relative flex flex-col justify-between h-full">
      {/* Etiquetas */}
      {product.oferta && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
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
            <span className="text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>

        {/* Botones */}
        <div className="mt-3 flex justify-center gap-2">
          <button
            onClick={handleCompare}
            className={`flex items-center gap-1 border rounded-lg px-3 py-1 text-sm transition ${
              enComparacion
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-800"
            }`}
          >
            {enComparacion ? "En comparación ✅" : "Comparar ⚖️"}
          </button>
          <button
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
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

      {/* Overlay de confirmación */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl animate-fadeIn">
          <p className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md font-medium">
            ¡Producto agregado a comparación!
          </p>
        </div>
      )}
    </div>
  );
}

