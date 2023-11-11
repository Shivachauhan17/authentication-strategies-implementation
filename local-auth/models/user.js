const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: String,
    hash: String,
    salt: String
});


module.exports=mongoose.model('User', UserSchema);