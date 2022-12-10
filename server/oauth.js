const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { Snowflake } = require('nodejs-snowflake')

//importa el código de databseConnect, que conecta a la base de datos de MongoDB
const { checkUser } = require('./dataHandler')

require('dotenv').config()

//usa la estrategia antes definida
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/" //una vez recibida la respuesta de Google, redirige a esta URI
    }, async (accessToken, refreshToken, profile, done) => {
        await checkUser(profile, done)
    }
));

//popula el campo de session.passport.user en los cabezales de las requests
passport.serializeUser((user, done) => {
    var sessionUser = 
    { 
        _id: user._id, 
        username: user.username, 
        email: user.email, 
        photo: user.photo,
        locale: user.locale,
        epoch: user.epoch
    }
    done(null, sessionUser)
});
    
//popula el campo req.user usando el cabezal session.passport.user
passport.deserializeUser((sessionUser, done) => {
    done(null, sessionUser)
});