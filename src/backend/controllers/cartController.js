import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📦 Obtener todos los productos del carrito de un usuario
export const getCart = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);

    if (!userId) {
      return res.status(400).json({ error: "Se requiere un userId válido." });
    }

    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    res.json(cart);
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// ➕ Agregar producto al carrito
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "El productId es obligatorio." });
    }

    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + (quantity || 1) },
      });
      return res.json(updated);
    }

    const newItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity: quantity || 1,
      },
    });

    res.json(newItem);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
};

// ❌ Eliminar producto del carrito
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
};

// 🧹 Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);

    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    res.json({ message: "Carrito vaciado" });
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
};
