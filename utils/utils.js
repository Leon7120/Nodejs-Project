const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT = {
    jwt: process.env.JWT_SECRET || '12345-67890-09876-54321',
    jwtExp: '100d',
}

function validPassword(password, hashPassword) {
    var verifyHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return hashPassword === verifyHash;
}

function genPassword(password) {
    //var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return genHash;
}
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You Are Not Authorized');
        res.redirect('/v1');
    }
}
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.flash('error', 'Do you want to logout?');
        res.redirect('/v1/home')
    } else {
        next();
    }
}
const issueToken = user => {
    return jwt.sign({ id: user._id }, JWT.jwt, {
        expiresIn: JWT.jwtExp,
    })
}
const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, JWT.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })
module.exports = {
    validPassword,
    genPassword,
    isAuthenticated,
    checkAuthenticated,
    issueToken,
    verifyToken,
}