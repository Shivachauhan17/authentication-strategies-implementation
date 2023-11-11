const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null},
    password:{
        type:String,
        default:null},
    googleId:{
        type:String,
        default:null},
    picture:{
        type:String,
        default:null}
});

module.exports=mongoose.model('User',userSchema)