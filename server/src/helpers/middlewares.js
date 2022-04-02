const { verifyResponseToken } = require('./auth');

const isLoggedIn = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(401).json({
            error: 'User not authenticated',
            error_code: "USER_NOT_AUTHENTICATED"
        });
    }

    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    
    verifyResponseToken(bearerToken).then(user => {
        req.user = user;
        next();
    }).catch(err => res.status(401).json(err));
};

module.exports = { isLoggedIn };

