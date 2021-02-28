
const salesProductModel = require('../schemas/salesProduct.js')
const Router = require('express').Router();

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

module.exports = Router





