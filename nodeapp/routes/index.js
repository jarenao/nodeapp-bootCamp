var express = require("express");
const { query, validationResult } = require("express-validator");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.locals.items = require("../initDB.items.json");

  res.render("index");
});

// /api/items?tags=mobile
router.get("/tags/:tags(work|lifestyle|motor|mobile)", (req, res, next) => {
  //Parámetros todos obligatorios, busca filtro igual. Pero si le ponemos el interrogante es opcional
  const tags = req.params.tags;

  res.render(`Ok Tags ${tags} `);
});

// /api/items?state=compra
router.get("/state/:state(compra|venta)", (req, res, next) => {
  //Parámetros todos obligatorios, busca filtro igual. Pero si le ponemos el interrogante es opcional
  const state = req.params.state;

  res.render(`Ok State ${state} `);
});

module.exports = router;
