const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

const generateUserToken = (_id, name, email, role) => {
    const token = jwt.sign({ _id, name, email, role }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24, issuer: process.env.JWT_ISSUER }
    );
    return token;
}

const decodeJWTToken = (token) => {
    options = {
        expiresIn: 60 * 60 * 24,
        issuer: process.env.JWT_ISSUER
    };
    return jwt.verify(token, process.env.JWT_SECRET_KEY, options);
}

const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.headers["authorization"];
        const bearerToken = accessToken.split(" ")[1];
        if (accessToken) {
            const payload = decodeJWTToken(bearerToken);
            if (!payload) {
                return res.json({ msg: "Invalid Token" });
            }
            req.user = payload;
            return next();
        } else {
            return res.json({ error: "Unauthorized User" });
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ status_code: 400, message: "JWT token is expired or invalid." });
        } else {
            return res.status(400).json({ status_code: 400, message: "Authentication Invalid" });
        }
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateUserToken,
    verifyToken
}