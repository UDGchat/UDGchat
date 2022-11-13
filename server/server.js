import express from 'express'
import cors from 'cors'
import './oauth.js'
import passport from 'passport'
import expressSession from "express-session"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

app.use(expressSession({
    secret:[process.env.SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    cookie: {
        //secure: true,        //for https sites only
        maxAge: 60*60*1000,    // milliseconds of a day
    }
}));


app.use(passport.initialize());
app.use(passport.session());   

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/auth/google/redirect", passport.authenticate('google'), (req, res) => {
    if(!req.user)
        res.redirect("back")
    res.send(req.user);
    res.send("you reached the redirect URI")
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

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})