const User=require('../models/user')

const findOneOrCreate=async (id,defaultUser)=>{
   const user=await User.findOneAndUpdate({googleId:id},defaultUser,{new:true,upsert:true})
    return user;
   
}

module.exports.findOneOrCreate=findOneOrCreate