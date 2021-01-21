const User = require('./users/usersModel')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy
const passport = require('passport')

module.exports = function(passport) {
    passport.use(
        new localStrategy((email, password, done) => {
            User.getByEmail(email)
                .then(user => {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if(result === true) {
                            return done(null, user)
                        } else {
                            return done(null,false)
                        }
                    })
                })
        })
    )
}

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
    User.getById(id)
        .then(cb(err, user))
        .catch(err => console.log('Error deserializing user'))
})