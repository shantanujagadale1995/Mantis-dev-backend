const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

class JwtService {

    static sign(payload, expiry = '60s', secretKey = JWT_SECRET) {

        return jwt.sign(payload, secretKey, { expiresIn: expiry });
    }
}

module.exports = JwtService;