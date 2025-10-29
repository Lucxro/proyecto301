import {PrismaClient } from '@prisma/client';

const prisma = new PrismaClient;

export const userService ={
    //Crear usuarios
    async createUser(data){
        try{
            const {email, name} = data;
            return await prisma.user.create({
                data :{email, name}
            })
        }catch(error){
            throw new Error('Error al crear usuario' + error.message);
        }
    },

    //Obtener usuarios
    async getAllUsers(){
        try{
            return await prisma.user.findMany();
        }catch(error){
            throw new Error ('Error al obtener usuarios' + error.message);
        }
    },

    async getUserById(id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) }
            });
            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario: ' + error.message);
        }
    },
    //Actualizar usuario
    async updateUser(id, data){
        try{
            return await prisma.user.update({
                where: {id:parseInt(id)},
                data: data
            })
        }catch(error){
            throw new Error('Error al actualizar usuario'+ error.message);
        }
    },

    //Eliminar usuario
    async deleteUser(id) {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id: parseInt(id) }
            });
            return deletedUser;
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

}
