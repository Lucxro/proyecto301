import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function BannerCarousel() {
  const slides = [
    {
      title: "iPhone 15 Pro Max",
      subtitle: "Ahora con descuento especial",
      button: "Ver Ofertas",
      image:
        "https://cdn.tmobile.com/content/dam/t-mobile/ntm/iphone-15-pro-max/device-hero.jpg",
      overlay: "bg-blue-900/60",
    },
    {
      title: "Samsung Galaxy S23 Ultra",
      subtitle: "Captura cada detalle con su cámara de 200MP",
      button: "Descubrir más",
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-ultra-s918-sm-s918bzgcmea-534086537",
      overlay: "bg-gray-900/60",
    },
    {
      title: "Google Pixel 8 Pro",
      subtitle: "La inteligencia de Google en tus manos",
      button: "Explorar",
      image:
        "https://fdn2.gsmarena.com/vv/pics/google/google-pixel8-pro-1.jpg",
      overlay: "bg-green-900/60",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      className="w-full h-[300px] md:h-[450px]" // altura ajustada
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full flex items-center justify-start">
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            {/* Overlay */}
            <div className={`absolute inset-0 ${slide.overlay}`}></div>

            {/* Contenido */}
            <div className="relative z-10 text-white px-5 md:px-10 max-w-xl">
              <h1 className="text-2xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg mb-4 drop-shadow-md">
                {slide.subtitle}
              </p>
              <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                {slide.button}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerCarousel;
