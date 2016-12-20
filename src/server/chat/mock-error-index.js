
import express from 'express'
// import * as ctrl from './controller'
import * as mock from './mock-controller'

const router = express.Router();

router.post('/aylien', (req, res, next) => {
  let resp = [];
  let errors = [
    'classify',
    'sentiment',
    'concepts',
    'hashtags'
  ];
  let filteredErrors = errors.filter(error => {
    return req.body.types.indexOf(error) === -1;
  });
  filteredErrors.forEach(error => {
    resp.push({
      type: error,
      data: 'error'
    });
  })
  req.body.types.forEach( type => {
    resp.push(mock.aylien[type]());
  })
  return res.send(resp);
});

router.post('/rosette', (req, res, next) => {
  let resp = [];
  let errors = [
    'categories',
    'sentiment',
    'entities',
    'relationships'
  ];
  let filteredErrors = errors.filter(error => {
    return req.body.types.indexOf(error) === -1;
  });
  filteredErrors.forEach(error => {
    resp.push({
      type: error,
      data: 'error'
    });
  })
  req.body.types.forEach( type => {
    resp.push(mock.rosette[type]());
  })
  return res.send(resp);
});

router.post('/indico', (req, res, next) => {
  let resp = [];
  let errors = [
    'texttags',
    'sentiment',
    'personality',
    'people',
    'political',
    'emotion'
  ];
  let filteredErrors = errors.filter(error => {
    return req.body.types.indexOf(error) === -1;
  });
  filteredErrors.forEach(error => {
    resp.push({
      type: error,
      data: 'error'
    });
  })
  req.body.types.forEach( type => {
    resp.push(mock.indico[type]());
  })
  return res.send(resp);
});

router.post('/meaningcloud', (req, res, next) => {
  let resp = [];
  let errors = [
    'classification',
    'sentiment',
    'topics'
  ];
  let filteredErrors = errors.filter(error => {
    return req.body.types.indexOf(error) === -1;
  });
  filteredErrors.forEach(error => {
    resp.push({
      type: error,
      data: 'error'
    });
  })
  req.body.types.forEach( type => {
    resp.push(mock.meaningcloud[type]());
  })
  return res.send(resp);
});

export default router
