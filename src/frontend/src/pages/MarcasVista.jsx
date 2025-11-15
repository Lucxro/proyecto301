import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function MarcasVista() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/products/brands/list")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error cargando marcas:", err));
  }, []);

  const handleClick = (brand) => navigate(`/marca/${encodeURIComponent(brand)}`);

  const getBrandImage = (brand) => {
    const basePath = `/images/brands/${brand.toLowerCase()}`;
    const formats = [".png", ".jpg", ".jpeg", ".webp"];
    for (const ext of formats) {
      const img = new Image();
      img.src = `${basePath}${ext}`;
      if (img.complete || img.height !== 0) return `${basePath}${ext}`;
    }
    return "/images/brands/default.png";
  };

  // Marcas destacadas
  const featuredBrands = ["Apple", "Samsung", "Google"];

  return (
    <>
      <div className="mt-24 mb-10 px-6">
        {/* 🔹 Botón de volver */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>

        {/* Encabezado principal */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Nuestras Marcas
        </h1>
        <p className="text-center text-gray-500 mb-16 text-lg">
          Descubre los mejores celulares de las marcas más reconocidas del mundo
        </p>

        {/* Sección de Marcas Destacadas */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Marcas Destacadas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBrands.map((brand) => (
              <div
                key={brand}
                onClick={() => handleClick(brand)}
                className="cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-28 h-28 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <img
                      src={getBrandImage(brand)}
                      alt={brand}
                      className="object-contain w-20 h-20"
                      onError={(e) => {
                        e.target.src = "/images/brands/default.png";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {brand}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Tecnología avanzada para todos los usuarios
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(brand);
                    }}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                  >
                    Ver Productos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Todas las Marcas */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Todas las Marcas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                onClick={() => handleClick(brand)}
                className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-between p-6 border border-gray-100 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={getBrandImage(brand)}
                      alt={brand}
                      className="object-contain w-10 h-10"
                      onError={(e) => {
                        e.target.src = "/images/brands/default.png";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{brand}</h3>
                    <p className="text-sm text-gray-500">Ver productos</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(brand);
                  }}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Ver
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
