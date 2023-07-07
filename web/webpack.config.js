const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = path.resolve(__dirname, "../");

const babelLoaderConfiguration = {
  test: /\.js$/,
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["@babel/preset-react"],
      plugins: ["react-native-web"],
    },
  },
};

module.exports = {
  entry: [path.resolve(appDirectory, "index.web.js")],
  output: {
    filename: "bundle.web.js",
    path: path.resolve(appDirectory, "dist"),
  },

  module: {
    rules: [babelLoaderConfiguration],
  },

  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],

  resolve: {
    alias: {
      "react-native$": "react-native-web",
    },
    extensions: [".web.js", ".js"],
  },
};
