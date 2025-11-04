import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import logo from "../assets/images/icon-celular-24px.svg";
import carritoIcon from "../assets/images/icon-carrito-compras-24px.svg";

function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const slides = [
    {
      title: "iPhone 15 Pro Max",
      subtitle: "Ahora con descuento especial",
      image:
        "https://cdn.tmobile.com/content/dam/t-mobile/ntm/iphone-15-pro-max/device-hero.jpg",
      btnText: "Ver Ofertas",
      bgColor: "bg-blue-900/80",
    },
    {
      title: "Samsung Galaxy S23 Ultra",
      subtitle: "Captura cada detalle con su cámara de 200MP",
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-ultra-s918-sm-s918bzgcmea-534086537",
      btnText: "Descubrir Más",
      bgColor: "bg-gray-900/80",
    },
    {
      title: "Google Pixel 8 Pro",
      subtitle: "La IA de Google al alcance de tu mano",
      image:
        "https://fdn2.gsmarena.com/vv/pics/google/google-pixel8-pro-1.jpg",
      btnText: "Explorar",
      bgColor: "bg-green-900/80",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🔹 Navbar */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">ALTech</span>
            <img src={logo} alt="Logo" className="h-6" />
          </div>

          <nav className="hidden md:flex space-x-6 text-gray-700">
            <Link to="#" className="hover:text-blue-600">Productos</Link>
            <Link to="#" className="hover:text-blue-600">Comparar</Link>
            <Link to="#" className="hover:text-blue-600">Marcas</Link>
            <Link to="#" className="hover:text-blue-600">Ofertas</Link>
            <Link to="#" className="hover:text-blue-600">Soporte</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Buscar celulares..."
              className="hidden md:block border rounded-lg px-3 py-1 text-sm"
            />
            {token ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Cerrar Sesión
              </button>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Registrarse
                </Link>
              </>
            )}
            <img src={carritoIcon} alt="Carrito" className="h-6 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* 🔹 Carrusel de ofertas */}
      <section className="mt-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="w-full h-[480px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full flex items-center justify-start px-12 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div
                  className={`absolute inset-0 ${slide.bgColor} bg-opacity-60`}
                ></div>
                <div className="relative z-10 text-white max-w-lg">
                  <h1 className="text-5xl font-extrabold mb-3">{slide.title}</h1>
                  <p className="text-lg mb-5">{slide.subtitle}</p>
                  <button className="bg-white text-blue-700 font-semibold px-5 py-2 rounded hover:bg-gray-200">
                    {slide.btnText}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🔹 Productos Destacados */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
        <p className="text-gray-600 mb-10">
          Descubre los últimos modelos de celulares con la mejor tecnología y precios increíbles
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            { name: "iPhone 15 Pro", price: "$1,199", img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-blue-titanium" },
            { name: "Samsung Galaxy S23 Ultra", price: "$999", img: "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-ultra-s918-sm-s918bzgcmea-534086537" },
            { name: "Google Pixel 8 Pro", price: "$899", img: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel8-pro-1.jpg" },
          ].map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold">{product.price}</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

