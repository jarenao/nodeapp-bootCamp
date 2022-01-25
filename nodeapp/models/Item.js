"use strict";

const mongoose = require("mongoose");

//Schema
const itemSchema = mongoose.Schema({
	name: { type: String, index: true }, // Name article
	state: { type: String, index: true }, // Se busca, Se vende
	price: { type: Number, index: true }, // 'Se busca' a X precio / 'Se vende' a X precio
	image: { type: String, index: true },
	tags: { type: String, index: true } // work, lifestyle, motor y mobile
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;