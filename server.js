
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';


const app = express();

app.use('/', express.static('../'));

app.listen(9000, () => {
  console.log('app here');
});
