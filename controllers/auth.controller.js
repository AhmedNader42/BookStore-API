'use strict';
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validateEmail = require('../helpers/helpers');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    console.log(validateEmail(email));
    const newUser = new User({
        name,
        email,
        password: await User.encryptPassword(password),
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    const newToken = jwt.sign({ id: savedUser._id }, 'secretKey', {
        expiresIn: 86400,
    });

    res.status(200).json({ newToken });
};

exports.logIn = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    console.log(req.body);
    if (!userExists) {
        return res.status(400).json({ message: `User doesn't exist` });
    }

    const matchPassword = await User.comparePassword(req.body.password, userExists.password);

    if (!matchPassword) {
        return res.status(400).json({
            token: null,
            message: 'Invalid password',
        });
    }
    console.log(userExists);

    const token = jwt.sign({ id: userExists._id }, 'secretKey', {
        expiresIn: 86400,
    });
    return res.json({
        _id: userExists._id,
        name: userExists._id,
        message: 'Authentication Successful',
        token: token,
    });
};
