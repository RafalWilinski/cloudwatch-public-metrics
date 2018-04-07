
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const clientConfig = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};

const serverConfig = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/',
    library: '', libraryTarget: 'commonjs'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};


module.exports = [clientConfig, serverConfig];
