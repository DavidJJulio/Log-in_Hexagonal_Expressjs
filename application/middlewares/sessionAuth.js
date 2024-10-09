const session = require('express-session');
const sessionAuth = require('express').Router();


//  This module uses the library express-session.
//  Express-session creates a session and a cookie in the navigator
//  if you use express-session as a middleware, it will verify if the user has a session
//  and manage cookies automatically.


module.exports = sessionAuth.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: parseInt(process.env.EXPRESS_EXPIRE)
    }
}))