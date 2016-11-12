
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';

import search from './search';
import chat from './chat';
import feedback from './feedback';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../../node_modules')));
app.use('/images', express.static(path.join(__dirname, '../../images')));
app.use('/test', express.static(path.join(__dirname, '../../test')));

app.use('/nlp', search);
app.use('/chat', chat);
app.use('/feedback', feedback);


if(process.env.NODE_ENV !== 'test'){
  app.listen(8080, () => {
    console.log('app here');
  });
}


module.exports = app;
