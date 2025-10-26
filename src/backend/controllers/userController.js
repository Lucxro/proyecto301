import  {userService} from '../services/userServices.js';

export const userController = {
    async getUsers(req, res){
        try{
            const users = await userService.getAllUsers();
            res.status(200).json({
                succes: true,
                data:users
            })
        }catch(error){
            res.status(500).json({
                succes: false,
                message: error.message
            })
        }
    },

    async createUser (req, res){
        try{
            const {email, name}= req.body;
            //Validacion basica
            if(!email || !name){
                return res.status(400).json({
                    success:false,
                    message:'Email y nombre son obligatorios'
                });
            }
            const newUser = await userService.createUser({email, name});
            res.status(201).json({
                success:true,
                data: newUser,
                message: 'Usuario creado correctamente'
            });
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
    },

    async updateUser(req, res){
        try{
            const {id} = req.params;
            const updateData = req.body;

            const updateUser = await userService.updateUser(parseInt(id), updateData);
            res.status(200).json({
                success:true,
                data:updateUser,
                message: 'Usuario actualizado correctamente'
            });
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
    },
    
    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const userExists = await userService.getUserById(parseInt(id));
            if (!userExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Eliminamos el usuario
            await userService.deleteUser(parseInt(id));

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado correctamente'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}