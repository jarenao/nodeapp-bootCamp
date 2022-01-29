"use strict";

const express = require("express");
const Item = require("../../models/Item");
const router = express.Router();

const Agente = require("../../models/Item");

// GET /api/items
router.get("/", async(req, res, next)=> {
	try {
		const items = await Item.find();
		res.json({ result: items });
	} catch (err) {
		next(err);
	}
});

module.exports = router;