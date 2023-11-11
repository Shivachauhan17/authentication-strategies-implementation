const Strategy=require('passport-local').Strategy
const User=require('../models/user')
const validPassword=require('../lib/passwordUtil').validPassword


const customField={
    username:'userName',
    password:'password'
}

const verifyCallback=async (username,password,cb)=>{
console.log("in verify")
console.log(username)
console.log(password)
await User.findOne({userName:username})
    .then(user=>{
        if(!user) {return cb(null, false);}

        const isvalid=validPassword(password,user.hash,user.salt)

        if(isvalid){
            console.log("in verify user is",user)
            return cb(null,user);
        }
        else{
            return cb(null,false);
        }

    })
    .catch((err)=>{
        cb(err);
    })
}


module.exports=function (passport){

const strategy=new Strategy(customField,verifyCallback);
passport.use(strategy)

passport.serializeUser((user,cb)=>{
    console.log("in serialize user id is",user.id)
    cb(null,user.id)
})

passport.deserializeUser(async (userId,cb)=>{
    await User.findById(userId)
        .then((user)=>{
            cb(null,user);
            console.log("in deserialize user",user)
        })
        .catch((err)=>{
            cb(err,false)
        })
})

}