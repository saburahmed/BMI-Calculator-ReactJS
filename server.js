"use strict";

let express = require("express");
let path = require("path");
let webpack = require("webpack");
let app = express();

let isDevelopment = (process.env.NODE_ENV !== "production");
let static_path = path.join(__dirname, "public");

if (isDevelopment) {
  let config = require("./webpack.config");
  let WebpackDevServer = require("webpack-dev-server");

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(3000, "localhost", function(err, result) {
    if (err) { console.log(err); }
    console.log("Listening at localhost:3000");
  });
} else {
  app.use(express.static(static_path))
    .get("/", function(req, res) {
      res.sendFile("index.html", {
        root: static_path
      });
    })
    .listen(process.env.PORT || 8080, function(err) {
      if (err) { console.log(err); };
      console.log("Listening at localhost:8080");
    });
  }