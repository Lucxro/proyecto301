import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos del catálogo
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *       500:
 *         description: Error al obtener productos
 */
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
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

    res.json(product);
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
 *     tags: [Products]
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
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error interno del servidor
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

    // Validación mínima
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

    res.status(201).json({
      message: "✅ Producto creado exitosamente",
      data: nuevoProducto,
    });
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ error: "Error interno al crear producto" });
  }
});

export default router;
