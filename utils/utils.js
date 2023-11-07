const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT = {
    secret: process.env.ACCESS_TOKEN_SECRET,
    jwtExp: '5d',
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
    return "Bearer " + jwt.sign({ sub: user }, JWT.secret, {
        expiresIn: '1d',
    })
}
module.exports = {
    validPassword,
    genPassword,
    isAuthenticated,
    checkAuthenticated,
    issueToken,
}