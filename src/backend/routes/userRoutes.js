import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        email:
 *          type: string
 *          example: lucero@ejemplo.com
 *        name:
 *          type: string
 *          example: Lucero
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Obtener todos los usuarios
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: OK
 * 
 */
router.get('/',userController.getUsers);

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Crear nuevo usuario
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: lucero@ejemplo.com
 *              name:
 *                type: string
 *                example: Lucero
 *    responses:
 *      201:
 *        description: Usuario creado correctamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                data:
 *                  $ref: '#/components/schemas/User'
 *                message:
 *                  type: string
 *                  example: Usuario creado correctamente
 *      400:
 *        description: Datos invalidos
 *      500:
 *        description: Error en el servidor
 */
router.post('/',userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Actualizar usuario
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID del usuario a actualizar
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: lucero@ejemplo.com
 *              name:
 *                type: string
 *                example: Lucero
 *    responses:
 *      200:
 *        description: Usuario actualizado correctamente.
 *        content:
 *          application/json:
 *            $ref: '#/components/schemas/User'
 *      400:
 *        description: Datos inválidos
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        description: Error en el servidor
 */

router.put('/:id', userController.updateUser);
//Metodo para eliminar DELETE
//Metodo para actualizar PUT
//Metodo para modificar PATCH

export default router;
