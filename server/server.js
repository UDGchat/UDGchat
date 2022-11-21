import express from 'express'
import cors from 'cors'
import passport from 'passport'
import expressSession from "express-session"
import path from 'path'
const __dirname = path.resolve(path.dirname('')); 

import './oauth.js' //importa el código de oauth.js y lo ejecuta
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
const corsOptions = {
    origin: 'http://localhost:3000'
}

//declara una nueva sesión con express-session
app.use(expressSession({
    secret:[process.env.SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    cookie: {
        //secure: true,        //for https sites only
        maxAge: 60*60*1000,    // milliseconds of a day
    }
}));

//inicializa el modulo passport y usa la sesión declarada antes
app.use(passport.initialize());
app.use(passport.session());   

app.get("/auth/google", cors(corsOptions), passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/", passport.authenticate('google'), (req, res) => {
    if(!req.user)
        res.redirect("back")
    res.redirect('http://localhost:3000/')
});

app.get("/auth/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        else if(!req.user){
            res.send('<p>Connection terminated</p>')
        }
        else res.send('<p>Termination unsuccessful</p>')
    });
})

app.use(express.json()) //para ser capaces de enviar y recibir .json en las peticiones HTTP

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})