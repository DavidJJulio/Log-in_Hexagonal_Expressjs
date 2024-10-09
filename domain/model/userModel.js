const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb");

// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class User {



    // Encuentra un usuario por su ID.
    async findById(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');
            //  Des-estructuramos res pq solo esperamos un resultado
            const [res] = await collection.find(
                
                { _id: new ObjectId(id) }
            
            ).toArray();


            return res;

        } catch (error) {

            throw new Error('Error finding user by ID');
            
        }
    }

    async findByIdGoogle(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');
            //  Des-estructuramos res pq solo esperamos un resultado
            const [res] = await collection.find(
                
                { google_id: id }
            
            ).toArray();


            return res;

        } catch (error) {

            throw new Error('Error finding user by ID');
            
        }
    }

    
    async findByIdGithub(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');
            //  Des-estructuramos res pq solo esperamos un resultado
            const [res] = await collection.find(
                
                { github_id: id }
            
            ).toArray();


            return res;

        } catch (error) {

            throw new Error('Error finding user by ID');
            
        }
    }

    async findByIdDiscord(id) {

        try {
            
            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');
            //  Des-estructuramos res pq solo esperamos un resultado
            const [res] = await collection.find(
                
                { discord_id: id }
            
            ).toArray();


            return res;

        } catch (error) {

            throw new Error('Error finding user by ID');
            
        }
    }

    

    // Inserta un nuevo usuario en la base de datos.
    async insert(userData) {
        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.insertMany(

                [userData]

            );


            return res;

        } catch (error) {

            throw new Error('Error inserting user');

        }
    }



    // Actualiza un usuario por su ID. Si no existe, puede crear uno nuevo (upsert).
    async findByIdAndUpdate(id, updateData, upsert) {
        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.updateOne(

                { _id: new ObjectId(id) },
                { $set: updateData },
                { upsert: upsert }

            );


            return res;

        } catch (error) {

            throw new Error('Error updating user');

        }
    }


    async findByIdAndUpdateArraysModel(id, Object) {
        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.updateOne(

                { _id: new ObjectId(id) },
                { $addToSet: {[Object.llave]: {$each: Object.array}} },

            );


            return res;

        } catch (error) {

            throw new Error('Error updating user');

        }
    }

    async findByIdAndUpdateArraysPullModel(id, Object) {
        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.updateOne(

                { _id: new ObjectId(id) },
                { $pull: {[Object.llave]: {$in: Object.array}} },

            );


            return res;

        } catch (error) {

            throw new Error('Error updating user');

        }
    }



    // Elimina un usuario por su ID.
    async findByIdAndDelete(id) {
        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.deleteMany(

                { _id: new ObjectId(id) }

            );


            return res;

        } catch (error) {

            throw new Error('Error deleting user');

        }
    }

    



    // Realiza una agregación de datos en la colección de users.
    async aggregateData(data) {
        try {

            let obj = ConnectToDatabase.instanceConnect;
            const collection = obj.db.collection('users');

            const res = await collection.aggregate(

                [...data]

            ).toArray();


            return res;

        } catch (error) {

            throw new Error('Error aggregating data');

        }
    }



}

module.exports = User;