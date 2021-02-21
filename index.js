// Config .env file

require('dotenv').config()

// Import all packages used 

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

// Set all routes

import UserRoutes from './routes/users';
import ProductRoutes from './routes/products';
import ProductOrdersRoutes from '.routes/productOrders';
import ServiceOrdersRoutes from '.routes/serviceOrders';
import AuthRoutes from './routes/auth';

// Set application const

const app = express();

// Set app middlewares to use

app.use(helmet()); // 
app.use(cors()) // CORS let specify from which domains is possible to communicate

app.use(express.urlencoded({ extended: true })); // It will verify if the Content-type header matches
app.use(express.json()); // It let receive request body as JSON format

// Auto-addressing requests

app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/auth', AuthRoutes);
app.use('/productorders', ProductOrdersRoutes)
app.use('/serviceorders', ServiceOrdersRoutes)

// Server running

app.listen(process.env.PORT, () => {
  console.log('Express on port ' + process.env.PORT);
});