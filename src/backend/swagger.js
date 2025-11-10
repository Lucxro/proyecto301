import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API REST - Proyecto Tienda de celulares",
      version: "1.0.0",
      description: "Documentación de API con Express, Prisma y PostgreSQL",
      contact: {
        email: "1641249@senati.pe",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desarrollo",
      },
    ],
  },

  // 📂 Ruta a tus archivos de rutas
  apis: [path.join(__dirname, "./routes/*.js")],
};

// 🧠 Generar especificación
export const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 🧾 Solo para depurar (ver si Swagger encuentra tus rutas)
console.log("📘 Swagger cargando rutas desde:", path.join(__dirname, "./routes/*.js"));
console.log("📘 Swagger cargó correctamente:", Object.keys(swaggerSpec.paths).length, "endpoints.");
