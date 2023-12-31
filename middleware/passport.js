const passport = require("passport");
const LocalStrategy = require("passport-local");
const userModel = require('../models/user.model');
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt;
const utils = require('../utils/utils');

const jwtOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "12345-67890-09876-54321",
}
const jwtStrategy = new JwtStrategy(jwtOption, async (payload, done) => {
    console.log("Payload:", payload);
    try {
        const existingUser = await userModel.findOne({
            where: {
                u_username: payload.sub
            }
        });
        console.log("Existing User:", existingUser);
        if (!existingUser) {
            return done(null, false);
        }
        return done(null, existingUser);
    } catch (err) {
        console.error(err);
        return done(err, false);
    }
})

passport.use(jwtStrategy);

// passport.use(new LocalStrategy(async function verify(username, password, callback) {
//     try {
//         const existingUser = await userModel.findOne({
//             where: {
//                 u_username: username
//             }
//         });
//         if (!existingUser) {
//             return callback(null, false);
//         } else {
//             if (!validPassword(password, existingUser.u_password)) {
//                 return callback(null, false);
//             }
//         }
//         return callback(null, existingUser);
//     } catch (err) {
//         console.error(err);
//         return callback(err, false);
//     }
// }));

passport.serializeUser(function (user, callback) {
    process.nextTick(function () {
        return callback(null, {
            id: user.id,
            username: user.username,
        });
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = passport;