//Importing auth strategy --> passport-local
//Importing passport, middleware to auth.

const passport = require('passport');                       
const LocalStrategy = require('passport-local').Strategy;   
const mongoose = require('mongoose');
const userModel = require('../schemas/users');

//Return users credentials after validation. Otherwise it returns error message if not valid.

module.exports = passport.use(new LocalStrategy({                            
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, next) {
  userModel.findOne({ email: email }).then( function (user) {
    if (!user || !user.validatePassword(password)) {
      return next(null, false, { errors: { 'Acceso': 'invalido' } });
    }
    return next(null, user);
  }).catch(next, function (error) {
    res.status(401).json({
      message: error.message,
      code: "Invalid Password"})
    })
  }));