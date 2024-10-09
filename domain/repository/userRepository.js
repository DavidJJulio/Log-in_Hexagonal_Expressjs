//  IMPORTACIONES

const Usuario = require('../model/userModel');
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")



// Creamos la clase que contendra todos los metodos de usuarios

class userRepository {


    async findByIdAndUpdateArrays(_id, Object) {

        try {
            
        const usuario = new Usuario()
        let query = ""
        if (Object.action == "pull"){

            query = await usuario.findByIdAndUpdateArraysPullModel(_id, Object)
        }
        else{

            query = await usuario.findByIdAndUpdateArraysModel(_id, Object)
        }
        console.log(query)
        // Manejo de errores y verificación del resultado de la actualización
        if (query.matchedCount === 0) {

            // Si no se encontró ningún documento que coincida con el filtro
            return {
                status: 404,
                message: "Usuario no encontrado"
            };
        }


        if (query.modifiedCount === 0) {

            // Si el documento se encontró pero no se modificó (por ejemplo, los datos son iguales)
            return {
                status: 400,
                message: "No se realizaron cambios en el usuario. Los datos son iguales a los existentes."
            };
        }


        // Devolver resultado exitoso
        return {
            status: 200,
            message: "Usuario actualizado con éxito",
            modifiedCount: query.modifiedCount
        };

    } catch (error) {

        return {
            status: 500,
            message: "Error al actualizar el usuario",
            error: error.stack
        };

    }

    }


    //  Metodo para buscar a un usuario por el nombre:

    async buscarUsuarioPorIdentifier(identifier) {
        try {

            const usuario = new Usuario()
            let query = [

                { $match: { identifier: identifier } }

            ]


            return await usuario.aggregateData(query)

        } catch (error) {

            return {
                status: 500,
                message: "Usuario no encontrado por su identificador",
                error: error.stack
            };


        }

    }


    //  Metodo para buscar a un usuario por el correo: 

    async buscarUsuarioPorCorreo(correo) {
        try {

            const usuario = new Usuario()
            let query = [

                { $match: { google_id: { $exists: false }, github_id: { $exists: false }, email: correo } }

            ]


            return await usuario.aggregateData(query)

        } catch (error) {

            return {
                status: 500,
                message: "Usuario no encontrado por correo",
                error: error.stack
            };

        }

    }


    //  Metodo para validar a un usuario por contraseña: 

    async validarUsuarioContraseñaJWT ({user: user, contraseña: contraseña}) {
        try {

            const password = user.password
            delete user.password

            const isMatch = await bcrypt.compare(contraseña, password)

            if (!isMatch) return {status: 401, message: 'No autorizado, la contraseña no coincide'}

            return jwt.sign(user, process.env.KEY_SECRET, { expiresIn: `${process.env.EXPRESS_EXPIRE}ms` });


        } catch (error) {

            return {
                status: 500,
                message: "Fallo del sistema",
                error: error.stack
            };

        }

    }


    //  Metodo para modificar datos de un usuario:
    
    async modificarUsuario({ _id: _id, updateData: updateData }) {

        try {

            const usuario = new Usuario();
            const query = await usuario.findByIdAndUpdate(_id, updateData, false);
    

            // Manejo de errores y verificación del resultado de la actualización
            if (query.matchedCount === 0) {

                // Si no se encontró ningún documento que coincida con el filtro
                return {
                    status: 404,
                    message: "Usuario no encontrado"
                };
            }

    
            if (query.modifiedCount === 0) {

                // Si el documento se encontró pero no se modificó (por ejemplo, los datos son iguales)
                return {
                    status: 400,
                    message: "No se realizaron cambios en el usuario. Los datos son iguales a los existentes."
                };
            }

    
            // Devolver resultado exitoso
            return {
                status: 200,
                message: "Usuario actualizado con éxito",
                modifiedCount: query.modifiedCount
            };
    
        } catch (error) {

            return {
                status: 500,
                message: "Error al actualizar el usuario",
                error: error.stack
            };

        }

    }
    

    //  Metodo para eliminar un usuario: 

    async eliminarUsuario(_id) {

        try {

            const usuario = new Usuario();
            const query = await usuario.findByIdAndDelete(_id);

    
            return query
    
        } catch (error) {

            return {
                status: 500,
                message: "Error al eliminar el usuario",
                error: error.stack
            };

        }

    }


    //  Metodo para insertar un usuario:

    async insertarUsuario(userData) {

        try {

            const usuario = new Usuario();
            const query = await usuario.insert(userData);

    
            return query
    
        } catch (error) {

            return {
                status: 500,
                message: "Error al insertar el usuario",
                error: error.stack
            };

        }

    }


    //  Metodo para buscar un usuario por su ID:

    async buscarUsuarioPorID(_id) {

        try {

            const usuario = new Usuario();
            const query = await usuario.findById(_id);

    
            return query
    
        } catch (error) {

            return {
                status: 500,
                message: "Error al buscar el usuario por su ID",
                error: error.stack
            };

        }

    }


    async buscarUsuarioPorIDGoogle(_id) {

        try {

            const usuario = new Usuario();
            const query = await usuario.findByIdGoogle(_id);

    
            return query
    
        } catch (error) {

            return {
                status: 500,
                message: "Error al buscar el usuario por su ID",
                error: error.stack
            };

        }

    }

    async buscarUsuarioPorIDDiscord(_id) {

        try {

            const usuario = new Usuario();
            const query = await usuario.findByIdDiscord(_id);

    
            return query
    
        } catch (error) {

            return {
                status: 500,
                message: "Error al buscar el usuario por su ID",
                error: error.stack
            };

        }

    }


    //  Method to find a user by the google id

    async buscarUsuarioPorIDGithub(_id) {

        try {

            const usuario = new Usuario();
            const query = await usuario.findByIdGithub(_id);

    
            return query
    
        } catch (error) {

            return {
                status: 500,
                message: "Error al buscar el usuario por su ID",
                error: error.stack
            };

        }

    }

}





//Exportamos la clase

module.exports = userRepository