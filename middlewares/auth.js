// Importing dependencies and constants

const jwt = require('express-jwt');
const secret = process.env.JWT_SECRET

// Create a function to extract Token from request.

const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
      return null;
}

// This constant will save the token downloaded during opened session.

const auth = jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeader,
    });

module.exports = (req, res, next) => {
  
    if (!auth) {
      res.status(401).json({
        message: "Error en autentificación",
        code: "NO_VALID_USER"
      });
    } else {
      return auth;
    }
  }