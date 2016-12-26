
import express from 'express'
import * as mock from './mock-controller'

const router = express.Router();

router.post('/aylien', (req, res, next) => {
  let resp = [];
  req.body.types.forEach( type => {
    resp.push(mock.aylien[type]());
  })
  return res.send(resp);
});

router.post('/rosette', (req, res, next) => {
  let resp = [];
  req.body.types.forEach( type => {
    resp.push(mock.rosette[type]());
  })
  return res.send(resp);
});

router.post('/indico', (req, res, next) => {
  let resp = [];
  req.body.types.forEach( type => {
    resp.push(mock.indico[type]());
  })
  return res.send(resp);
});

router.post('/meaningcloud', (req, res, next) => {
  let resp = [];
  req.body.types.forEach( type => {
    resp.push(mock.meaningcloud[type]());
  })
  return res.send(resp);
});

export default router
