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

/* This constant will save the token downloaded during opened session.
*/
const auth = function (req, res, next) {
  try {
    jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeader,
    })
    next()
  }
  catch (error) {
    response.status(401).json({
    message: 'Necesitas iniciar sesión',
    code: "NOT_AUTHORIZED"})
  }
  }

module.exports = auth;