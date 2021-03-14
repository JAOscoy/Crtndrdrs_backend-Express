// Require dependencies and tools to use.

const { Schema, model } = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = process.env.JWT_SECRET
const oferta = require('./validation.js');

// Create schema constructor according to the mongoDB collection

const UserSchema = new Schema({
    apellidoContacto: { type: String, required: true },
    razonSocial: { type: String, required: true, unique: true },
    nombreContacto: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    nivelAcceso: { type: String, required: true, enum: oferta.role },
    cp: { type: Number, required: true },
    ciudad: { type: String, required: true },
    cartDesigns: [{ type: Schema.Types.ObjectId, ref: 'salesProduct'}],
    cartProducts: [{ type: Schema.Types.ObjectId, ref: 'salesDesign'}],
    hash: { type: String },
    salt: { type: String }
  }, { timestamps: true });

// Automatically rejects if an unique field is repeated

UserSchema.plugin(uniqueValidator, { message: "Ya existe" });

// Generates a random salt, encrypting password within a hash by pbkdf2 algorithm and the previous generated salt.

UserSchema.methods.createPassword = function (password) {    
  this.salt = crypto.randomBytes(16).toString("hex"); 
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // 
};

// Validate if after receiving hash during login is the same as the generated originally. 

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt , 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash
};

// Generate JWT on this model with 7 days of validity.

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 7); //

  return jwt.sign({
    email: this.email,
    role: this.nivelAcceso, 
  }, secret);
};

// Return user data with a valid token

UserSchema.methods.toAuthJSON = function () {
  return {
    email: this.email,
    role: this.nivelAcceso,
    token: this.generateJWT()
  };
};

// Return public data to refer badges

UserSchema.methods.publicData = function () {
    return {
      nombre: this.nombre,
      nivelAcceso: this.nivelAcceso
    };
  };

  // Including reference, schema and collection
  
module.exports = model('user', UserSchema, 'Usuarios');