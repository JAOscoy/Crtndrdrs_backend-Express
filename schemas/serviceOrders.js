// Importing tools from dependencies and constants

const { Schema, model } = require('mongoose');
const oferta = require('./validation.js');
const uniqueValidator = require("mongoose-unique-validator");

// Create schema constructor according to the mongoDB collection

const serviceOrdersSchema = new Schema({
  productosOrden: [{ type: Schema.Types.Mixed, ref: 'user' }],
  disenosOrden: [{ type: Schema.Types.Mixed, ref: 'user' }],
  estado: { type: String, enum: oferta.estado },
  tipo: { type: String },
  foliointerno: { type: String , unique: true, index: true }, 
  amount: { type: Number },
  endDate: { type: Date },
  idUsuario: { type: Schema.Types.Mixed, ref: 'user' }
}, { timestamps: true });

serviceOrdersSchema.plugin(uniqueValidator, { message: "Ya existe" });

// Including reference, schema and collection

module.exports = model('serviceOrders', serviceOrdersSchema, 'solicitudesServicios');