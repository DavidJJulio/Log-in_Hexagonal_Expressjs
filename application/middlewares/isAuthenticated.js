//  Basically, this module verifies if exist a session, and if the session has te information of a user. 
//  If it does, then let's the user consume the API
//  if it doesn't, then returns an error.

module.exports = function isAuthenticated(req, res, next) {

    if (req.user) {
        
        next()
        
    }
    else {

        res.status(401).json({ message: "No autorizado, no se encuentra ninguna sesion activa" });

    }

}