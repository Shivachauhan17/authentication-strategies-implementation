const passport=require("passport")
const GoogleStrategy=require('passport-google-oauth20').Strategy;

const User=require('../models/user')
const GOOGLE_CALLBACK_URL="http://localhost:5000/api/v1/auth/google/callback"

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET_ID,
    callbackURL:GOOGLE_CALLBACK_URL,
    passReqToCallback:true
}),async (req,accessToken,refreshToken,profile,cb)=>{

    const defaultUser={
        fullName:`${profile.name.givenName} ${profile.name.familyName}`,
        email:profile.email[0].value,
        picture:profile.photos[0].value,
        googleId:profile.id,
    }

    const user=await User.findOrCreate({where:{googleId:profile.id},defaults:defaultUser}).catch(error=>{
        console.log("error in strategy imp when checking the db for user")
        cb(err,null);
    })



})


