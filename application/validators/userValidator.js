//  IMPORTACIONES

const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');


class userValidator {


    //  Metodo para validar que el cuerpo de la ruta Log-in sea el correcto

    validateUserLogin = () => {

        return [

            body('identifier').notEmpty().isString().withMessage('Envia el identificador con el que se creo la cuenta'),
            
            body('password').notEmpty().isLength({ min: 8 }).isString().withMessage('La contraseña debe ser mayor a 8 caracteres'),

            query().custom((value, { req }) => {

                if (Object.keys(req.query).length > 0) {

                    throw new Error(`No envies nada en la url`);

                }

                return true;
            })
        ]

    }


    //  Metodo para validar que el cuerpo de la ruta Sign-up sea el correcto

    validateUserSignUp = () => {

        return [

            body('identifier').notEmpty().isString().withMessage('Envia el identificador con el que el usuario le Logueara'),
            body('nickName').notEmpty().isString().withMessage('Envia el nombre de usuario'),
            body('password').notEmpty().isLength({ min: 8 }).isString().withMessage('La contraseña debe ser mayor a 8 caracteres'),
            body('email').isString().withMessage('Envia un email valido').matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
            body('profilePicture').isString().withMessage('Envia la url de la foto en formato string'),
            body('address').notEmpty().isString().withMessage('Envia la direccion en formato string'),
            body('phone').isString().withMessage('Envia el numero de telefono en formato string'),
            body('type').notEmpty().isString().withMessage('Envia el tipo de usuario, de momento solo existe (usuario)').isIn(['usuario']),
            body().custom((_, { req }) => {
                const allowedFields = ['nickName', 'password', 'email', 'profilePicture', 'address', 'phone', 'type'];
                const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    
                if (extraFields.length > 0) {
                    throw new Error(`Unexpected fields: ${extraFields.join(', ')}`);
                }
    
                return true;
            })
        ];
    }


    //  Metodo para validar el Id del usuario

    validateUserId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Envia un ID valido, MongoDB ObjectId');
                }
                return true;
            }),
        ]
    }

    
    //  Metodo para validar que el cuerpo de la ruta updateData sea el correcto

    validateUserUpdate = () =>{

        return [

            body('updateData').isObject().withMessage('Envia un objeto de la siguiente forma, {"(Llave a actualizar)", : "(Modificacion a realizar)"')

        ]

    }


    //  Metodo para validar el cuerpo de la ruta updateArray

    validateUserUpdateArray = () =>{

        return [

            body('llave').isString().withMessage("Envia una de las siguientes llaves: (Llenar con las llaves necesarias para el examen)"),
            body('array').isArray().withMessage("Array de object ids"),
            body('action').isString().withMessage("Si quieres eliminar objetos, mandar el .action con el string pull").optional()

        ]

    }

}

module.exports = userValidator