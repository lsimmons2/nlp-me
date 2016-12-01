
module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    './src/client'
  ],
  // devServer: {
  //   inline: true,
  //   contentBase: './src/client',
  //   port: 3000
  // },
  // resolve: {
  //   modulesDirectories: [
  //     'node_modules'
  //   ]
  // },
  output: {
    path: './src/client',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.es6$/, /\.jsx?$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
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
      // { test: /\.scss$/, loader: `${stylesheetsLoader}'!sass` }
    ]
  }
}
