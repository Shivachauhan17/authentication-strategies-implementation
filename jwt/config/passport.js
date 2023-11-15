const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const fs = require('fs');
const path = require('path');
const User = require('../models/user');


const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// TODO
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };

// TODO
module.exports = (passport) => {

        passport.use(new JwtStrategy(options,(jwt_payload,done)=>{

            console.log(jwt_payload)

            User.findOne({_id:jwt_payload.sub})
                .then(user=>{
                    if(user)
                        return done(null,user);
                    else
                        return done(null,false);
                })
                .catch(err=>{
                    return done(null,false);
                })

        }
        )
        )

}