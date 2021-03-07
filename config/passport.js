const passport = require('passport');                       //Importando passport, middleware para autenticación.
const LocalStrategy = require('passport-local').Strategy;   //Importando estrategia autenticación. --> passport-local
const mongoose = require('mongoose');
const userModel = require('../schemas/users');

passport.use(new LocalStrategy({                            //Configurando elementos utilizados para habilitar sesión.
  email: 'email',
  password: 'password'
}, (email, password, done) => {
  userModel.findOne({ email: email }).then((user) => {
    if (!user || !user.validarPassword(password)) {
      return done(null, false, { errors: { 'Acceso': 'invalido' } });
    }
    return done(null, user);
  }).catch(done);
}));