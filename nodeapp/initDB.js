"use strict";

// Conectar DB
const dbConnection = require("./lib/connectMongoose");
const itemData = require("./initDB.items.json");
const readline = require("readline"); // Para hacer preguntas por consola

// Cargar modelos
const Item = require("./models/Item");
const { resolve } = require("path");
const { rejects } = require("assert");
const { TLSSocket } = require("tls");

async function main() {
	const borrar = await pregunta("¿Estás seguro que quieres borrar la base de datos?");
	if(!borrar) {
		process.exit(0);
	}   

	// inicializar agentes
	await initItem();

	// Desconectar la DB
	dbConnection.close();
}

// Para conectar primero y preguntar después si quiero borrar.
dbConnection.once("open", ()=> {
	main().catch(err => console.log("Hubo un error", err));
});

async function initItem() {
	// Borrar todos los documentos de agentes que haya en la colección
	const deleted = await Item.deleteMany();
	console.log(`Eliminados ${deleted.deletedCount} items`);
    
	// Crear agentes iniciales
	const items = await Item.insertMany(itemData);
	console.log(`Creados ${items.length} items.`);
    
}

function pregunta(texto) {
	return new Promise((resolve, rejects) => {
		//Conectar ReadLine a la consola
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		//Hacemos preguntas
		rl.question(texto, respuesta => {
			rl.close();
			if(respuesta.toLowerCase() === "si") {
				resolve(true);
				return;
			}
			resolve(false);
		});
	});
}