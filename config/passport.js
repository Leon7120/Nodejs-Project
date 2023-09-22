const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require('../config/database');
const crypto = require("crypto");


passport.use(new LocalStrategy(function verify(username, password, callback) {
    db.query('SELECT * FROM users WHERE u_username = ?', [username], (err, user) => {
        if(err){
            callback(err);
        }
            if (!user) {
                return callback(null, false, {
                    message: 'Incorrect username or password.'
                });
            }
            let hash = user[0].u_password;  
            if (!validPassword(password, hash)) {
                return callback(null, false, { message: 'Incorrect username or password.' });

            }
            return callback(null, user);

    });
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