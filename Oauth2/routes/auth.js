const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID:process.env['GOOGLE_CLIENT_ID'],
    clientSecret:process.env['GOOGLE_SECRET_ID'],
    callbackUrl:'oauth2/redirect/googl',
    scope:['profile'],
    state:true
},

async function(req,accessToken,refreshToken,profile,cb){

    const defaultUser={
        fullName:`${profile.name.givenName} ${profile.name.familyName}`,
        email:profile.emails[0].value,
        picture:profile.photos[0].value,
        googleId:profile.id
    }

    const user=User.findOrCreate({
        where:{googleId:profile.id},
        defaults:defaultUser
    }).catch(err=>{
        console.log("error signing up",err);
        cb(err,null);
    })

    if(user && user[0]) return cb(null,user && user[0]);
}

))

passport.serializeUser((user,cb)=>{
    console.log("serializing to:",user)
    cb(err,null);
})

passport.deserializeUser(async (id,cd)=>{
    console.log("deserializing user id:",id)
    const user=User.findOne({where:{id}}).catch((err)=>{
        cb(err,null);
    })

    if(user){
        cb(null,user);
    }
})

