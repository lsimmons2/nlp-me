var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./src/public/index.js'],
  output: {
    path: './dist/public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
