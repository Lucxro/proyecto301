import express from 'express';
import { registerUser } from '../controllers/emailController.js';

const router = express.Router();
/**
 * @swagger
 * /api/email/register:
 *   post:
 *     summary: Registrar usuario y enviar
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@ejemplo.com
 *               name:
 *                 type: string
 *                 example: Lucero
 *     responses: 
 *       200: 
 *         description: Email enviado correctamente.
 *       500:
 *         description: Error del servicio al enviar Email.
 */
router.post('/register', registerUser)

export default router;