const Users = require('./users/usersModel')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    console.log('local strategy')
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

    // passport.use(
    //     new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
    //         try{
    //                 const user = await Users.getByEmail(username)
    //                 console.log('get')
    //                 const result = await bcrypt.compare(password, user.password)

    //                 if(!result) done(null, false)
    //                 return done(null, user)

    //             }
    //             catch (err) {
    //                 console.log('strat err: ', err)
    //                 return done(err)
    //             }
    //     })
    // )

    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })
    passport.deserializeUser((id, cb) => {
        Users.getById(id)
            .then(user => cb(err, user))
            .catch(err => console.log('Error deserializing user'))
    })
}
