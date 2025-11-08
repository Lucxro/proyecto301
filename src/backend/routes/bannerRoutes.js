import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { active: true },
    });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los banners" });
  }
});

export default router;
