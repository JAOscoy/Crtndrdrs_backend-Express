// Import all libraries and schemas needed

const salesDesignModel = require('../schemas/salesDesign.js');
const uniqueValidator = require("mongoose-unique-validator");
const Router = require('express').Router();
const userModel = require('../schemas/users.js');
const serviceOrdersModel = require('../schemas/serviceOrders.js');
const salesProductModel = require('../schemas/salesProduct.js');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// Create a constant to manage router through the app

// Get all orders

Router.get('/me/allOrders', [ auth, role ], (req, res, next) =>{
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

// Create new order from carts ({{

Router.post('/newOrder', auth, (req, res, next) => {
  const { body } = req;
  userModel.findOne({ email: req.user.email }).then(user => {
    if (!user) { return res.sendStatus(401).json('Error') } 
    else {
      const { cartProducts, cartDesigns, email } = user
      const serviceOrder = new serviceOrdersModel(body)
      serviceOrder.idUsuario = email;
      serviceOrder.productosOrden = cartProducts;
      serviceOrder.disenosOrden = cartDesigns;
      serviceOrder.estado = "Pendiente";
      serviceOrder.save().then(order => {
        res.json(order)
        userModel.findOneAndUpdate(
          { email: req.user.email },
          { $set: {"cartDesigns": [], "cartProducts": [] } },
          { new: true }).then((user) => {
            res.status(201)
          }).catch((error) => {
            res.status(405).json({
              message: err.message,
              code: "Order not registered"
            })
          })}).catch((err) => {
        res.status(403).json({
          message: err.message,
          code: "Order not registered" })})
    }})});
        
// 

module.exports = Router;
