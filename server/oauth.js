const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

//importa el código de databseConnect, que conecta a la base de datos de MongoDB
const User = require('./databaseConnect.js')

require('dotenv').config()

//usa la estrategia antes definida
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/" //una vez recibida la respuesta de Google, redirige a esta URI
    }, (accessToken, refreshToken, profile, done) => {
        //intenta encontrar un usuario con la misma información que nos devuelve Google
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            //si lo encuentra, termina el proceso con la información dada
            if(currentUser){
                console.log('found: ', currentUser)
                done( null, currentUser )
            } else { 
                //si no lo encuentra, crea un nuevo usuario usando el modelo User y los datos que nos dio Google
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                // y lo guarda en la base de datos
                }).save().then((newUser) => {
                    console.log('creates: ', newUser)
                    done( null, newUser ) //termina el proceso con el nuevo usuario
                })
            }
        });
    }
));

//serializa el usuario para las peticiones HTTP
passport.serializeUser((user, done) => {
    var sessionUser = { _id: user._id, username: user.username }
    done(null, sessionUser)
});
    
//deserializa el usuario al otro lado de la peticion HTTP
passport.deserializeUser((sessionUser, done) => {
    done(null, sessionUser)
});