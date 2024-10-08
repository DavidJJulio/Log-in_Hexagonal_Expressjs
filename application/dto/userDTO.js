
//  Definimos la clase que se va a encargar de transicionar la informacion entrante con la que manejamos en el backend y viceversa.
//  En este proyecto, el DTO de usuarios se encargara de recibir la informacion proporcionada por los autenticadores de terceros o el frontend
//  y adaptarla a como nosotros la insertamos en nuestra base de datos.

//  Esto con el motivo de hacer el proyecto mas escalable

class UserDTO {






    /**
     * Cambiar un usuario de Google a uno de nuestro aplicativo
     * 
     * @param {Object} userData - Objeto con los datos del usuario de google
     * @returns {Object} Objeto con el schema y los datos del usuario
     */

    deGoogle_A_UsuarioDTO(userData) {

        const result = {
                
            google_id: userData.sub,
            nickName: userData.name,
            password: null,
            email: userData.email,
            profilePicture: userData.picture,
            address: null,
            phone: null,
            type: "usuario"

        }


        return result

    }







    /**
     * Cambiar un usuario de Github a uno de nuestro aplicativo
     * 
     * @param {Object} userData - Objeto con los datos del usuario de google
     * @returns {Object} Objeto con el schema y los datos del usuario
     */

    deGithub_A_UsuarioDTO(userData) {

        const result = {
                
            github_id: userData.id,
            nickName: userData.login,
            password: null,
            email: userData.email,
            profilePicture: userData.avatar_url,
            address: null,
            phone: null,
            type: "usuario"

        }


        return result

    }






    /**
     * Cambiar un usuario de Discord a uno de nuestro aplicativo
     * 
     * @param {Object} userData - Objeto con los datos del usuario de google
     * @returns {Object} Objeto con el schema y los datos del usuario
     */

    deDiscord_A_UsuarioDTO(userData) {

        const result = {
                
            discord_id: userData.id,
            nickName: userData.username,
            password: null,
            email: userData.email,
            profilePicture: null,
            address: null,
            phone: null,
            type: "usuario"

        }

        
        return result

    }

    

}