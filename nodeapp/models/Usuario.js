"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

usuarioSchema.statics.hashPassword = function (passwordObfuscated) {
  return bcrypt.hash(passwordObfuscated, 7);
};

usuarioSchema.methods.comparePassword = function (passwordObfuscated) {
  return bcrypt.compare(passwordObfuscated, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
