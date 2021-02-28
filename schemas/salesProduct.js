const { Schema, model } = require('mongoose');
const oferta = require('./validation.js'); // Importing tools from dependency

const salesProductSchema = new Schema({
    idLocal: { type: String, required: true, unique: true},
    estructura: { type: String, required: true, enum:  oferta.estructura },
    descripcion: { type: String, required: true, max: 150 },
    tipo: { type: String, required: true, enum: oferta.tipo },
    calibreECT: { type: Number, required: true, enum: oferta.calibreECT },
    caraExterior: { type: String, required: true, enum: oferta.caraExterior },
    largo: { type: Number, required: true, min: oferta.largo.min, max: oferta.largo.min },
    ancho: { type: Number, required: true, min: oferta.largo.min, max: oferta.ancho.min },
    alto: { type: Number, required: true, min: oferta.largo.min, max: oferta.largo.min },
    tipoUnion: { type: String, required: true, enum: oferta.tipoUnion },
    suaje: { type: Boolean, default: false},
    status: { type: String, enum: oferta.status }
}, { timestamps: true });

module.exports = model('productosventa', salesProductSchema, 'Productos');
