
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'whatwg-fetch',
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server',
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'src/client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: [/\.js$/],
        loaders: ['react-hot'],
        include: path.join(__dirname, 'src/client')
      },
      {
        test: [/\.js$/],
        loader: 'babel-loader',
        include: path.join(__dirname, 'src/client'),
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'sass'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
