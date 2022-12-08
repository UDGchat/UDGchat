const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

//importa el código de databseConnect, que conecta a la base de datos de MongoDB
const User = require('./databaseConnect.js')

require('dotenv').config()

function createNewUser(profile, done){
    new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile._json.email,
        photo: profile._json.picture,
        locale: profile._json.locale
    // y lo guarda en la base de datos
    }).save().then((newUser) => {
        done( null, newUser ) //termina el proceso con el nuevo usuario
    })
}

function checkUser(profile, done){
    //intenta encontrar un usuario con la misma id que nos devuelve Google
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        //si lo encuentra, termina el proceso con la información dada en la autenticación
        if(currentUser){
            done( null, currentUser )
        } else { 
            //si no lo encuentra, crea un nuevo usuario usando el modelo User y los datos que nos dio Google
            createNewUser(profile, done)
        }
    });
}

//usa la estrategia antes definida
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/" //una vez recibida la respuesta de Google, redirige a esta URI
    }, (accessToken, refreshToken, profile, done) => {
        checkUser(profile, done)
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
        locale: user.locale
    }
    done(null, sessionUser)
});
    
//popula el campo req.user usando el cabezal session.passport.user
passport.deserializeUser((sessionUser, done) => {
    done(null, sessionUser)
});