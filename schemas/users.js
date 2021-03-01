// Require libraries to use.

const { Schema, model } = require('mongoose');
const oferta = require('./validation.js');
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');    

const UserSchema = new Schema({
    apellidoContacto: { type: String, required: true },
    razonSocial: { type: String, required: true, unique: true },
    nombreContacto: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    nivelAcceso: { type: String, required: true, enum: ['ADMIN', 'USER'] },
    cp: { type: Number, required: true },
    ciudad: { type: String, required: true },
    password: { type: String, required: true },
    cart: [{ type: Schema.Types.ObjectId, ref: 'orders'}],
    hash: String,
    salt: String
  
  }, { timestamps: true } );

// Verify if 
UserSchema.plugin(uniqueValidator, { message: "Ya existe" });

// generating random salt and encrypting hash by pbkdf2 algorithm with the same salt generated.

UserSchema.methods.crearPassword = function (password) {    
  this.salt = crypto.randomBytes(16).toString("hex"); 
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // 
};

// Validate if after receiving hash during login, if the same as the previous generated. 

UserSchema.methods.validarPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

// Generate JWT on this model with 30 days of validity.

UserSchema.methods.generarJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 30); //

  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

/**
 * Return user display after authenticated.
 */
UserSchema.methods.toAuthJSON = function(){
  return {
    email: this.email,
    token: this.generarJWT()
  };
};

UserSchema.methods.publicData = function(){
    return {
      nombre: this.nombre,
      nivelAcceso: this.nivelAcceso
    };
  };
  
module.exports = model('user', UserSchema, 'Usuarios');