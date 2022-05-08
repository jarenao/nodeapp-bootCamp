"use strict";

const { query } = require("express");
const mongoose = require("mongoose");
const fs = require("fs-extra");
const path = require("path");
const cote = require("cote");
const fsPromises = require("fs").promises;

const { IMAGE_URL_BASE_PATH } = process.env;

const thumbnailRequester = new cote.Requester(
  {
    name: "thumbnail creator client",
  },
  { log: true, statusLogsEnabled: true }
);

//Schema
const itemSchema = mongoose.Schema({
  name: { type: String, index: true }, // Name article
  state: { type: String, index: true }, // Se busca, Se vende
  price: { type: Number, min: 10, max: 10000, index: true }, // 'Se busca' a X precio / 'Se vende' a X precio
  image: String,
  tags: { type: String, index: true }, // work, lifestyle, motor y mobile
});

itemSchema.statics.cargaJson = async function (fichero) {
  const data = await fsPromises.readFile(fichero, { encoding: "utf8" });

  if (!data) {
    throw new Error(fichero + " está vacio!");
  }

  const items = JSON.parse(data).items;

  for (var i = 0; i < items.length; i++) {
    await new Item(items[i]).save();
  }

  return items.length;
};

itemSchema.statics.createRecord = function (nuevo, cb) {
  new Item(nuevo).save(cb);
};

itemSchema.statics.lista = async function (filtros, skip, limit, select, sort, includeTotal, cb) {
  const query = Item.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);

  const result = {};

  if (includeTotal) {
    result.total = await Item.count();
  }

  result.rows = await query.exec();
  result.rows.forEach((elem) => (elem.image = elem.image ? path.join(IMAGE_URL_BASE_PATH, elem.image) : null));

  if (cb) return cb(null, result);
  return result;
};

itemSchema.methods.setImage = async function ({ path, originalname: originalName }) {
  if (!originalName) return;

  const imagePublicPath = path.join(__dirname, "../public/images", originalName);
  await fs.copy(path, imagePublicPath);

  this.image = originalName;

  thumbnailRequester.send({ type: "createThumbnail", image: imagePublicPath });
};

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
