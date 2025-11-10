import prisma from "../prismaClient.js";
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';


export const authServices = {
  //Registrar usuario
  async register(data) {
    try {
      const { email, name, password } = data;
      if (!email || !name || !password) {
        throw new Error('Todos los campos son obligatorios');
      }

      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error('El usuario ya está registrado');
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
      });

      const token = generateToken(user.id, user.email);

      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      throw new Error('Error al registrar usuario: ' + error.message);
    }
  },

  // Login tradicional
  async login(data) {
    try {
      const { email, password } = data;

      if (!email || !password) {
        throw new Error('Correo y contraseña son obligatorios');
      }

      // Buscar usuario por email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (!user.password) {
        throw new Error('Este usuario usa inicio de sesión con Google');
      }

      const validPassword = await comparePassword(password, user.password);
      if (!validPassword) {
        throw new Error('Contraseña incorrecta');
      }

      // Generar token JWT
      const token = generateToken(user.id, user.email);

      // Retornar usuario sin contraseña
      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  },
};
