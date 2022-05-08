"use strict";

const cote = require("cote");
const jimp = require("jimp");

const responder = new cote.Responder(
  {
    name: "thumbnail creator responder",
  },
  { log: true, statusLogsEnabled: true }
);

const appendSuffix = (fileName, suffix) => {
  const dotPos = fileName.lastIndexOf(".");
  return fileName.substr(0, dotPos) + suffix + fileName.substr(dotPos);
};

responder.on("createThumbnail", async (req) => {
  const srcImagePath = req.image;
  const dstImagePath = appendSuffix(srcImagePath, "_thumbnail");

  console.log(`Creating thumbnail ${dstImagePath}...`);

  const image = await jimp.read(req.image);
  return image.scaleToFit(100, 100).write(dstImagePath);
});

console.log("thumbnailCreator Service started.");
