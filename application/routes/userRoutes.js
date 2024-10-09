//  IMPORTACIONES

const express = require('express')
const userController = require('../controllers/userController')
const userValidator = require('../validators/userValidator')
const isAuthenticated = require('../middlewares/isAuthenticated')
const passport = require('passport');


//  Definimos router (Manejo de rutas), controladores y validadores.

const router = express.Router({ mergeParams: true });
const controller = new userController();
const validator = new userValidator();


//  Creamos las rutas


//  /Home → El proposito de esta ruta es simplemente implementar la lógica del login y verificar que todo funcione, devolvemos los datos del usuario logueado.
router.get('/Home', isAuthenticated, async (req, res) => {res.status(200).json(req.user)})



//  /updateArray → El proposito de esta ruta es añadir favoritos, compras, talleres, cupones a un usuario.
router.post('/updateArray', isAuthenticated, validator.validateUserUpdateArray(), async (req, res) => controller.updateUserArrays(req, res))


//  /createUser → El proposito de esta ruta es crear un usuario en la base de datos. Solamente hay que mandar los datos en el body. Formato Json
router.post('/createUser', express.json(), validator.validateUserSignUp(), (req, res) => controller.createUser(req, res))



//  /login → El proposito de esta ruta es validar un usuario, recibe nickName y password en el body de la request. Formato Json
router.post('/login', validator.validateUserLogin(), (req, res, next) => controller.verifyUser(req, res, next));



//  /deleteUser → El proposito de esta ruta es eliminar un usuario. No requiere de absolutamente nada solo la request.
//                si no esta logueado no permite acceder a la ruta.
router.get('/deleteUser', isAuthenticated, express.json(), (req, res) => controller.deleteUser(req, res))



//  /updateUser → El proposito de esta ruta es actualizar un usuario. Permite actualizar cualquier campo menos el email, y el nickName solo si nadie más lo tiene
router.post('/updateUser', isAuthenticated, validator.validateUserUpdate(), (req, res) => controller.updateUser(req, res))



//  /logout →   Desloguea de la cuenta, sin importar con que metodo se haya logueado. Necesita estar logueado para acceder a este metodo.
router.get('/logout', isAuthenticated, controller.closeSession)



//  /auth/google →  Ruta para autenticarse con google.
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));



//  /auth/github →  Ruta para autenticarse con github.
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));



//  /auth/google/callback → Ruta que recibe la autenticación con google. Aqui se cargan los datos del usuario y se maneja los errores.
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user' }),(req, res) => {console.log(req.user)});



//  /auth/github/callback → Ruta que recibe la autenticación con github. Aqui se cargan los datos del usuario y se maneja los errores.
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/user' }),(req, res) => {console.log("callback", req.user)});



//  /userData → Ruta que devuelve los datos del usuario logueado.
router.get('/userData', isAuthenticated, (req, res) => {return res.status(200).json(req.user)})



//  /auth/discord → Ruta para autenticarse con Discord.
router.get('/auth/discord', passport.authenticate('discord'));



//  /auth/discord/callback → Ruta que recibe la autenticación con Discord.
router.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/user' }), (req, res) => { console.log("callback", req.user); res.redirect('/userData')});



// router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/user' }),(req, res) => {console.log(req.user)});
// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['emails'] }));



module.exports = router