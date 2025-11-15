import express from "express";
import { authControllers } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: margarita@gmail.com
 *               name:
 *                 type: string
 *                 example: Margarita
 *               password:
 *                 type: string
 *                 example: patito123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos enviados incorrectos
 *       500:
 *         description: Error interno del servidor
 */

router.post("/register", authControllers.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Iniciar sesión de usuario tradicional
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: margarita@gmail.com
 *              password:
 *                type: string
 *                example: patito123
 *    responses:
 *      200:
 *        description: Inicio de sesión exitoso
 *      401:
 *        description: Credenciales incorrectas
 *      500:
 *        description: Error interno del servidor
 */
router.post("/login", authControllers.login);

/**
 * @swagger
 * /api/auth/google:
 *  get:
 *    summary: Autenticación con Google
 *    tags: [Auth]
 *    description: Redirige al flujo de autenticación de Google
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *  get:
 *    summary: Callback de autenticación con Google
 *    tags: [Auth]
 *    description: Procesa el token de usuario y redirige al frontend
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login-error",
    session: false,
  }),
  authControllers.googleCallBack
);

export default router;
