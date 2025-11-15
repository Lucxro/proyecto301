// src/components/OfferCard.jsx
import { Clock } from "lucide-react";

function OfferCard({ offer }) {
  const {
    title,
    description,
    image,
    price,
    oldPrice,
    discount,
    tag,
    tagColor,
    timeLeft,
  } = offer;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-56 object-contain rounded-t-xl bg-white p-2"
        />

        {tag && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-sm font-semibold rounded-full text-white ${tagColor}`}
          >
            {tag}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-gray-100 px-2 py-1 rounded-full text-sm font-semibold text-gray-600">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-blue-600 text-2xl font-bold">${price}</span>
          {oldPrice && (
            <span className="text-gray-400 line-through">${oldPrice}</span>
          )}
        </div>

        {timeLeft && (
          <div className="flex items-center text-red-500 text-sm mt-2">
            <Clock size={16} className="mr-1" />
            Termina en {timeLeft}
          </div>
        )}

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition">
          Comprar Ahora
        </button>
      </div>
    </div>
  );
}

export default OfferCard;
