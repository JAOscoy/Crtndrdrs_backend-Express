// Import libraries to use

const salesProductModel = require('../schemas/salesProduct.js');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const userModel = require('../schemas/users.js');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role')


// CRUD controllers

// Get all products

Router.get('/', [ auth, role ], (req, res, next) => { 
    salesProductModel.find()
    .then((products) => {
      res.json({ data: products });
    })
    .catch(next, (error) => {
      res.status(401).json({
        message: error.message,
        code: "GET_ALL_PRODUCTS"
      })
    })
});

// Post a new product

Router.post('/', auth, (req, res, next) => {
  let { body } = req;
  new salesProductModel(body).save()
  .then((products) => {
    res.json({ data: products });
  })
  .catch(next, (error) => {
    res.status(401).json({
      message: error.message,
      code: "PRODUCT not registered"
    })
  })
});

Router.post('/me/salesProducts', (req, res) => {
  const { body } = req;
  const { id } = req.user;
  new salesProductModel(body).save()
    .then((document) => {
      res.json({ data: document })
      const { idLocal } = document;
      userModel.findByIdAndUpdate(id, { $push: { cartProducts: idLocal   } })
    .then(function () {
      res.json(document);
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
        code: "CARTPRODUCTS_PUSH"
      });
    })
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
        code: "PRODUCT_NOT_CREATED"})})
});


module.exports = Router;





