import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos del catálogo
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *       500:
 *         description: Error al obtener los productos
 */
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    // Normalizamos campos para el frontend
    const productosFormateados = products.map((p) => ({
      ...p,
      brand: p.brand || p.marca || "Sin marca",
      os: p.os || p.sistema || "Desconocido",
    }));

    res.json(productosFormateados);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

/**
 * @swagger
 * /api/products/brands/list:
 *   get:
 *     summary: Obtener lista única de marcas disponibles
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida correctamente
 *       500:
 *         description: Error al obtener las marcas
 */
router.get("/brands/list", async (req, res) => {
  try {
    const marcas = await prisma.product.findMany({
      select: { marca: true },
      distinct: ["marca"],
      where: { marca: { not: null } },
    });

    const listaMarcas = marcas.map((m) => m.marca);
    res.json(listaMarcas);
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    res.status(500).json({ error: "Error al obtener marcas" });
  }
});

/**
 * @swagger
 * /api/products/offers:
 *   get:
 *     summary: Obtener productos en oferta
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos en oferta
 *       500:
 *         description: Error al obtener las ofertas
 */
router.get("/offers", async (req, res) => {
  try {
    const offers = await prisma.product.findMany({
      where: { oferta: true },
      orderBy: { createdAt: "desc" },
    });

    const ofertasFormateadas = offers.map((p) => ({
      id: p.id,
      title: p.name,
      description: p.description,
      image: p.imageUrl
        ? `http://localhost:3000${
            p.imageUrl.startsWith("/") ? p.imageUrl : `/${p.imageUrl}`
          }`
        : "https://via.placeholder.com/300x300?text=Sin+Imagen",

      price: p.price,
      oldPrice: p.oldPrice,
      discount:
        p.oldPrice && p.oldPrice > p.price
          ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
          : null,
      tag: p.oferta ? "Oferta Especial" : "",
      tagColor: "bg-blue-600",
      timeLeft: "Tiempo limitado",
    }));

    res.json(ofertasFormateadas);
  } catch (error) {
    console.error("Error al obtener ofertas:", error);
    res.status(500).json({ error: "Error al obtener las ofertas" });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const productoFormateado = {
      ...product,
      brand: product.brand || product.marca || "Sin marca",
      os: product.os || product.sistema || "Desconocido",
    };

    res.json(productoFormateado);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Google Pixel 9 Pro"
 *               description:
 *                 type: string
 *                 example: "Fotografía IA con Google Tensor G4 y Android 15 puro."
 *               price:
 *                 type: number
 *                 example: 1099
 *               oldPrice:
 *                 type: number
 *                 example: 1199
 *               imageUrl:
 *                 type: string
 *                 example: "/uploads/images/pixel-9-pro.webp"
 *               oferta:
 *                 type: boolean
 *                 example: true
 *               stock:
 *                 type: integer
 *                 example: 10
 *               rating:
 *                 type: number
 *                 example: 4.8
 *               sistema:
 *                 type: string
 *                 example: "Android 15"
 *               almacenamiento:
 *                 type: string
 *                 example: "256GB"
 *               ram:
 *                 type: string
 *                 example: "12GB"
 *               camara:
 *                 type: string
 *                 example: "50MP + 48MP + 12MP"
 *               bateria:
 *                 type: string
 *                 example: "5000 mAh con carga rápida de 45W"
 *               pantalla:
 *                 type: string
 *                 example: "6.8” AMOLED LTPO 120Hz"
 *               color:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Obsidian", "Porcelain", "Mint"]
 *               disponibilidad:
 *                 type: string
 *                 example: "En Stock"
 *               marca:
 *                 type: string
 *                 example: "Google"
 *               detalles:
 *                 type: string
 *                 example: "El Pixel 9 Pro lleva la fotografía móvil al siguiente nivel con IA avanzada y un diseño premium."
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al crear el producto
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      imageUrl,
      oferta,
      stock,
      rating,
      sistema,
      almacenamiento,
      ram,
      camara,
      bateria,
      pantalla,
      color,
      disponibilidad,
      marca,
      detalles,
    } = req.body;

    if (!name || !price || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Faltan campos obligatorios: name, price o imageUrl" });
    }

    const nuevoProducto = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : null,
        imageUrl,
        oferta: oferta === true || oferta === "true",
        stock: Number(stock) || 0,
        rating: Number(rating) || null,
        sistema,
        almacenamiento,
        ram,
        camara,
        bateria,
        pantalla,
        color: Array.isArray(color)
          ? color
          : typeof color === "string"
          ? [color]
          : [],
        disponibilidad: disponibilidad || "En Stock",
        marca,
        detalles,
      },
    });

    const productoFormateado = {
      ...nuevoProducto,
      brand: marca,
      os: sistema,
    };

    res.status(201).json({
      message: "✅ Producto creado exitosamente",
      data: productoFormateado,
    });
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ error: "Error interno al crear producto" });
  }
});

export default router;
