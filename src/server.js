
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';

import routes from './server/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/nlp', routes);


app.listen(9000, () => {
  console.log('app here');
});
