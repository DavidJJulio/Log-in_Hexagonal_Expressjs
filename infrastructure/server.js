// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const { jsonParseErrorHandler } = require('./middlewares/errorHandler');
const { limiTotal } = require('./middlewares/rateLimit');
const session = require('express-session');
const passport = require('../application/authentication/passport');
const cors = require('cors');
const userRoutes = require('../application/routes/userRoutes')



//  Esta funcion inicializa todas las rutas de la aplicación, luego será utilizada en app.js para correr la aplicación.

const createServer = () => {


    const app = express();
    app.use(express.json());
    app.use(cors({
      origin: 'http://localhost:4321',
      credentials: true
    }));


    //  jsonParseErrorHandler: 
    //
    //  Esto es un middleware. Es una funcion que utilizamos para los errores de sintaxis en el body de las request que recibimos del frontend



    //  limiTotal:
    //
    //  LimiTotal es un middleware que se encarga de verificar que las solicitudes realizadas no sean hechas por bots, también limita la cantidad
    //  de solicitudes que un usuario puede hacer a 100 cada 15 minutos.

    app.use(jsonParseErrorHandler);
    app.use(limiTotal);


    //  session:
    //
    //  session viene de una libreria llamada express-session.
    //  nos permite guardar los datos de los usuarios que se loggeen en algo llamado sesiones.
    //  Las sesiones son información que se guardan en el navegador, la cual el navegador envia cada vez que realiza una petición.
    //  Estas sesiones no son accesibles por el usuario ni el front-end, solo podemos acceder desde el backend, lo que las hace seguras y convenientes.
    //  Tener estas sesiones nos permite acceder a datos del usuario activo, sin necesidad de que el front-end envie datos.


    app.use(session({
        secret: process.env.KEY_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: parseInt(process.env.EXPRESS_EXPIRE) }
      }));

      
    //  Inicializamos Passport
    //
    //  Passport es una libreria de express que nos permite trabajar con las sesiones y autenticaciones con terceros de manera mucho más sencilla.
    //  Con algo llamado estrategias, podemos autenticar y almacenar los datos cuando se loguean con terceros de manera sencilla.
    
    app.use(passport.initialize());
    app.use(passport.session());


    //  Utilizamos los archivos estaticos, para poder levantar el front-end



    //  Aqui utilizamos todas las rutas que tenemos definidas

    app.use('/user', userRoutes)
    
    return app;
};

module.exports = createServer;