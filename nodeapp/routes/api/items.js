"use strict";

const express = require("express");
const upload = require("../../lib/multerConfig");
const createError = require("http-errors");
const router = express.Router();
const { Item } = require("../../models");

// GET /api/items
router.get("/", async (req, res, next) => {
  try {
    //Request with filters
    const name = req.query.name;
    const price = req.query.price;
    const state = req.query.state;
    // const image = req.query.image;
    const tags = req.query.tags;

    // Pagination
    const skip = req.query.limit;

    // Limits the amount
    const limit = req.query.limit;

    //Fields to show
    const select = req.query.select;

    //Field to sort
    const sort = req.query.sort;

    console.log("El usuario que ha hecho esta petición tiene el _id:", req.apiUserId);

    // Obj filtros
    const filtros = {};

    if (name) {
      filtros.name = name;
    }

    if (price) {
      filtros.price = price;
    }

    if (state) {
      filtros.state = state;
    }

    // if (image) {
    //   filtros.image = image;
    // }

    if (tags) {
      filtros.tags = tags;
    }

    const items = await Item.lista(filtros, skip, limit, select, sort);
    res.json({ result: items });
  } catch (err) {
    next(err);
  }
});

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    const item = new Item(req.body);

    await item.setImage({
      path: req.file.path,
      originalName: req.file.originalname,
    });
    const saved = await item.save();
    res.json({
      ok: true,
      result: saved,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:name
router.get("/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const item = await Item.find({ name: name });

    if (!item) {
      next(createError(404));
      return;
    }
    res.json({ result: item });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:state
router.get("/:state", async (req, res, next) => {
  try {
    const state = req.params.state;
    const item = await Item.find({ state: state });
    console.log(item);

    if (!item) {
      next(createError(404));
      return;
    }
    res.json({ result: item });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:tags
router.get("/:tags", async (req, res, next) => {
  try {
    const tags = req.params.tags;
    const item = await Item.find({ tags: tags });

    if (!item) {
      next(createError(404));
      return;
    }
    res.json({ result: item });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:price
router.get("/:price", async (req, res, next) => {
  try {
    const price = req.params.price;
    const item = await Item.find({ price: price });

    if (!item) {
      next(createError(404));
      return;
    }
    res.json({ result: item });
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    const itemData = req.body;

    // creo un objeto de Item EN MEMORIA
    const item = new Item(itemData);
    const itemGuardado = await item.save();
    res.status(201).json({ result: itemGuardado });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/items/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Item.deleteOne({ _id: id });
    res.json();
  } catch (err) {
    next(err);
  }
});

// PUT /api/items:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const itemData = req.body;

    let itemActualizado;
    try {
      itemActualizado = await Item.findByIdAndUpdate(id, itemData, {
        new: true, // esta opción sirve para que nos devuelva el estado final del documento
      });
    } catch (err) {
      next(createError(422, "invalid id"));
      return;
    }

    if (!itemActualizado) {
      next(createError(404));
      return;
    }

    res.json({ result: itemActualizado });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
