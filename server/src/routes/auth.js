const bcrypt = require("bcrypt");
const express = require('express');
const User = require('../models/User');
const { isLoggedIn } = require('../helpers/middlewares');
const { getResponseToken, getUserProfile } = require('../helpers/auth');

const router = express.Router();


router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        if (!(body.email && body.password)) {
            return res.status(400).send({ error: "Data not formatted properly", error_code: "INVALID_ARGS" });
        }

        const user = new User(body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.email = user.email.toLowerCase();

        return user.save().then((doc) => res.status(201).send({ data: { token: getResponseToken(doc) } }));
    } catch (err) {
        return res.status(500).send({ error: err.message, error_code: "INTERNAL_SERVER_ERROR" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(body.password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ data: { token: getResponseToken(user) } });
            } else {
                res.status(400).json({ error: "Invalid Password", error_code: "INVALID_PASSWORD" });
            }
        } else {
            res.status(401).json({ error: "User does not exist", error_code: "INVALID_USER" });
        }
    } catch (err) {
        return res.status(500).send({ error: err.message, error_code: "INTERNAL_SERVER_ERROR" });
    }
});

router.get("/current-user", isLoggedIn, async (req, res) => {
    return res.status(200).json({ data: getUserProfile(req.user) });
});


module.exports = router;
