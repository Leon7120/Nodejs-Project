const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require('../config/database');
const crypto = require("crypto");
const userModel = require('../models/user.model');


passport.use(new LocalStrategy(async function verify(username, password, callback) {
    // try {
    //     db.query('SELECT * FROM user WHERE u_username = ?', [username], (err, user) => {
    //         if (err) {
    //             return callback(err);
    //         }
    //         if (!user || user.length == 0) {
    //             return callback(null, false);
    //         } else {
    //             if (!validPassword(password, user[0].u_password)) {
    //                 return callback(null, false);
    //             }
    //         }
    //         return callback(null, user);
    //     });
    // } catch (err) {
    //     return callback(null, false);
    // }
    try {
        const existingUser = await userModel.findOne({
            where: {
                u_username: username
            }
        });
        if (!existingUser) {
            return callback(null, false);
        } else {
            if (!validPassword(password, existingUser.u_password)) {
                return callback(null, false);
            }
        }
        return callback(null, existingUser);
    } catch (err) {
        console.error(err);
        return callback(err, false);

    }
}));
function validPassword(password, hashPassword) {
    var verifyHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return hashPassword === verifyHash;
}
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