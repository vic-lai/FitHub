const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const maxAge = 3 * 24 * 60 * 60

const handleErrors = (err) => {
    let errors = { email: '', password: ''};
    if (err.message==="Invalid email") {
        errors.email="Invalid email"
    }
    if (err.message==="Incorrect password") {
        errors.password = "Incorrect password"
    }
    if (err.errors) {
        err.errors.forEach((error) => {
            if (error.type === "unique violation" && error.path === "email") {
                errors.email = "That email is already registered";
            }
            if (error.path === "password") {
                errors.password = "Minimum password length is 6 characters";
            }
        });
    }
    return errors
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
        expiresIn: maxAge
    });
}

module.exports.signup_post = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({email, password});
        const token = createToken(user.id)
        localStorage.setItem('jwt', token)
        res.status(201).json({user: user.id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
}


module.exports.login_post = async (req,res) => {
    const { email, password } = req.body;

    try {
        const {user, token} = await User.login(email, password);
        res.status(200).json({user: user.id,token });
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors});
    }
}

