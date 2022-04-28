"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión a MongoDb", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log(
    "Conectando a MongoDb en la Base de Datos: ",
    mongoose.connection.name
  );
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

module.exports = mongoose.connection;
