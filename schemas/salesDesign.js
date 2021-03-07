const { Schema, model } = require('mongoose');
const oferta = require('./validation.js'); // Importing tools from dependency

const salesDesignSchema = new Schema({
    idLocal: { type: String, unique: true},
    estructura: { type: String, enum:  oferta.estructura },
    descripcion: { type: String, max: 150 },
    tipo: { type: String, enum: oferta.tipo },
    calibreECT: { type: Number, enum: oferta.calibreECT },
    caraExterior: { type: String, required: true, enum: oferta.caraExterior },
    largo: { type: Number, min: oferta.largo.min, max: oferta.largo.min },
    ancho: { type: Number, min: oferta.largo.min, max: oferta.ancho.min },
    alto: { type: Number, min: oferta.largo.min, max: oferta.largo.min },
    tipoUnion: { type: String, enum: oferta.tipoUnion },
    suaje: { type: Boolean, default: false},
    pesoKg: { type: Number },
    volumenm3: { type: Number },
    status: { type: String, enum: oferta.status }
}, { timestamps: true });

module.exports = model('ventaDiseño', salesDesignSchema, 'Servicios');