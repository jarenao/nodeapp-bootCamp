var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.locals.items = require("../initDB.items.json");
	
	res.render("index", { title: "NodeApp", subtitle: "Welcome to the best advertising site that no one wants ;)" });
});

// Test
router.get("/test", (req, res, next) => {
	res.send("respuesta");
});

module.exports = router;
