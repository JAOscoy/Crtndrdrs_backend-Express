// Importing tools from dependencies and constants

const { Schema, model } = require('mongoose');
const oferta = require('./validation.js'); 

// Create schema constructor according to the mongoDB collection

const serviceOrdersSchema = new Schema({
  email: { type: Schema.Types.Object, ref: 'user', required: true },
  productosOrden: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  diseñosOrden: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  estado: { type: String, enum: oferta.estado },
  tipo: { type: String, enum: oferta.solicitud.tipo },
  foliointerno: { type: String , unique: true, required: true }, 
  amount: { type: Number, required: true, min: 0 },
  endDate: { type: Date }
}, { timestamps: true });

// Including reference, schema and collection

module.exports = model('serviceOrders', serviceOrdersSchema, 'ordenesCompra');