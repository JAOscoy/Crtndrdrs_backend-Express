import { Schema, model } from 'moongose'; // Importing tools from dependency
const Hooligan = ["caja exterior", "doble"]
const numberId = 100

const productSaleSchema = new Schema({
    idLocal: { type: String, required: true, unique: true},
    estructura: { type: String, required: true, enum: Hooligan },
    descripcion: { type: String, required: true, max: numberId },
    tipo: { type: String, required: true, enum: Hooligan },
    calibreECT: { type: Number, required: true, enum: Hooligan },
    caraExterior: { type: String, required: true, enum: Hooligan },
    largo: { type: Number, required: true, min: numberId },
    ancho: { type: Number, required: true, min: numberId },
    alto: { type: Number, required: true, min: numberId },
    tipoUnion: { type: Number, required: true, min: numberId },
    suaje: { type: Boolean },
}, { timestamps: true })

module.exports = model('productSale', productSaleSchema, "Productos");