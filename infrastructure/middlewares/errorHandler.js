//  En este middleware manejaremos todos los errores que se pueden presentar a la hora de hacer request a nuestro backend.

//  jsonParseErrorHandler -> Esta funcion recoge el error, la request y la response.
//                           Verifica si el error es de tipo sintaxis, y si el error tiene body.
//                           En ese caso, retorna el error como response, sin tumbar el servidor.

exports.jsonParseErrorHandler = (err, req, res, next) => {

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

        console.error('Error de sintaxis JSON:', err.message);

        return res.status(400).json({
            message: 'Invalid JSON format. Please check the data and try again.'
        });

    }

    next();
    
}