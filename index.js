// Config .env file

import dotenv from 'dotenv';
dotenv.config()
import database from './middlewares/database.js';
database();
import Router from 'express'
import salesProductSchema from './schemas/salesProduct.js'
// Import all packages and constants used 

import express from 'express';
import helmet from 'helmet';
import cors  from 'cors';
import oferta from './schemas/validation.js';

// Set all routes

//import UserRoutes from './routes/users';
import salesProductRoutes from './routes/salesProduct.js';
//import ProductOrdersRoutes from '.routes/productOrders';
//import ServiceOrdersRoutes from '.routes/serviceOrders';
//import AuthRoutes from './routes/auth';

// Set application const

const app = express();

// Set app middlewares to use

app.use(helmet()); // 
app.use(cors()) // CORS let specify from which domains is possible to communicate

app.use(express.urlencoded({ extended: true })); // It will verify if the Content-type header matches
app.use(express.json()); // It let receive request body as JSON format

// Auto-addressing requests

//app.use('/users', UserRoutes);
app.use('/products', salesProductRoutes);
//app.use('/auth', AuthRoutes);
//app.use('/productorders', ProductOrdersRoutes)
//app.use('/serviceorders', ServiceOrdersRoutes)

app.get('/', (req, res) => {
  res.send('Bien hecho');
})

// Server running

app.listen(process.env.PORT, () => {
  console.log('Escuchando en el puerto ' + process.env.PORT );
});