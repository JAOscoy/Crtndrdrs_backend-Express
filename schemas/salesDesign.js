// Importing tools from dependencies and constants

const { Schema, model } = require('mongoose');
const oferta = require('./validation.js'); 

// Create schema constructor according to the mongoDB collection

const salesDesignSchema = new Schema({
    idLocal: { type: String, unique: true},
    estructura: { type: String, enum:  oferta.estructura },
    descripcion: { type: String, max: 150 },
    tipo: { type: String, enum: oferta.tipo },
    calibreECT: { type: Number, enum: oferta.calibreECT },
    caraExterior: { type: String, required: true, enum: oferta.caraExterior },
    largo: { type: Number, min: oferta.largo.min, max: oferta.largo.max },
    ancho: { type: Number, min: oferta.largo.min, max: oferta.ancho.max },
    alto: { type: Number, min: oferta.largo.min, max: oferta.largo.max },
    tipoUnion: { type: String, enum: oferta.tipoUnion },
    suaje: { type: Boolean, default: false},
    pesoKg: { type: Number },
    volumenm3: { type: Number },
    status: { type: String, enum: oferta.status },
    idUsuario: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true });

// Including reference, schema and collection

module.exports = model('salesDesign', salesDesignSchema, 'Servicios');