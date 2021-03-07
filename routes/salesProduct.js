// Import libraries to use

const salesProductModel = require('../schemas/salesProduct.js');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();

// CRUD controllers

// Get all products

Router.get('/', (req, res, next) =>{
    salesProductModel.find()
    .then(function (products) {
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

Router.post('/', (req, res, next) => {
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

Router.put('/:idLocal', (req, res, next) => {
  let { idLocal } = req.params
  salesProductModel.findById(req.params.id).then(salesProduct => {
    if (!salesProduct) { return res.sendStatus(401); }
    

  })
})



module.exports = Router





