// Importing tools from dependencies and constants

const { Schema, model } = require('mongoose');
const oferta = require('./validation.js');

// Create schema constructor according to the mongoDB collection

const salesProductSchema = new Schema({
    idLocal: { type: String, required: true, unique: true},
    estructura: { type: String, required: true, enum:  oferta.estructura },
    descripcion: { type: String, required: true, max: 150 },
    tipo: { type: String, required: true, enum: oferta.tipo },
    calibreECT: { type: Number, required: true, enum: oferta.calibreECT },
    caraExterior: { type: String, required: true, enum: oferta.caraExterior },
    largo: { type: Number, required: true, min: oferta.largo.min, max: oferta.largo.max },
    ancho: { type: Number, required: true, min: oferta.largo.min, max: oferta.ancho.max },
    alto: { type: Number, required: true, min: oferta.largo.min, max: oferta.largo.max },
    tipoUnion: { type: String, required: true, enum: oferta.tipoUnion },
    suaje: { type: Boolean, default: false},
    status: { type: String, enum: oferta.status },
    idUsuario: { type: Schema.Types.Mixed, ref: 'user'}
}, { timestamps: true });

// Including reference, schema and collection

module.exports = model('salesProduct', salesProductSchema, 'Productos');
