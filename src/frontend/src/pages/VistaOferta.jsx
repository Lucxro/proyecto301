import { useEffect, useState } from "react";
import OfferCard from "../components/OfferCard";
import { Gift, Zap, Percent, Clock } from "lucide-react";
import Footer from "./Footer";

function VistaOferta() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error("Error al cargar ofertas:", err));
  }, []);

  return (
    <>
      <div className="mt-24 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
          Ofertas Especiales
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Aprovecha nuestras mejores ofertas y descuentos exclusivos
        </p>

        {/* Ofertas limitadas */}
        <div className="flex items-center gap-2 mb-5">
          <Clock className="text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Ofertas por Tiempo Limitado
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Promociones activas */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Promociones Activas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <Gift className="mx-auto text-purple-600 mb-3" size={40} />
            <h3 className="font-semibold text-lg">2x1 en Accesorios</h3>
            <p className="text-gray-500 mt-1">
              Compra cualquier celular y llévate 2 accesorios por el precio de 1
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <Zap className="mx-auto text-blue-600 mb-3" size={40} />
            <h3 className="font-semibold text-lg">Envío Gratis</h3>
            <p className="text-gray-500 mt-1">
              Envío gratuito en compras mayores a $500
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <Percent className="mx-auto text-green-600 mb-3" size={40} />
            <h3 className="font-semibold text-lg">Descuento por Volumen</h3>
            <p className="text-gray-500 mt-1">
              15% de descuento adicional comprando 2 o más celulares
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-blue-50 py-10 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            ¡No te pierdas nuestras ofertas!
          </h3>
          <p className="text-gray-500 mb-4">
            Suscríbete a nuestro newsletter y recibe las mejores ofertas
            directamente en tu email
          </p>
          <form className="flex justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="border border-gray-300 rounded-xl px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VistaOferta;
