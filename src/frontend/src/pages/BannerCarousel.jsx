import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import imgIphone from "../assets/images/imagen-iphone15-pro-max.webp";
import imgSamsung from "../assets/images/imagen-samsung-s23-ultra.webp";
import imgGooglePro from "../assets/images/imagen-google-pixel-8pro.webp";

function BannerCarousel() {
  const slides = [
    {
      title: "iPhone 15 Pro Max",
      subtitle: "Ahora con descuento especial",
      button: "Ver Ofertas",
      image: imgIphone,
      overlay: "bg-gray-900/25", 
    },
    {
      title: "Samsung Galaxy S23 Ultra",
      subtitle: "Captura cada detalle con su cámara de 200MP",
      button: "Descubrir más",
      image: imgSamsung,
      overlay: "bg-gray-900/25", 
    },
    {
      title: "Google Pixel 8 Pro",
      subtitle: "La inteligencia de Google en tus manos",
      button: "Explorar",
      image: imgGooglePro,
      overlay: "bg-gray-900/25", 
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
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
                <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCarousel;