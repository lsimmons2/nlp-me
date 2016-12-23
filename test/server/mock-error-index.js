
import express from 'express'
// import * as ctrl from './controller'
import * as mock from './mock-controller'

const shouldFilter = true;

const router = express.Router();

function filter(req, res, next, api, errors){
  let resp = [];
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
    resp.push(mock[api][type]());
  })
  return res.send(resp);
}

function all(req, res, next, errors){
  let resp = [];
  errors.forEach(error => {
    resp.push({
      type: error,
      data: 'error'
    })
  })
  console.log(resp);
  return res.send(resp);
}

router.post('/aylien', (req, res, next) => {
  let errors = [
    'classify',
    'sentiment',
    'concepts',
    'hashtags'
  ];
  if(shouldFilter){
    console.log('SENDING SPECIFIC ERRORS');
    return filter(req, res, next, 'aylien', errors);
  } else {
    console.log('SENDING ALL ERRORS');
    return all(req, res, next, errors);
  }

});

router.post('/rosette', (req, res, next) => {
  let resp = [];
  let errors = [
    'categories',
    'sentiment',
    'entities',
    'relationships'
  ];
  if(shouldFilter){
    console.log('SENDING SPECIFIC ERRORS');
    return filter(req, res, next, 'rosette', errors);
  } else {
    console.log('SENDING ALL');
    return all(req, res, next, errors);
  }
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
  if(shouldFilter){
    console.log('SENDING SPECIFIC ERRORS');
    return filter(req, res, next, 'indico', errors);
  } else {
    console.log('SENDING ALL');
    return all(req, res, next, errors);
  }
  return res.send(resp);
});

router.post('/meaningcloud', (req, res, next) => {
  let resp = [];
  let errors = [
    'classification',
    'sentiment',
    'topics'
  ];
  if(shouldFilter){
    console.log('SENDING SPECIFIC ERRORS');
    return filter(req, res, next, 'meaningcloud', errors);
  } else {
    console.log('SENDING ALL');
    return all(req, res, next, errors);
  }
  return res.send(resp);
});

export default router
