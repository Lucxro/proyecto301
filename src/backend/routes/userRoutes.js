import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

//Rutas para llamar al usuario
router.get('/',userController.getUsers);
router.post('/',userController.createUser);
router.put('/:id', userController.updateUser);
//Metodo para eliminar DELETE
//Metodo para actualizar PUT
//Metodo para modificar PATCH

export default router;
