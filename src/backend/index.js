import express from "express";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url"; 
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

import "./config/passport.js"; 
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

// Configuración de paths para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger (Documentación de la API)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Ruta base de prueba
app.get("/", (req, res) => {
  res.json({
    message: "✅ API corriendo correctamente en ALTech",
  });
});

//Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo y escuchando en el puerto ${PORT}`);
  console.log(`📂 Archivos estáticos servidos desde: ${path.join(__dirname, "uploads")}`);
});
