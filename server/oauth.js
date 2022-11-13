import mongoose from 'mongoose'
import passport from 'passport'
import strategies from 'passport-google-oauth20';

import './databaseConnect.js'

import dotenv from "dotenv"
dotenv.config()

const GoogleStrategy = strategies.Strategy

const user_info = new mongoose.Schema({
    googleId: String,
    username: String,
})

const User = mongoose.model('user_info', user_info)

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id, username: profile.displayName}).then((currentUser) => {
            if(currentUser){
                done( null, currentUser )
            } else {
                new User({
                    googleId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    done( null, newUser )
                })
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done( null, user)
    });
    });