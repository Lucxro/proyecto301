import React from "react";

function OfertaBadge() {
  return (
    <div className="absolute top-10 right-10 bg-red-600 text-white px-4 py-2 text-sm font-bold rounded">
      Oferta
    </div>
  );
}

function ProductoCard({ producto }) {
  return (
    <div className="relative bg-white shadow-md rounded-xl p-5 hover:scale-105 transition duration-300">
      <img
        src={producto.img}
        alt={producto.name}
        className="w-full h-48 object-contain rounded-lg mb-4 bg-white"
        crossOrigin="anonymous"
      />
      {producto.oferta && <OfertaBadge />}
      <h3 className="text-lg font-semibold">{producto.name}</h3>
      <p className="text-blue-600 font-bold">{producto.price}</p>
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transform hover:scale-105 transition duration-300">
        Ver Detalles
      </button>
    </div>
  );
}

export default ProductoCard;
