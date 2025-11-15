import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";

export const authControllers = {
  register: async (req, res) => {
    try {
      const { email, name, password } = req.body;

      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return res
          .status(400)
          .json({ success: false, message: "El correo ya está registrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { email, name, password: hashedPassword },
      });

      return res.status(201).json({
        success: true,
        message: "Usuario registrado correctamente",
        data: newUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Error interno" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password) {
        return res
          .status(401)
          .json({ success: false, message: "Credenciales incorrectas" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res
          .status(401)
          .json({ success: false, message: "Credenciales incorrectas" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
          },
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Error interno" });
    }
  },

  googleCallBack: async (req, res) => {
    try {
      const user = req.user;

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const redirectUrl =
        `http://localhost:5173/login-success?token=${token}` +
        `&name=${encodeURIComponent(user.name || "")}` +
        `&email=${encodeURIComponent(user.email || "")}` +
        `&avatar=${encodeURIComponent(user.avatar || "")}`;

      res.redirect(redirectUrl);
    } catch (err) {
      console.error(err);
      res.redirect("http://localhost:5173/login-error");
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.json({
          success: true,
          message: "Si el correo existe, se envió un enlace",
        });
      }

      const token = crypto.randomBytes(32).toString("hex");

      await prisma.user.update({
        where: { email },
        data: {
          resetToken: token,
          resetTokenExpires: new Date(Date.now() + 1000 * 60 * 30),
        },
      });

      const resetLink = `http://localhost:5173/reset-password/${token}`;
      await sendEmail(email, user.name, resetLink);

      return res.json({
        success: true,
        message: "Se envió un enlace de recuperación a tu correo",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Error interno" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      console.log("TOKEN RECIBIDO:", token);
      console.log("NUEVA CONTRASEÑA:", newPassword);

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Datos incompletos",
        });
      }

      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpires: { gt: new Date() },
        },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Enlace inválido o expirado",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null, // ← CAMBIO IMPORTANTE
          resetTokenExpires: null,
        },
      });

      console.log("PASSWORD ACTUALIZADA CORRECTAMENTE");

      return res.json({
        success: true,
        message: "Contraseña actualizada correctamente",
      });
    } catch (err) {
      console.error("RESET ERROR:", err);
      return res.status(500).json({ success: false, message: "Error interno" });
    }
  },
};
