const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const clientConfig = {
  entry: "./src/client/App.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[name].[hash].js",
    publicPath: "/",
    chunkFilename: "chunk.[name].[hash].js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
};

const serverConfig = {
  entry: "./src/server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/",
    library: "",
    libraryTarget: "commonjs",
  },
  devtool: "cheap-module-source-map",
  target: "node",
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: `'production'`,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
};

module.exports = [clientConfig, serverConfig];
