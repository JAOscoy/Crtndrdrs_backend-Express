
const userModel = require('../schemas/users');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const mongoose = require("mongoose");
const auth = require('../middlewares/auth');

// Get all users

Router.get('/', (req, res, next) =>{
  userModel.find()
  .then((users) => {
    res.json({ data: users });
  })
  .catch(next, (error) => {
    res.status(401).json({
      message: error.message,
      code: "GET_ALL_PRODUCTS"
    })
  })
});

// Get User by Id

Router.get('/:id', (req, res, next) => {
    userModel.findById(req.usuario.id, (err, user) => {
      if (!user || err) {
        return res.sendStatus(401)
      }
      return res.json(user.publicData());
    }).catch(next, (error) => {
      res.status(401).json({
        message: error.message,
        code: "USER not registered"})
      })
    });

// Create new user

Router.post('/', (req, res, next) => {
  const { body } = req,
  { password } = body;

  delete body.password
  const user = new userModel(body)
  user.crearPassword(password)
  user.save().then(user => {
    return res.status(201).json(user.toAuthJSON)
  }).catch(next, (error)  => {
    res.status(401).json({
      message: error.message,
      code: "USER not registered"})
    })
  });

  // Eliminar usuario

  Router.delete('/:id', auth.required, (req, res) => {
    // únicamente borra a su propio usuario obteniendo el id del token
    userModel.findOneAndDelete({ _id: req.usuario.id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
      res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
    })
  })

  Router.post('/login', (req, res, next) => {
    if (!req.body.email) {
      return res.status(422).json({ errors: { email: "no puede estar vacío" } });
    }
  
    if (!req.body.password) {
      return res.status(422).json({ errors: { password: "no puede estar vacío" } });
    }
  
    passport.authenticate('local', { session: false }, function (err, user, info) {
      if (err) { return next(err); }
  
      if (user) {
        user.token = user.generarJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  })


module.exports = Router;
