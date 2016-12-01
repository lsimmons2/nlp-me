
import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import methodOverride from 'method-override';
// import cookieParser from 'cookie-parser';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// import search from './search';
// import chat from './chat';
// import feedback from './feedback';


const env = process.env.NODE_ENV;
const app = express();


import webpackConfig from '../../webpack.config.js';
const bundler = webpack(webpackConfig);
app.use(webpackDevMiddleware(bundler, {noInfo: true, clientPath: webpackConfig.output.clientPath}));
app.use(webpackHotMiddleware(bundler));

// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
// app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/vendor', express.static(path.join(__dirname, '../../node_modules')));
// app.use('/images', express.static(path.join(__dirname, '../../images')));
// app.use('/test', express.static(path.join(__dirname, '../../test')));
//
// app.use('/nlp', search);
// app.use('/chat', chat);
// app.use('/feedback', feedback);


// let dbUri = 'mongodb://localhost:27017/nlpme-' + env;
// mongoose.connect(dbUri);
// mongoose.connection
//   .on('error', (err) => {
//     return console.log(err.message);
//   })
//   .once('connected', () => {
//     return console.log('Connection to ', dbUri);
//   })
//   .once('disconnected', () => {
//     return console.log('Disconnected from ', dbUri);
//   });
//
// process.on('SIGINT', function(){
//   mongoose.connection.close(function(){
//     return process.exit(0);
//   });
// });


if(env === 'prod'){
  app.listen(80, () => {
    console.log('app here in prod mode');
  })
}


if(env === 'dev'){
  app.listen(3000, () => {
    console.log('app here in dev mode (3000)');
  });
}


module.exports = app;
