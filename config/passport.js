const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require('../config/database');
const crypto = require("crypto");

passport.use(new LocalStrategy(function verify(username, password, callback) {
    try {
        db.query('SELECT * FROM user WHERE u_username = ?', [username], (err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user || user.length == 0) {
                return callback(null, false);
            } else {
                if (!validPassword(password, user[0].u_password)) {
                    return callback(null, false);
                }
            }
            return callback(null, user);
        });
    } catch (err) {
        return callback(null, false);
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