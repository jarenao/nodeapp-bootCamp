"use strict";

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Recoger token
  const jwtToken =
    req.get("Authorization") || req.query.token || req.body.token;

  // Comprobar si han dado token
  if (!jwtToken) {
    const error = new Error("No token provided");
    error.status = 401;
    next(error);
    return;
  }

  // Token valido?
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const error = new Error("Invalid Token");
      error.status = 401;
      next(error);
      return;
    }

    req.apiUserId = payload._id;

    // si es válido, continuar
    next();
  });
};
