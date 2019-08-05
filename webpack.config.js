"use strict";

let path = require("path");
let webpack = require("webpack");

module.exports = {
  devtool: "eval",

  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./src/index"
  ],

  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: [ "", ".js", ".jsx" ]
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: "babel",
        exclude: /node_modules/,
        include: path.join(__dirname, "src")
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.sass/,
        loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax"
      },
      {
        test: /\.scss/,
        loader: "style-loader!css-loader!sass-loader?outputStyle=expanded"
      },
      {
        test: /\.less/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.styl/,
        loader: "style-loader!css-loader!stylus-loader"
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|svg)$/,
        loader: "url-loader"
      },
      { test: /\.(eot)$/,
        loader: "file-loader"
      }
    ]
  }
}