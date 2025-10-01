const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

function signJwt(payload) {
    const options = { expiresIn: JWT_EXPIRES_IN };
    return jwt.sign(payload, JWT_SECRET, options);
}

function verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { signJwt, verifyJwt };