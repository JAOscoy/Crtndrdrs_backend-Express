
const userModel = require('../schemas/users');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const auth = require('./auth');

Router.get('/', (req, res) =>{
    userModel.find()
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
