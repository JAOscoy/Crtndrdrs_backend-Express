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

const auth = {
    required: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;