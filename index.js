// Config .env file

require('dotenv').config();
require('./config/database')();

// Import all packages to use

const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); 
const router = express.Router();
const salesProductSchema = require('./schemas/salesProduct.js');
const fs = require('fs');
const crypto = require('crypto');

/* Create https 

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

*/

// Set application const:

const app = express();

// Set Safety middlewares:

app.use(helmet()); // Add headers to protect transfered data.
app.use(cors()) // CORS let specify from which domains is possible to communicate

app.use(express.urlencoded({ extended: true })); // It will verify if the Content-type header matches
app.use(express.json()); // It let receive request body as JSON format


// Set all routes

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/salesProduct'));
//app.use('/auth', AuthRoutes);
//app.use('/productorders', ProductOrdersRoutes)
//app.use('/serviceorders', ServiceOrdersRoutes)

app.get('/', (req, res) => {
  res.send('Bien hecho');
})

// Server running

app.listen(process.env.PORT, function () {
  console.log(`> Servidor escuchando el puerto ${process.env.PORT}`);
});