const { validationResult } = require('express-validator')
const userService = require('../services/userServices')
const bcrypt = require('bcryptjs/dist/bcrypt')
const passport = require('passport')


class userController {

    //  We instantiate the class userService

    constructor() {

        this.UserService = new userService()

    }


    //  Method to verify the user (Log-in)

    async verifyUser(req, res, next) {

        passport.authenticate('local', (err, user, info) => {

            if (err) return next(err)
            if (!user) {

                return res.status(401).json({ message: info.message })

            }

            req.logIn(user, (err) => {

                if (err) return next(err)
                return res.redirect("./Home")

            })
            
        })(req, res, next)

    }



    //  Method to create an user

    async createUser(req, res, next) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    

            req.body.favorites = []
            req.body.purchases = []
            req.body.registeredWorkshops = []
            req.body.coupons = []
    

            const verifyExistentUser = await this.UserService.getUserByIdentifier(req.body.identifier)
            if (verifyExistentUser.status != undefined) {

                const verifyExistentUserEmail = await this.UserService.getUserByEmail(req.body.email)
    
                if (verifyExistentUserEmail.status != undefined){

                    const user_final = req.body
                    user_final.password = await bcrypt.hash(user_final.password, 10)
                    const result = await this.UserService.insertUser(user_final)
        
                    if (result.insertedCount === 1) {
    
                        const newUser = await this.UserService.getUserByIdentifier(req.body.identifier)
        
    
                        req.logIn(newUser, (err) => {
                            if (err) return next(err)
        
                            console.log("Usuario creado y logueado")
                            return res.status(200).json({ message: "Usuario creado y autenticado exitosamente" })
                        })
                    } else {
    
                        return res.status(500).json({ message: "Error interno, no se pudo crear el usuario" })
    
                    }

                } else {

                    return res.status(401).json({ message: "Ya existe un usuario con ese email" })

                }
           
            } else {

                return res.status(401).json({ message: "Ya existe un usuario con ese identifier" })

            }
        } catch (error) {

            return res.status(500).json({ message: error.message })

        }
    }


    //  Method to log-out

    async closeSession(req, res) {
        req.logout(err => {
            if (err) {
                console.error('Error al cerrar sesión:', err)
                return res.status(500).send("Error durante el logout.")
            }
            req.session.destroy(err => {
                if (err) {
                    console.error('Error al destruir la sesión:', err)
                    return res.status(500).send("Error durante el logout.")
                }
                res.clearCookie('connect.sid')
                res.redirect(`http://localhost:4321`)
            })
        })
    }


    //  Method to delete an user

    async deleteUser(req, res, next) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    

            const userId = req.user._id
    

            const deleteResult = await this.UserService.deleteUser(userId)
    

            if (deleteResult.deletedCount === 1) {

                req.logout((err) => {
                    if (err) return next(err)
    

                    req.session.destroy((err) => {
                        if (err) return next(err)
                        return res.status(200).json({ message: "El usuario fue eliminado con éxito y la sesión ha sido cerrada" })
                    })
                })
            } else {

                return res.status(500).json({ message: "Error del sistema al eliminar al usuario" })

            }
        } catch (error) {

            return res.status(500).json({ message: error.message })

        }
    }


    //  Method to update an user

    async updateUser(req, res, next) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    

            if (!req.isAuthenticated()) {
                return res.status(401).json({ message: "Usuario no autenticado" })
            }
    

            const userId = req.user._id
    

            let dataUpdate = req.body.updateData
    

            if (dataUpdate.email !== undefined) {
                return res.status(400).json({ message: "No puedes modificar tu email" })
            }
    

            if (dataUpdate.identifier !== undefined) {
                const verifyExistentUser = await this.UserService.getUserByIdentifier(dataUpdate.identifier)
    
                if (verifyExistentUser && verifyExistentUser.status === undefined) {
                    return res.status(406).json({ message: "Ese identifier ya está en uso, intenta con otro" })
                }
            }
    

            if (dataUpdate.password !== undefined) {
                dataUpdate.password = await bcrypt.hash(dataUpdate.password, 10)
            }
    

            const data = { _id: userId, updateData: dataUpdate }
    

            const Update = await this.UserService.updateUser(data)
    
            if (Update.modifiedCount === 1) {

                return res.status(200).json({ message: "El usuario fue actualizado con éxito" })

            } else if (Update.status === 400) {

                return res.status(400).json({ message: "No hubo cambios en la información" })

            } else {

                return res.status(500).json({ message: "Error del sistema al actualizar al usuario" })

            }
        } catch (error) {

            return res.status(500).json({ message: error.message })
            
        }
    }

    async updateUserArrays(req, res) {

        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

            const update = await this.UserService.updateUserArray(req.user._id, req.body)

            return res.status(update.status).json(update)

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                message: "Error al actualizar el usuario",
                error: error.stack
            })
        }

    }

}

module.exports = userController