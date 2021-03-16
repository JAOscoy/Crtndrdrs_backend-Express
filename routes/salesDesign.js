// Import libraries to use

const salesDesignModel = require('../schemas/salesDesign.js');
const Router = require('express').Router();
const userModel = require('../schemas/users.js');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');


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

// Post a new product into the users cart

Router.post('/me', auth, (req, res) => {
  const salesDesign = new salesDesignModel(req.body)
  const { email } = req.user;
  salesDesign.idUsuario = email;
  salesDesign.save()
    .then((document) => { userModel.findOneAndUpdate( { email: document.idUsuario }, 
      { $push: { cartDesigns: document.idLocal } })
    .then(() => {
      res.json(document);
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
        code: "CART_PRODUCTS_PUSH"
      });
    })
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
        code: "PRODUCT_NOT_CREATED"})})
});

// Modify product 

Router.put('/:idLocal', auth, (req, res) => {
  const { body } = req;
  delete body.idUsuario
  delete body.createdAt
  delete body.updateAt
  salesDesignModel.findOne({idLocal: body.idLocal}).then(
    (doc) => {
      if(!doc) { return res.json('El producto no existe') }
      else if( req.user.email != doc.idUsuario ) { return res.json('No tienes permiso para modificar este producto')}
      else { salesDesignModel.findOneAndUpdate( 
        {idLocal: body.idLocal}, 
        { $set: body },
        { new: true }).then((modified) => {
          res.status(201).json(modified.salesDesignData())
        }).catch(function (error) {
            res.status(400).json({
            message: error.message,
            code: "No fue posible actualizar"})}) }
    }).catch(error => {
    return res.status(401).json(error);
  })
})

// Delete product

Router.delete('/:idLocal', auth, (req, res) => {
  const { body } = req;
  salesDesignModel.findOne({idLocal: body.idLocal}).then(
    (doc) => {
      if(!doc) { return res.json('El producto no existe') }
      else if( req.user.email != doc.idUsuario ) { return res.json('No tienes permiso para eliminar este producto')}
      else { salesDesignModel.findOneAndDelete( 
        {idLocal: body.idLocal}).then(r => {        
          res.status(200).send(`Producto ${r.idLocal} eliminado`)}).catch((error) => {
            res.status(401).json({
            message: error.message,
            code: "Product cannot be deleted"})})}}).catch((error) => {
    res.status(401).json({
    message: error.message,
    code: "Product cannot be deleted"})})
});

module.exports = Router