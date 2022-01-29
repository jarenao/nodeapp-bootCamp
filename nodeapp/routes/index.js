var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "NodeApp" });
});

// Test
router.get("/test", (req, res, next) => {
	res.send("respuesta");
});

module.exports = router;
