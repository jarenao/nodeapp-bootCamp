"use strict";

const { Usuario } = require("../models");

class LoginController {
  index(req, res, next) {
    res.render("login");
  }

  async post(req, res, next) {
    try {
      // Buscar
      const { email, password } = req.body;
      const usuario = await Usuario.findOne({ email });

      // No existe
      if (!usuario || !(await usuario.hashPassword(password))) {
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
}

module.exports = LoginController;
