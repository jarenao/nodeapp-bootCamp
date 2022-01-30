"use strict";

const { query } = require("express");
const mongoose = require("mongoose");

//Schema
const itemSchema = mongoose.Schema({
	name: { type: String, index: true }, // Name article
	state: { type: String, index: true }, // Se busca, Se vende
	price: { type: Number, min:10, max: 10000, index: true }, // 'Se busca' a X precio / 'Se vende' a X precio
	image: { type: String, index: true },
	tags: { type: String, index: true } // work, lifestyle, motor y mobile
});

itemSchema.statics.lista = function(filtros, skip, limit, select, sort) {
	const query = Item.find(filtros);
	query.skip(skip);
	query.limit(limit);
	query.select(select);
	query.sort(sort);

	return query.exec();
};	

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;