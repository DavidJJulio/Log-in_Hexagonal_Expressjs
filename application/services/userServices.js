//  MODULE THAT COORDINATES INTERACTIONS BETWEEN THE DOMAIN AND THE APPLICATION

//  IMPORTS

const userRepository = require('../../domain/repository/userRepository')



//  Class to manage a common error we are going to be sending a lot of times (hopefully not)

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
    }
}


class userService {

    //  The constructor, the function that is executed when we are instantiating the class
    //  is going to instantiate the class userRepository, because userService needs this class
    //  to work

    constructor(){

        this.userRepository = new userRepository()

    }

    //  Method to create a user from the google authentication

    async createGoogleUser(data) {

        try {

            let insertUser = {
                
                google_id: data.sub,
                nickName: data.name,
                password: "Unknown",
                email: data.email,
                profilePicture: data.picture,
                address: "",
                phone: "",
                type: "usuario",
                favorites: [],
                purchases: [],
                registeredWorkshops: [],
                coupons: []
    
            }
    
            const user = await this.userRepository.insertarUsuario(insertUser);

            return user;
    
            } catch (error) {
                
                throw error
                
        }

    }


    async createGithubUser(data) {

        try {

            let insertUser = {
                
                github_id: data.id,
                nickName: data.login,
                password: "Unknown",
                email: data.email,
                profilePicture: data.avatar_url,
                address: "",
                phone: "",
                type: "usuario",
                favorites: [],
                purchases: [],
                registeredWorkshops: [],
                coupons: []
    
            }
    
            const user = await this.userRepository.insertarUsuario(insertUser);

            return user;
    
            } catch (error) {
                
                throw error
                
        }

    }

    async createDiscordUser(data) {

        try {

            let insertUser = {
                
                discord_id: data.id,
                nickName: data.username,
                password: "Unknown",
                email: data.email,
                profilePicture: null,
                address: "",
                phone: "",
                type: "usuario",
                favorites: [],
                purchases: [],
                registeredWorkshops: [],
                coupons: []
    
            }
    
            const user = await this.userRepository.insertarUsuario(insertUser);

            return user;
    
            } catch (error) {
                
                throw error
                
        }

    }


    //  Method to get a user by the google_id

    async getUserByIdGoogle(id){
        try {
            
        //  We execute the method
        const user = await this.userRepository.buscarUsuarioPorIDGoogle(id);

        //  If the result is an empty array, or undefined
        if (!user) {

            //  We instantiate the errors class we created at the beginning
            return new NotFoundError('User not found')

        }

        //  If the result is a user, then return that.
        return user;

        } catch (error) {
            
            throw error
            
        }

    }

    async getUserByIdDiscord(id){
        try {
            
        //  We execute the method
        const user = await this.userRepository.buscarUsuarioPorIDDiscord(id);

        //  If the result is an empty array, or undefined
        if (!user) {

            //  We instantiate the errors class we created at the beginning
            return new NotFoundError('User not found')

        }

        //  If the result is a user, then return that.
        return user;

        } catch (error) {
            
            throw error
            
        }

    }


    async getUserByIdGithub(id){
        try {
            
        //  We execute the method
        const user = await this.userRepository.buscarUsuarioPorIDGithub(id);

        //  If the result is an empty array, or undefined
        if (!user) {

            //  We instantiate the errors class we created at the beginning
            return new NotFoundError('User not found')

        }

        //  If the result is a user, then return that.
        return user;

        } catch (error) {
            
            throw error
            
        }

    }


    //  Method that it's going to find any user with the id that matches
    
    async getUserById(id){
        try {
            
        //  We execute the method
        const user = await this.userRepository.buscarUsuarioPorID(id);

        //  If the result is an empty array, or undefined
        if (!user) {

            //  We instantiate the errors class we created at the beginning
            return new NotFoundError('User not found')

        }

        //  If the result is a user, then return that.
        return user;

        } catch (error) {
            
            throw error
            
        }

    }


    //  Method that it's going to find any user with the matched nickname 

    async getUserByIdentifier(identifier){

        try {
            
            const [user] = await this.userRepository.buscarUsuarioPorIdentifier(identifier)
            if (!user) {
                
                return new NotFoundError('User not found')

            }

            return user

        } catch (error) {
            
            throw error

        }
        
    }


    //  Method that it's going get and or validate the password of a user

    async validateUserByPasswordAndNick({password: password, nickName: nickname}){

        try {
            
            const [user] = await this.userRepository.buscarUsuarioPorNickname(nickname)
            if (!user) {

                return new NotFoundError('User not found')

            }

            const token = await this.userRepository.validarUsuarioContraseñaJWT({user: user, contraseña: password})
            if (token.status != undefined) {
                
                return new NotFoundError("Password didn't match")

            }

            return token

        } catch (error) {
            
            throw error

        }

    }


    //  Method that it's going to find any user with the matched email

    async getUserByEmail(email){

        try {
            
            const user = await this.userRepository.buscarUsuarioPorCorreo(email)

            if (user.length < 1) {
                
                return new NotFoundError('User not found')

            }

            return user

        } catch (error) {
            
            throw error

        }

    }


    //  Method that it's going to insert a new user in the database

    async insertUser(data){

        try {
            
            const user = await this.userRepository.insertarUsuario(data)

            return user

        } catch (error) {
            
            throw error

        }

    }


    //  Method that it's going to delete a user from the database

    async deleteUser(id){

        try {
            
            const user = await this.userRepository.eliminarUsuario(id)

            return user

        } catch (error) {
            
            throw error

        }

    }


    //  Method that it's going to update something from a user in the database

    async updateUser(data){

        try {
            
            const user = await this.userRepository.modificarUsuario(data)

            return user

        } catch (error) {
            
            throw error

        }

    }

    async updateUserArray(_id, Object){

        try {
            
            const user = await this.userRepository.findByIdAndUpdateArrays(_id, Object)

            return user

        } catch (error) {
            
            throw error

        }

    }

}

module.exports = userService