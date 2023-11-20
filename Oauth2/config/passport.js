
const GoogleStrategy =require('passport-google-oauth20').Strategy;
const User=require('../models/user')


require('dotenv').config()
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_SECRET_ID
module.exports=(passport)=>{
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  async function(req,accessToken, refreshToken, profile, cb) {
    const defaultUser={
      fullName:profile.displayName,
      email:profile._json.email,
      googleId:profile.id,
      picture:profile._json.picture,
    }
try{
  const user=await User.findOneAndUpdate({googleId:profile.id},defaultUser,{new:true,upsert:true})
   if(!user){
    return cb(null, false)
   }
   else{
    return cb(null,user)
   }
  }
  catch(err){
    return cb(err,false);
  }
  }
));

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  console.log("deserialize user");
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
  
  }
  

