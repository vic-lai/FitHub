const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('authenticating token', token)
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    console.log('checking user', token)
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, async (err,decodedToken) => {
            if(err) {
                console.log(err.message)
                res.locals.user = null;
                next();
            }
            console.log(decodedToken);
            let user = await User.findByPk(decodedToken.id);
            res.locals.user = user;
            next();
        })
    } else{
        console.log('No token found');
        res.locals.user = null; 
        return next();
    }
}

module.exports = { authenticateToken, checkUser };