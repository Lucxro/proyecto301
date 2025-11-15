import { authServices } from "../services/authServices.js";
import { generateToken } from "../utils/auth.js";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const authControllers = {
  async register(req, res) {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son obligatorios",
        });
      }

      const result = await authServices.register({ email, name, password });

      return res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Error en el registro",
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email y contraseña son obligatorios",
        });
      }

      const result = await authServices.login({ email, password });

      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || "Credenciales inválidas",
      });
    }
  },

  async googleCallBack(req, res) {
    try {
      const user = req.user;

      if (!user) {
        return res.redirect(`${FRONTEND_URL}/login-error`);
      }

      const redirect = req.query.redirect || "/login-success";
      const token = generateToken(user.id, user.email);
      const safe = (val) =>
        val && val !== "null" && val !== "undefined" ? val : "";

      const redirectURL =
        `${FRONTEND_URL}${redirect}` +
        `?token=${encodeURIComponent(token)}` +
        `&name=${encodeURIComponent(safe(user.name))}` +
        `&email=${encodeURIComponent(safe(user.email))}` +
        `&avatar=${encodeURIComponent(safe(user.avatar))}`;

      return res.redirect(redirectURL);
    } catch (error) {
      console.error("❌ ERROR CALLBACK GOOGLE:", error);

      return res.redirect(
        `${FRONTEND_URL}/login-error?message=${encodeURIComponent(
          error.message || "Error al autenticar con Google"
        )}`
      );
    }
  },
};
