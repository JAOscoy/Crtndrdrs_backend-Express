
const userModel = require('../schemas/users');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const mongoose = require("mongoose");
const auth = require('../middlewares/auth');
const passport = require('passport');
const role = require('../middlewares/role')


// Get all users

Router.get('/', [ auth, role ], (req, res, next) => {
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

/* Get User by Id

Router.get('/:id', (req, res, next) => {
    userModel.findById(req.user.id, (err, user) => {
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
*/
// Create new user

Router.post('/', (req, res, next) => {
  const { body } = req,
  { password } = body;

  delete body.password
  const user = new userModel(body)
  user.createPassword(password)
  user.save().then(user => {
    return res.status(201).json(user.toAuthJSON)
  }).catch(next)
  });

  // Delete current user

  Router.delete('/:id', auth, (req, res) => {
    userModel.findOneAndDelete({ _id: req.user.id }).then(r => {        
      res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
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
