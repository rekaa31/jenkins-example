const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    
    if(!token) {
      res.status(403).send({ message: "No token provided" });
			return;
    }

    const decodedToken = jwt.verify(token, config.secret);

    if(!decodedToken) {
      res.status(401).send({ message: "Token unauthorized" });
			return;
    }

    return next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid request!' });
  }
}