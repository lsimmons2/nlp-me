
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: './src/client',
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/': 'http://localhost:3000'
  }
}).listen(8080, 'localhost', function(err, result) {
  if (err) {
    return console.error(err);
  }
  console.log('webpack dev-server listening at 8080');
})
