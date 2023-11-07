const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
    },
    email:String,
    password:String,
    googleId:String,
    picture:String,
});

module.exports=mongoose.model('User',userSchema)