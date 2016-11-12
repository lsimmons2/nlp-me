import express from 'express';
import nodemailer from 'nodemailer';
import config from '../../config/config';

const router = express();
const transporter = nodemailer.createTransport(config.gmail);




    /*transporter.sendMail(mail, function(err, data){
      if(err){
        console.error('Nodemailer error: ', err);
        return res.status(500).send('Woops! Your request unfortunately wasn\'t sent to me.\
Please send your message via email.\nThanks!\n-Leo\n');
      }
      return res.status(200).send("Thanks for reaching out! I'll get back to you as soon a\
s I can.\n-Leo\n");
    });
  }
})
*/
function mailMe(req, res, next){

  let html = '<p>From: ' + req.body.name + '</p>' + '<p>Message: ' + req.body.message + '</p>';


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
