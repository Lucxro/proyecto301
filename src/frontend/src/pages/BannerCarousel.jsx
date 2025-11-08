import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function BannerCarousel() {
  const [slides, setSlides] = useState([]);
  const backendURL = "http://localhost:3000";

  // 🔹 Cargar banners desde la API del backend
  useEffect(() => {
    fetch(`${backendURL}/api/banners`)
      .then((res) => res.json())
      .then((data) => {
        // Si la API devuelve banners válidos
        const formattedSlides = data.map((banner) => ({
          title: banner.title || "Promoción destacada",
          subtitle: banner.description || "",
          button: "Ver más",
          image: `${backendURL}${banner.imageUrl}`,
          overlay: "bg-gray-900/25",
          link: banner.link || "/productos-vista",
        }));
        setSlides(formattedSlides);
      })
      .catch((err) => {
        console.error("Error al cargar banners:", err);
      });
  }, []);

  if (slides.length === 0) {
    return (
      <div className="w-full h-[300px] md:h-[450px] lg:h-[550px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">Cargando banners...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full h-[300px] md:h-[450px] lg:h-[550px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-start overflow-hidden">
              {/* Imagen de fondo */}
              <div
                className="absolute inset-0 bg-center bg-contain bg-no-repeat bg-black"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>

              {/* Overlay */}
              <div className={`absolute inset-0 ${slide.overlay}`}></div>

              {/* Contenido */}
              <div className="relative z-10 text-white px-5 md:px-10 ml-5 md:ml-10 max-w-xl">
                <h1 className="text-2xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg mb-4 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <a href={slide.link}>
                  <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                    {slide.button}
                  </button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCarousel;
