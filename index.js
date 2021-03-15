// Add .env file and connection files.

require('dotenv').config();
require('./config/database')();
require('./config/passport');

// Import all packages to use

const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); 
const fs = require('fs');
const crypto = require('crypto');
const oferta = require('./schemas/validation')

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
app.use('/salesProduct', require('./routes/salesProduct'));
app.use('/salesDesign', require('./routes/salesDesign'));
app.use('/serviceOrders', require('./routes/salesDesign'));

// Welcome page

app.get('/', (req, res) => {
  res.json('Bienvenidos a la web de Crtndrdrs');
});

// Server running

app.listen(process.env.PORT, function () {
  console.log(`Servidor escuchando el puerto ${process.env.PORT}`);
});