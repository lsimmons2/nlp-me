
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import path from 'path'

import chat from './chat';
// import feedback from './feedback';


const env = process.env.NODE_ENV;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.all('*', (req, res, next) => {
  console.log(req.method, req.url);
  next();
})
app.use('/chat', chat);
// app.use('/feedback', feedback);

app.use('/vendor', express.static(path.join(__dirname, '../../node_modules')));
app.use('/images', express.static(path.join(__dirname, '../../images')));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/client/index.html'));
});



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
