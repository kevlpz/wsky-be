const Users = require('./users/usersModel')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (username, password, done) => {
            Users.getByEmail(username)
                .then(user => {
                    console.log('get')
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            return done(err)
                        }
                        if(result === true) {
                            return done(null, user)
                        } else {
                            return done(null,false)
                        }
                    })
                })
                .catch(err => {
                    console.log('strat err: ', err)
                    return done(err)
                })
        })
    )
}

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
    Users.getById(id)
        .then(user => cb(err, user))
        .catch(err => console.log('Error deserializing user'))
})