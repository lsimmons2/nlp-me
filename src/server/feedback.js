import express from 'express';
import nodemailer from 'nodemailer';
import config from '../../config/config';

const router = express();
const transporter = nodemailer.createTransport(config.gmail);


function mailMe(req, res, next){

  let html = '<p>From: ' + req.body.name + '</p>' + '<p>Email: ' + req.body.email + '</p>' + '<p>Message: ' + req.body.message + '</p>';


  let mail = {
    from: req.body.email,
    to: 'leooscar.simmons@gmail.com',
    subject: 'NLP ME Feedback',
    html: html
  };

  return transporter.sendMail(mail, function(err, data){
    if(err){
      return res.status(500).send();
    }
    return res.status(200).send();
  })

};

router.post('/', (req, res, next) => {
  return mailMe(req, res, next);
});

export default router
