const crypto=require('crypto')


function genPassword(password){
    const salt=crypto.randomBytes(32).toString('hex')
    const genHash=crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')

    return{
        salt:salt,
        hash:genHash
    }
}


function validPassword(password,hash,salt){
    const genHash=crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')

    return hash===genHash

}

module.exports.genPassword=genPassword;
module.exports.validPassword=validPassword;