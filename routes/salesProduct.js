// Import libraries to use

const salesProductModel = require('../schemas/salesProduct.js');
const uniqueValidator = require("mongoose-unique-validator");;
const Router = require('express').Router();

// CRUD controllers

Router.get('/', (req, res) =>{
    salesProductModel.find()
    .then(function (products) {
      res.json({ data: products });
    })
    .catch(function (error) {
      res.status(500).json({
        message: error.message,
        code: "GET_ALL_PRODUCTS"
      })
    })
})

module.exports = Router;





