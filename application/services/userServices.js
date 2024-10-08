const { ObjectId } = require("mongodb");
const User = require("../../domain/model/userModel");



//  Definimos la clase que interactuará con el dominio de la aplicación

class UserServices {



    //  Instanciamos la clase del modelo en el mismo constructor, para no tener que instanciarla cada vez que ejecutemos una funcion

    constructor() {

        this.userModel = new User()

    }






    /**
     * Buscar un usuario por su MongoId.
     * 
     * @param {ObjectId} id - ObjectId en formato string
     * @returns {Promise<Object>} Objeto con los datos del usuario
     * @error Objeto con detalles del error
     */

    async buscarPorMongoIdServices(id) {

        try {
            
            const usuario = await this.userModel.buscarPorMongoId(id)

            return usuario
            
        } catch (error) {

            return {

                success: false,
                message: "Error al buscar usuario por su MongoId",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }
            
        }

    }






    /**
     * Buscar un usuario por su GoogleId.
     * 
     * @param {String} id - Id en formato string
     * @returns {Promise<Object>} Objeto con los datos del usuario
     * @error Objeto con detalles del error
     */

    async buscarPorGoogleIdServices(id) {

        try {

            const usuario = await this.userModel.buscarPorGoogleId(id);

            return usuario;

        } catch (error) {

            return {
                
                success: false,
                message: "Error al buscar usuario por su GoogleId",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }

    }






    /**
     * Buscar un usuario por su GithubId.
     * 
     * @param {String} id - Id en formato string
     * @returns {Promise<Object>} Objeto con los datos del usuario
     * @error Objeto con detalles del error
     */

    async buscarPorGithubIdServices(id) {

        try {

            const usuario = await this.userModel.buscarPorGithubId(id);

            return usuario;

        } catch (error) {

            return {

                success: false,
                message: "Error al buscar usuario por su GithubId",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }

    }






    /**
     * Buscar un usuario por su DiscordId.
     * 
     * @param {String} id - Id en formato string
     * @returns {Promise<Object>} Objeto con los datos del usuario
     * @error Objeto con detalles del error
     */

    async buscarPorDiscordIdServices(id) {

        try {

            const usuario = await this.userModel.buscarPorDiscordId(id);

            return usuario;

        } catch (error) {

            return {

                success: false,
                message: "Error al buscar usuario por su DiscordId",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }
    }






    /**
     * Insertar un nuevo usuario en la base de datos.
     * 
     * @param {Object} userData - Objeto con los datos del usuario
     * @returns {Promise<Object>} Objeto con los detalles de la inserccion
     * @error Objeto con detalles del error
     */

    async insertarUsuarioServices(userData) {

        try {

            const res = await this.userModel.InsertarUsuario(userData);

            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al insertar un usuario",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }

    }






    /**
     * Actualiza un usuario en base a su MongoId
     * 
     * @param {ObjectId} id - Id en formato string.
     * @param {Object} updateData - Objeto con la llave y el valor a actualiza ({"llave": "String", "valor": "String"})
     * @returns {Promise<Object>} Objeto con los datos del usuario
     * @error Objeto con detalles del error
     */

    async actualizarUsuarioPorMongoIdServices(id, updateData) {

        try {

            const res = await this.userModel.actualizarUsuarioPorMongoId(id, updateData);

            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al actualizar usuario por su MongoId",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }

    }






    /**
     * Inserta elementos en cualquier atributo tipo array que un usuario tenga. Por ejemplo si tiene una llave {favorites: []}
     * este metodo insertara elementos en el array de favorites
     * 
     * @param {ObjectId} id - Id en formato string.
     * @param {Object} Object - Objeto con la llave y un array de objetos a insertar ({"llave": "String", "Array": []})
     * @returns {Promise<Object>} Objeto con los detalles de la operacion realizada
     * @error Objeto con detalles del error
     */

    async actualizarLlavesArray_PushServices(id, object) {

        try {

            const res = await this.userModel.actualizarLlavesArray_Push(id, object);

            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al actualizar array en el usuario",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }

    }






    /**
     * Extrae elementos en cualquier atributo tipo array que un usuario tenga. Por ejemplo si tiene una llave {favorites: []}
     * este metodo extraera elementos en el array de favorites
     * 
     * @param {ObjectId} id - Id en formato string.
     * @param {Object} Object - Objeto con la llave y un array de objetos a eliminar ({"llave": "String", "Array": []})
     * @returns {Promise<Object>} Objeto con los detalles de la operacion realizada
     * @error Objeto con detalles del error
     */

    async actualizarLlavesArray_PullServices(id, object) {

        try {

            const res = await this.userModel.actualizarLlavesArray_Pull(id, object);

            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al actualizar array en el usuario",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }

    }






    /**
     * Elimina a un usuario de la base de datos en base a su MongoId
     * 
     * @param {ObjectId} id - Id en formato string.
     * @returns {Promise<Object>} Objeto con los detalles de la operacion realizada
     * @error Objeto con detalles del error
     */

    async eliminarUsuarioPorMongoIdServices(id) {

        try {

            const res = await this.userModel.eliminarUsuarioPorMongoId(id);

            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al eliminar usuario por su MongoId",
                location: "UserServices",
                details: error.details,
                stack: error.stack

            }

        }

    }






    /**
     * Realiza una consulta aggregate
     * 
     * @param {Object} data - Array con la consulta aggregate.
     * @returns {Promise<Object?Array>} Objeto o Array con el resultado de la operacion aggregate
     * @error Objeto con detalles del error
     */

    async consultaAggregateServices(data) {

        try {

            const res = await this.userModel.consultaAggregate(data);

            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al realizar consulta aggregate",
                location: "UserServices",
                details: error.details,
                stack: error.stack
            }

        }

    }


}