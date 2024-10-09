//  IMPORTACIONES

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const userService = require('../services/userServices')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const DiscordStrategy = require('passport-discord').Strategy;
const GitHubStrategy = require('passport-github2').Strategy



//  Estrategia para hacer el Log-in de manera local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'identifier',
      passwordField: 'password'
    },
    async (identifier, password, done) => {
      try {
        const userServiceInstance = new userService();
        const user = await userServiceInstance.getUserByIdentifier(identifier);

        if (!user || user.status) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {

          return done(null, false, { message: 'Contraseña incorrecta' });
        }
        // Si todo está bien, devolvemos el usuario
        const user_final = user
        await delete user_final.password
        return done(null, user_final);
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
      callbackURL: 'http://localhost:3000/user/auth/discord/callback',
      scope: ['identify', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userServiceInstance = new userService();

        let user = await userServiceInstance.getUserByIdDiscord(profile.id);

        if (user.status == 404) {
          // Si no se encuentra al usuario, lo creamos con los datos obtenidos de Discord
          user = await userServiceInstance.createDiscordUser(profile);

          if (user.insertedCount == 1) {
            user = await userServiceInstance.getUserByIdDiscord(profile.id);
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


//  Estrategia de google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/user/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        const userServiceInstance = new userService();

        let user = await userServiceInstance.getUserByIdGoogle(profile.id);

        if (user.status == 404) {

        user = await userServiceInstance.createGoogleUser(profile._json)

        if (user.insertedCount == 1){

          user = await userServiceInstance.getUserByIdGoogle(profile.id)

        }
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);



//  Estrategia de github
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'http://localhost:3000/user/auth/github/callback',
  scope: ['user:email']
},
async (accessToken, refreshToken, profile, done) => {
  try {

    const userServiceInstance = new userService();
    let user = await userServiceInstance.getUserByIdGithub(profile._json.id);

    if (user.status == 404) {

      user = await userServiceInstance.createGithubUser(profile._json);

    }
    if (user.insertedCount == 1){

      user = await userServiceInstance.getUserByIdGithub(profile._json.id)

    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}
));




//  Serializar el usuario para almacenar solo el ID en la sesión
passport.serializeUser((user, done) => {
  done(null, user._id);
});



//  Deserializar el usuario a partir del ID almacenado en la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const userServiceInstance = new userService();
    const user = await userServiceInstance.getUserById(id);
    const user_final = {...user}
    delete user_final.password
    done(null, user_final);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;