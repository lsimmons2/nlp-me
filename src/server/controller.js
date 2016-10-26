import request from 'request';
import rp from 'request-promise';
import config from '../../config/config';

/*
*
*   req.body is of the following structure:
*
*     {
*       text: "text to be analyzed"
*     },
*     {
*       analysis: {
*         analysisType: boolean,
*         analysisType2: boolean,
*         analysisType3: boolean
*       }
*     }
*
*/



function hitApi(url, data, headers){
  let options = JSON.stringify({
    url: url,
    headers: headers,
    form: data
  });
  return new Promise((resolve, reject) => {
    request.post(options, function(err, response, body){
      if(err){
        return reject(err);
      }
      return resolve(body);
    })
  })
};



/*
*  aylien api takes following endpoints:
*   - classify
*   - sentiment
*   - concepts
*   - entities
*   - summarize
*   - image-tags
*   - hashtags
*   - related [phrases]
*   - unsupervised (semantic labeling)
*/
function aylien(req, res, next){

  let base = 'https://api.aylien.com/api/v1/';
  let data = {
    'text' : req.body.text
  };
  let types = req.body.analysis;
  let headers = config.aylien.headers;
  let callPromises = [];

  for (let type in types){
    if(types[type]){
      callPromises.push(hitApi(base + type, data, headers));
    }
  }

  Promise.all(callPromises)
    .then(function(results){
      return res.status(200).send(results);
    })
    .catch(function(err){
      return res.status(500).send(err);
    });

};


/*
*  bitext api takes following endpoints:
*   - sentiment
*   - concepts
*   - entities
*/
function bitext(req, res, next){

  let base = 'https://svc02.api.bitext.com/';
  let data = {
    'language': 'eng',
    'text' : req.body.text
  };
  let types = req.body.analysis;
  let headers = config.bitext.headers;
  let callPromises = [];

  for (let type in types){
    if(types[type]){
      callPromises.push(hitApi(base + type, data, headers));
    }
  }

  Promise.all(callPromises)
    .then(function(results){
      return res.status(200).send(results);
    })
    .catch(function(err){
      return res.status(500).send(err);
    });

};



/*
*  rosette api takes following endpoints:
*   - entities
*   - relationships
*   - categories
*   - sentiment
*/
function rosette(req, res, next){

  let base = 'https://api.rosette.com/rest/v1/';
  let data = {
    'content' : req.body.text
  };
  let types = req.body.analysis;
  let headers = config.rosette.headers;
  let callPromises = [];

  for (let type in types){
    if(types[type]){
      callPromises.push(hitApi(base + type, data, headers));
    }
  }

  Promise.all(callPromises)
    .then(function(results){
      return res.status(200).send(results);
    })
    .catch(function(err){
      return res.status(500).send(err);
    });

};



export {aylien, bitext, rosette}
