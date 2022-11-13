import mongoose from 'mongoose'
import passport from 'passport'
import strategies from 'passport-google-oauth20';

//importa el código de databseConnect, que conecta a la base de datos de MongoDB
import './databaseConnect.js'

import dotenv from "dotenv"
dotenv.config()

//inicializa la estrategia para autenticación con Google en 'passport-google-oauth20'
const GoogleStrategy = strategies.Strategy

//crea un nuevo esquema para la colección 'user_info' de la base de datos
const user_info = new mongoose.Schema({
    googleId: String,
    username: String,
})

//crea un nuevo modelo de la colección 'user_info' basado en el esquema del mismo nombre
const User = mongoose.model('user_info', user_info)

//usa la estrategia antes definida
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect" //una vez recibida la respuesta de Google, redirige a esta URI
    }, (accessToken, refreshToken, profile, done) => {
        //intenta encontrar un usuario con la misma información que nos devuelve Google
        User.findOne({ googleId: profile.id, username: profile.displayName}).then((currentUser) => {
            //si lo encuentra, termina el proceso con la información dada
            if(currentUser){
                done( null, currentUser )
            } else { 
                //si no lo encuentra, crea un nuevo usuario usando el modelo User y los datos que nos dio Google
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                // y lo guarda en la base de datos
                }).save().then((newUser) => {
                    done( null, newUser ) //termina el proceso con el nuevo usuario
                })
            }
        });
    }
));

//serializa el usuario para las peticiones HTTP
passport.serializeUser((user, done) => {
    done(null, user.id);
});
    
//deserializa el usuario al otro lado de la peticion HTTP
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done( null, user)
    });
});