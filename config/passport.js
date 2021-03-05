const passport = require('passport');                       //Importando passport, middleware para autenticación.
const LocalStrategy = require('passport-local').Strategy;   //Importando estrategia autenticación. --> passport-local
const mongoose = require('mongoose');
const userModel = require('../schemas/users');

passport.use(new LocalStrategy({                            //Configurando elementos utilizados para habilitar sesión.
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  userName.findOne({ email: email }).then(function (user) {
    if (!user || !user.validarPassword(password)) {
      return done(null, false, { errors: { 'Acceso': 'invalido' } });
    }
    return done(null, user);
  }).catch(done);
}));