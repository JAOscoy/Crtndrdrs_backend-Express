import express from 'express'
import salesProductSchema from '../schemas/salesProduct.js'

const Router = express.Router();

Router.get('/', (req, res) =>{
    salesProductSchema.find()
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

export default Router





