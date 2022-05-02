"use strict";

// import "./loadEnv.mjs";
const loadEnv = require("./loadEnv.js");

// Conectar DB
const dbConnection = require("./lib/connectMongoose");
const itemData = require("./initDB.items.json");
const readline = require("readline"); // Para hacer preguntas por consola

// Cargar modelos
const Item = require("./models/Item");
const Usuario = require("./models/Usuario.js");
// import Usuario from "./models/Usuario.js";
// const { resolve } = require("path");
// const { rejects } = require("assert");
// const { TLSSocket } = require("tls");

// Para conectar primero y preguntar después si quiero borrar.
dbConnection.once("open", () => {
  main().catch((err) => console.log("Hubo un error", err));
});

async function main() {
  const borrar = await pregunta(
    "¿Estás seguro que quieres borrar la base de datos?"
  );
  if (!borrar) {
    process.exit(0);
  }

  // inicializar Items
  await initItems();

  // Inicializar Usuarios
  await initUsuarios();

  // Desconectar la DB
  dbConnection.close();
}

async function initUsuarios() {
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // Crear usuarios
  const usuarios = await Usuario.insertMany([
    {
      email: "admin@example.com",
      password: "1234",
    },
    {
      email: "user@example.com",
      password: "1234",
    },
  ]);
  console.log(`Creados ${usuarios.length} usuarios.`);
}

async function initItems() {
  // Borrar todos los documentos de agentes que haya en la colección
  const deleted = await Item.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} items`);

  // Crear agentes iniciales
  const items = await Item.insertMany(itemData);
  console.log(`Creados ${items.length} items.`);
}

function pregunta(texto) {
  return new Promise((resolve, rejects) => {
    // Conectar ReadLine a la consola
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    //Hacemos preguntas
    rl.question(texto, (respuesta) => {
      rl.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
