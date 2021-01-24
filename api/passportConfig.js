const Users = require('./users/usersModel')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            Users.getByEmail(email)
                .then(user => {
                    if(!user) {
                        return done(null, false)
                    } else {
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
                    }
                })
                .catch(err => {
                    return done(err)
                })
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        Users.getById(id)
            .then(user => done(null, user.id))
            .catch(err => {
                console.log('Error deserializing user', err)
                done(err)
            })
    })
}
