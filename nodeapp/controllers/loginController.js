"use strict";
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

class LoginController {
  index(req, res, next) {
    res.locals.email = "";
    res.locals.error = "";
    res.render("login");
  }

  async post(req, res, next) {
    try {
      // Buscar
      const { email, password } = req.body;
      const usuario = await Usuario.findOne({ email });

      // No existe
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.locals.email = email;
        res.locals.error = res.__("Invalid credentials");
        res.render("login");
        return;
      }

      // Sí existe
      console.log(`Sí existe el usuario ${email}`);
    } catch (error) {
      next(error);
    }
  }

  // login post desde API que retorna JWT
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // Buscar
      const usuario = await Usuario.findOne({ email });

      // Error
      if (!usuario || !(await usuario.comparePassword(password))) {
        console.log("usuario", usuario);
        res.json({ error: "invalid credentials" });
        return;
      }

      // JWT con _id
      jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // devolver al cliente es token generado
          res.json({ token: jwtToken });
        }
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LoginController;
