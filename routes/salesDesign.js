// Import libraries to use

const salesDesignModel = require('../schemas/salesDesign.js');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const userModel = require('../schemas/users.js')


// CRUD controllers

// Get all products

Router.get('/', (req, res, next) => {
    salesDesignModel.find()
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

Router.post('/', (req, res, next) => {
  let { body } = req;
  new salesDesignModel(body).save()
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

Router.post('/me/salesDesign', (req, res) => {
  const { body } = req;
  const { id } = req.user;
  new salesDesignModel(body).save()
    .then((document) => {
      res.json({ data: document })
      const { idLocal } = document;
      userModel.findByIdAndUpdate(id, { $push: { cartDesigns: idLocal } })
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

module.exports = Router