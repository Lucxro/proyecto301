import { authServices } from "../services/authServices.js";
import { generateToken } from "../utils/auth.js";

export const authControllers = {
  //  Registro tradicional
  async register(req, res) {
    try {
      const { email, name, password } = req.body;

      const result = await authServices.register({ email, name, password });

      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Login tradicional
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authServices.login({ email, password });

      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  },

  //Google Callback
  async googleCallBack(req, res) {
    try {
      const user = req.user;
      const token = generateToken(user.id, user.email);

      // Redirigir a frontend con el token JWT
      res.redirect(`http://localhost:5173/login-success?token=${token}`);
    } catch (error) {
      res.redirect(
        `http://localhost:5173/login-error?message=${encodeURIComponent(
          error.message
        )}`
      );
    }
  },
};
