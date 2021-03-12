// Import all libraries and schemas needed

const salesDesignModel = require('../schemas/salesDesign.js');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const userModel = require('../schemas/users.js');
const serviceOrdersModel = require('../schemas/serviceOrders.js');
const salesProductModel = require('../schemas/salesProduct.js');

// Create a constant to manage router through the app

// Get all orders

Router.get('/me/allOrders', (req, res, next) =>{
    serviceOrdersModel.find()
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

// Create new order from carts

Router.post('/me/newOrder', (req, res, next) => {
  const { body } = req;
  userModel.findById(req.user.email, (err, user) => {
    if (!user || err) {
      return res.sendStatus(401)
  } const { cartProducts, cartDesigns, email } = user
  const serviceOrder = new serviceOrdersModel()
  serviceOrder.email = email;
  serviceOrder.productosOrden = cartProducts;
  serviceOrder.diseñosOrden = cartDesigns;
  serviceOrder.estado = "Pendiente";
  serviceOrder.save(body)
  .then((order) => {
    res.json({ data: order });
    user.cartProducts = [];
    user.cartDesigns = [];
  })
  .catch(next, (error) => {
    res.status(401).json({
      message: error.message,
      code: "Order not registered"
    })
  })
})});

module.exports = Router;
