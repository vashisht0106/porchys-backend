const jwt = require('jsonwebtoken');
const Asyn = require('./middileware/Asyn');
const userSchema = require('./models/userSchema')
exports.authanticatedUser = Asyn(async (req, res, next) => {
    let { token } = req.cookies;
    if (!token) {
        res.status(401).json({ success: false, message: "you are not eligile to add a product please login and try" })
    }
    let decoded = jwt.verify(token, process.env.JWT_SEC)
    req.user = await userSchema.findById(decoded.id);
    next();
});
exports.Authoriserole = (...roles) => {
   return async (req, res, next) => { 
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ message: 'you can not access these resource' })
        };

        next();
    }
};