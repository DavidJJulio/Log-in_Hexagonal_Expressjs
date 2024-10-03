//  Configuración y conexión a MongoDB.

//  MongoClient -> MongoClient es una clase que viene en el paquete de mongodb. Esta permite
//  manejar las conexiones a la base de datos. Recibe una url y su forma de manejar las conexiones
//  es con una pool de conexiones. Esto quiere decir que MongoClient deja conexiones abiertas para
//  mejorar el rendimiento, la cantidad de conexiones abiertas se puede modificar pasando un parametro
//  despues de la url (Ejemplo: { poolSize: 10 }). 
//  Todas las operaciones realizadas con mongodb se realizan de manera asíncrona

const { MongoClient } = require("mongodb");



class ConnectToDatabase{



    //  instanceConnect -> Este es un atributo estático que se usa para implementar el patrón Singleton, asegurando que solo haya una instancia de ConnectToDatabase.
    //  db              -> Este atributo almacenará la referencia a la base de datos MongoDB a la que se conecta.
    //  connection      -> Este atributo almacenará la conexión de MongoDB.
    //  user            -> Este atributo almacenará el nombre de usuario para la conexión a la base de datos.
    //  #password       -> Este es un atributo privado (notado por el prefijo #) que almacenará la contraseña del usuario.//  

    static instanceConnect;
    db;
    connection;
    user;
    #password;



    //  El constructor hace uso de un patron de diseño llamado SINGLETON.
    //  Esto lo que hace es asegurarse de que solo haya una instancia de la clase a la vez.
    //  Utiliza las variables de entorno para definir el usuario y la contraseña. Luego verifica si
    //  ya existe una instancia a la base de datos, en tal caso retorna esa instancia, si no es 
    //  el caso, crea una nueva instancia.

    constructor({ user, pwd } = { user: process.env.MONGO_USER, pwd: process.env.MONGO_PASS }) {
        
        if ( ConnectToDatabase.instanceConnect && this.connection ) {

            return ConnectToDatabase.instanceConnect;

        }

        this.user = user;
        this.setPassword = pwd;
        ConnectToDatabase.instanceConnect = this;

    }



    //  Metodo para conectarse a la base de datos.
    //  Se usa MongoClient para hacer la conexión, utilizando las variables de entorno.
    //  this.db contendra la base de datos con la que se va a trabajar.

    async connectOpen(){

        this.connection = new MongoClient(`${ process.env.MONGO_HOST }${ this.user }:${ this.getPassword }@${ process.env.MONGO_CLUSTER }:${ process.env.MONGO_PORT }`);

        try {

            await this.connection.connect();
            this.db = this.connection.db(process.env.MONGO_DB);

        } catch (error) {

            this.connection = undefined;
            throw new Error('Error connecting');

        }

    }



    //  Metodos para definir cerrar la conexión a la base de datos, definir la contraseña y por ultimo modificarla

    async connectClose(){
        this.connection.close();
    }
    get getPassword(){
        return this.#password;
    }
    set setPassword(pwd){
        this.#password = pwd;
    }
    
}
module.exports = ConnectToDatabase;