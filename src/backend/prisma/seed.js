import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de banners y productos...");

  // === BANNERS ===
  const bannerCount = await prisma.banner.count();
  if (bannerCount === 0) {
    await prisma.banner.createMany({
      data: [
        {
          title: "iPhone 15 Pro Max",
          subtitle: "Ahora con descuento especial",
          description:
            "Disfruta la potencia del chip A17 Pro y un diseño de titanio ultraligero.",
          buttonText: "Ver Ofertas",
          imageUrl: "/uploads/images/imagen-iphone15-pro-max.webp",
          overlay: "bg-gray-900/25",
          link: "/productos-vista",
          active: true,
        },
        {
          title: "Samsung Galaxy S23 Ultra",
          subtitle: "Captura cada detalle con su cámara de 200MP",
          description:
            "El smartphone más avanzado de Samsung, hecho para profesionales y creadores.",
          buttonText: "Descubrir más",
          imageUrl: "/uploads/images/imagen-samsung-s23-ultra.webp",
          overlay: "bg-gray-900/25",
          link: "/productos-vista",
          active: true,
        },
        {
          title: "Google Pixel 8 Pro",
          subtitle: "La inteligencia de Google en tus manos",
          description:
            "Descubre el poder de la IA de Google para tus fotos y tu día a día.",
          buttonText: "Explorar",
          imageUrl: "/uploads/images/imagen-google-pixel-8pro.webp",
          overlay: "bg-gray-900/25",
          link: "/productos-vista",
          active: true,
        },
      ],
    });
    console.log("✅ Banners creados correctamente");
  }

  // === PRODUCTOS ===
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: "Huawei P50 Pro",
          description: "Smartphone con cámara Leica y gran rendimiento fotográfico.",
          price: 1199,
          oldPrice: 1299,
          imageUrl: "/uploads/images/imagen-huawei-p50.jpg",
          oferta: true,
          stock: 18,
          rating: 4.6,
          sistema: "HarmonyOS 3",
          almacenamiento: "256GB",
          ram: "8GB",
          camara: "50MP + 64MP + 13MP + 40MP Leica",
          bateria: "4360 mAh con carga rápida de 66W",
          pantalla: "6.6” OLED 120Hz",
          color: ["Cocoa Gold", "Golden Black", "White", "Blue"],
          disponibilidad: "En Stock",
          detalles:
            "El Huawei P50 Pro ofrece una cámara Leica de alto rendimiento, pantalla OLED fluida y diseño premium.",
        },
        {
          name: "Samsung Galaxy Z Flip7",
          description: "Diseño plegable y compacto con tecnología de última generación.",
          price: 999,
          oldPrice: null,
          imageUrl: "/uploads/images/samsung-z-flip7.jpeg",
          oferta: false,
          stock: 12,
          rating: 4.7,
          sistema: "Android 14 (One UI 6)",
          almacenamiento: "512GB",
          ram: "8GB",
          camara: "12MP + 12MP ultra gran angular",
          bateria: "3700 mAh con carga rápida de 25W",
          pantalla: "6.7” AMOLED FHD+ 120Hz",
          color: ["Lavender", "Graphite", "Cream", "Mint", "Yellow"],
          disponibilidad: "En Stock",
          detalles:
            "El Galaxy Z Flip7 ofrece una experiencia moderna con diseño plegable y cámaras de nivel flagship.",
        },
        {
          name: "iPhone 14 Pro Max",
          description:
            "El iPhone con Dynamic Island y cámara profesional de 48MP.",
          price: 1099,
          oldPrice: 1299,
          imageUrl: "/uploads/images/iphone-14-pro-max.webp",
          oferta: true,
          stock: 9,
          rating: 4.9,
          sistema: "iOS 18",
          almacenamiento: "256GB",
          ram: "6GB",
          camara: "48MP + 12MP + 12MP",
          bateria: "4323 mAh con carga MagSafe",
          pantalla: "6.7” Super Retina XDR OLED",
          color: ["Deep Purple", "Silver", "Gold", "Space Black"],
          disponibilidad: "En Stock",
          detalles:
            "El iPhone 14 Pro Max combina rendimiento y cámara profesional en un diseño de titanio de alta gama.",
        },
        {
          name: "Xiaomi 14 Ultra",
          description:
            "Fotografía profesional con cámara Leica y potencia Snapdragon 8 Gen 3.",
          price: 799,
          oldPrice: 899,
          imageUrl: "/uploads/images/xiaomi-14-ultra.webp",
          oferta: true,
          stock: 14,
          rating: 4.8,
          sistema: "Android 14 (HyperOS)",
          almacenamiento: "512GB",
          ram: "16GB",
          camara: "50MP cuádruple Leica",
          bateria: "5000 mAh con carga 90W",
          pantalla: "6.73” AMOLED QHD+ 120Hz",
          color: ["White Ceramic", "Black Leather", "Blue"],
          disponibilidad: "En Stock",
          detalles:
            "El Xiaomi 14 Ultra redefine la fotografía móvil con lentes Leica y un rendimiento de élite.",
        },
        {
          name: "OnePlus 12",
          description:
            "Rendimiento ultra rápido, pantalla AMOLED y carga de 120W.",
          price: 749,
          oldPrice: 899,
          imageUrl: "/uploads/images/oneplus-12.webp",
          oferta: false,
          stock: 0,
          rating: 4.5,
          sistema: "Android 14 (OxygenOS)",
          almacenamiento: "256GB",
          ram: "12GB",
          camara: "50MP + 48MP + 64MP Hasselblad",
          bateria: "5400 mAh con carga 120W",
          pantalla: "6.82” AMOLED QHD+ 120Hz",
          color: ["Flowy Emerald", "Matte Black", "Silver Gray"],
          disponibilidad: "Agotado",
          detalles:
            "El OnePlus 12 ofrece potencia bruta y fluidez, ideal para gaming y multitarea.",
        },
      ],
    });
    console.log("✅ Productos creados correctamente");
  } else {
    console.log("⚠️  Ya existen productos en la base de datos. No se insertaron nuevos.");
  }

  console.log("🌟 Seed completado exitosamente");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error al ejecutar el seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
