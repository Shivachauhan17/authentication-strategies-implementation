const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const validPassword = require('../lib/passwordUtil').validPassword;


module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'userName' }, async (username, password, done) => {

    await User.findOne({ userName: username })
        .then((user) => {
            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.hash, user.salt);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

    }))
      passport.serializeUser((user, done) => {
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
    