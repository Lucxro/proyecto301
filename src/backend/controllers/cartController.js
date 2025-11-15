import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todos los productos del carrito de un usuario
export const getCart = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    if (!userId) return res.status(400).json({ error: "Se requiere un userId válido." });

    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    res.json(cart);
  } catch (error) {
    console.error("❌ Error al obtener el carrito:", error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// Agregar producto al carrito con validación de stock
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!productId) return res.status(400).json({ error: "El productId es obligatorio." });

    // Verificar existencia del producto
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ error: "Producto no encontrado." });

    // Buscar si ya existe en el carrito
    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    // Si ya existe, validar stock antes de sumar
    if (existing) {
      const nuevaCantidad = existing.quantity + quantity;
      if (nuevaCantidad > product.stock) {
        return res.status(400).json({
          error: "No se pudo añadir más unidades. Stock insuficiente.",
        });
      }

      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: nuevaCantidad },
        include: { product: true },
      });

      return res.json(updated);
    }

    // Si no existe en el carrito
    if (quantity > product.stock) {
      return res.status(400).json({ error: "Cantidad excede el stock disponible." });
    }

    const newItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
      include: { product: true },
    });

    res.json(newItem);
  } catch (error) {
    console.error("❌ Error al agregar al carrito:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
};

// Eliminar producto del carrito
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("❌ Error al eliminar del carrito:", error);
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
};

// Vaciar carrito completo de un usuario
export const clearCart = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    if (!userId) return res.status(400).json({ error: "Se requiere un userId válido." });

    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    res.json({ message: "Carrito vaciado correctamente." });
  } catch (error) {
    console.error("❌ Error al vaciar carrito:", error);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
};
