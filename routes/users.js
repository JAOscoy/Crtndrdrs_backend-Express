
const userModel = require('../schemas/users');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const mongoose = require("mongoose");
const auth = require('../middlewares/auth');
const passport = require('passport');
const role = require('../middlewares/role')


/* Get all users*/

Router.get('/', auth, function (req, res) {

  userModel.find()
    .then(function (user) {
      res.json({ data: user });
    }).catch(function (error) {
      res.status(400).json({
        message: error.message,
        code: "USER_BY_ID"
      });
    });
});

// Get logged user

Router.get('/me', auth, (req, res, next) => {                              //Obteniendo usuario desde MongoDB.
  userModel.findOne({ email: req.user.email }).then( function (user) {
    res.json({ data: user.toAuthJSON() })}).catch(function (error) {
      res.status(400).json({
        message: error.message,
        code: "USER_BY_ID"
      });
    })
})

// Create new user

Router.post('/', (req, res, next) => {
  const { body } = req,
  { password } = body;

  delete body.password
  const user = new userModel(body)
  user.createPassword(password)
  user.save().then(user => {
    res.status(201).json(user.toAuthJSON())
  }).catch(function (error) {
    response.status(400).json({
      message: error.message,
      code: "El usuario no fue registrado"
    })
  })
  })

  // Modify user

  Router.put('/me', auth, (req, res) => {
    const { body } = req;
    delete body.password
    delete body.email
    delete body.hash
    delete body.salt
    delete body.nivelAcceso
    delete body._id
    delete body.createdAt
    delete body.updatedAt
    userModel.findOneAndUpdate(
      { email: req.user.email },
      { $set: body },
      { new: true } 
    ).then(user => {
      res.status(201).json(user.userData() )
    }).catch(function (error) {
      response.status(400).json({
        message: error.message,
        code: "No fue posible actualizar"})})})

  // Delete current user

  Router.delete('/me', auth, (req, res) => {
    userModel.findOneAndDelete({ email: req.user.email }).then(r => {        
      res.status(200).send(`Usuario ${req.user.email} eliminado: ${r}`);
    })
  })

  // Login

  Router.post('/login', function (req, res, next) {
    if (!req.body.email) {
      return res.status(422).json({ errors: { email: "Ingresa dirección valida" } });
    }
  
    if (!req.body.password) {
      return res.status(422).json({ errors: { password: "Ingresa contraseña correcta" } });
    }
  
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) { return next(err); }
  
      if (user) {
        user.token = user.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  })



module.exports = Router;
