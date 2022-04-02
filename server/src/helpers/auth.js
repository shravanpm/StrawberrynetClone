const jwt = require('jsonwebtoken');
const User = require("../models/User");
const { secretKey } = require('../config');

const getUserProfile = (profile) => {
    const payload = {
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
    };
    return payload;
};

const getResponseToken = (profile) => {
    const token = jwt.sign(getUserProfile(profile), secretKey, { expiresIn: '7d' });
    return token;
};

const verifyResponseToken = async (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, secretKey, async (err, authData) => {
            if (err) {
                rej({
                    error: 'Invalid auth token',
                    error_code: "INVALID_AUTH_TOKEN"
                });
            } else {
                const user = await User.findOne({ 'email': { $eq: authData.email } });
                res(user);
            }
        });
    });
}

module.exports = { getResponseToken, getUserProfile, verifyResponseToken };