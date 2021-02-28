// Config .env file

require('dotenv').config();
require('./middlewares/database')();

// Extract libraries to use

const Router = require('express');
const salesProductSchema = require('./schemas/salesProduct.js');
const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

// Create https 

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
// Import all packages and constants used 

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const oferta = require('./schemas/validation.js');

// Set application const

const app = express();

// Set all routes

//import UserRoutes from './routes/users';
const salesProductRouter = require('./routes/salesProduct.js');
//import ProductOrdersRoutes from '.routes/productOrders';
//import ServiceOrdersRoutes from '.routes/serviceOrders';
//import AuthRoutes from './routes/auth';



// Set app middlewares to use

app.use(helmet()); // 
app.use(cors()) // CORS let specify from which domains is possible to communicate

app.use(express.urlencoded({ extended: true })); // It will verify if the Content-type header matches
app.use(express.json()); // It let receive request body as JSON format

// Auto-addressing requests

//app.use('/users', UserRoutes);
app.use('/products', salesProductRouter);
//app.use('/auth', AuthRoutes);
//app.use('/productorders', ProductOrdersRoutes)
//app.use('/serviceorders', ServiceOrdersRoutes)

app.get('/', (req, res) => {
  res.send('Bien hecho');
})

// Server running

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.json("Bienvenidos a crtndrdrs");
}).listen(process.env.PORT);