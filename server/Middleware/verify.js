const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
 const token = req.cookies.loginToken;

 if (!token) {
    return res.status(403).json({ message: 'No token provided' });
 }

 jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = user;
    next();
 });
}

module.exports = validateToken;