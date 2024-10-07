const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb");

//  Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class User {





    /**
     * Buscar un usuario por su MongoId.
     * 
     * @param {ObjectId} id - ObjectId en formato string
     * @returns {Promise<Object>} Objeto con los datos del usuario
     * @error Objeto con detalles del error
     */
    
    async buscarPorMongoId(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');


            //  Des-estructuramos res pq solo esperamos un resultado

            const [res] = await collection.find(
                
                { _id: new ObjectId(id) }
            
            ).toArray();


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al buscar usuario por su MongoId",
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

    async buscarPorGoogleId(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');


            //  Des-estructuramos res pq solo esperamos un resultado

            const [res] = await collection.find(
                
                { google_id: id }
            
            ).toArray();


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al buscar usuario por su GoogleId",
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

    async buscarPorGithubId(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');


            //  Des-estructuramos res pq solo esperamos un resultado

            const [res] = await collection.find(
                
                { github_id: id }
            
            ).toArray();


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al buscar usuario por su GithubId",
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

    async buscarPorDiscordId(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');


            //  Des-estructuramos res pq solo esperamos un resultado

            const [res] = await collection.find(
                
                { discord_id: id }
            
            ).toArray();


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al buscar usuario por su DiscordId",
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

    async InsertarUsuario(userData) {

        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');


            const res = await collection.insertOne(

                userData

            );


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al insertar un usuario a la base de datos",
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

    async actualizarUsuarioPorMongoId(id, updateData) {

        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');
            

            const res = await collection.updateOne(

                { _id: new ObjectId(id) },
                { $set: updateData },

            );


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al actualizar usuario en la base de datos",
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

    async actualizarLlavesArray_Push(id, Object) {

        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');


            const res = await collection.updateOne(

                { _id: new ObjectId(id) },
                { $addToSet: {[Object.llave]: {$each: Object.array}} },

            );


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al actualizar usuario en la base de datos",
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

    async actualizarLlavesArray_Pull(id, Object) {

        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');


            const res = await collection.updateOne(

                { _id: new ObjectId(id) },
                { $pull: {[Object.llave]: {$in: Object.array}} },

            );


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al actualizar usuario en la base de datos",
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

    async eliminarUsuarioPorMongoId(id) {

        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.deleteMany(

                { _id: new ObjectId(id) }

            );


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al eliminar usuario en la base de datos",
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

    async consultaAggregate(data) {
        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.aggregate(

                [...data]

            ).toArray();


            return res;

        } catch (error) {

            return {

                success: false,
                message: "Error al realizar la consulta aggregate",
                details: error.details,
                stack: error.stack

            }

        }
    }



}



module.exports = User;