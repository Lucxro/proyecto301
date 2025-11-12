import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestión de órdenes de compra
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea una nueva orden de compra
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Lucero
 *               apellido:
 *                 type: string
 *                 example: Flores
 *               celular:
 *                 type: string
 *                 example: "999999999"
 *               correo:
 *                 type: string
 *                 example: lucero@example.com
 *               ciudad:
 *                 type: string
 *                 example: Lima
 *               direccion:
 *                 type: string
 *                 example: "Av. Principal 123"
 *               total:
 *                 type: number
 *                 example: 250.0
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "iPhone 15"
 *                     cantidad:
 *                       type: integer
 *                       example: 1
 *                     precio:
 *                       type: number
 *                       example: 250
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       500:
 *         description: Error al crear la orden
 */
router.post("/orders", async (req, res) => {
  try {
    const { nombre, apellido, celular, correo, ciudad, direccion, total, productos } = req.body;

    const nuevaOrden = await prisma.order.create({
      data: {
        nombre,
        apellido,
        celular,
        correo,
        ciudad,
        direccion,
        total,
        items: {
          create: productos.map((p) => ({
            nombre: p.nombre,
            cantidad: p.cantidad,
            precio: p.precio,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(nuevaOrden);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ error: "Error al crear la orden" });
  }
});

export default router;
