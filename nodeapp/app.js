var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwtAuth = require("./lib/jwtAuth");
const LoginController = require("./controllers/loginController");

var app = express();

const loginController = new LoginController();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Connect MongoDb
require("./lib/connectMongoose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Middlewares
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes of my API
 */
app.post("/api/authenticate", loginController.postJWT);
app.use("/api/items", jwtAuth, require("./routes/api/items"));

/**
 * Routes
 */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.get("/login", loginController.index);
app.post("/login", loginController.post);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
