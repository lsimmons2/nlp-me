import request from 'request';
import rp from 'request-promise';
import config from '../../../config/config';
//import indicoSdk from 'indico.io';

/*
*
*   req.body is of the following structure:
*
*     {
*       text: "text to be analyzed",
*       types: [
*        'type1',
*        'type2',
*        'type3'
*       ]
*     }
*
*/



function hitApi(options, type){


  return new Promise((resolve, reject) => {
    request.post(options, function(err, response, body){
      if(err || response.statusCode > 200){
        return resolve({
          type: type,
          data: 'error'
        });
      }
      return resolve({
        type: type,
        data: body
      });
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
  let types = req.body.types;

  let options = {
    url: '',
    headers: config.aylien.headers,
    form: {
      text: req.body.text
    }
  };

  let callPromises = [];

  types.forEach(type => {
    options.url = base + type;
    callPromises.push(hitApi(options, type));
  });

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
  let types = req.body.types;

  let options = {
    url: '',
    headers: config.rosette.headers,
    json: {
      'content': req.body.text
    }
  };

  let callPromises = [];

  types.forEach(type => {
    options.url = base + type;
    callPromises.push(hitApi(options, type));
  });

  Promise.all(callPromises)
    .then(function(results){
      return res.status(200).send(results);
    })
    .catch(function(err){
      return res.status(500).send(err);
    });

};


//indicoSdk.apiKey = config.indico.key;
/*
*  indico sdk uses following methods:
*   - texttags
*   - sentiment
*   - personality
*   - people
*   - political
*   - personas
*   - emotion
*/
function indico(req, res, next){

  let types = req.body.types;
  let text = req.body.text;

  let options = {
    headers: config.indico.headers,
    json: {
      'data': text
    }
  };

  let callPromises = [];

  types.forEach(type => {
    options.url = 'https://apiv2.indico.io/' + type;
    //callPromises.push(indicoSdk[type](text));
    callPromises.push(hitApi(options, type))
  });

  Promise.all(callPromises)
    .then(function(results){
      return res.status(200).send(results);
    })
    .catch(function(err){
      return res.status(500).send(err);
    });

};


function mcOptions(type, text){
  let options = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      key: config.meaningcloud.key,
      lang: 'en',
      txt: text
    }
  };
  if (type === 'topics'){
    options.url = 'http://api.meaningcloud.com/topics-2.0';
    options.form.tt = 'a';
    return options;
  }
  else if (type === 'sentiment'){
    options.url = 'http://api.meaningcloud.com/sentiment-2.1';
    return options;
  }
  else if (type === 'classification'){
    options.url = 'http://api.meaningcloud.com/class-1.1';
    options.form.model = 'IAB_en';
    return options;
  }
  else {
    throw new Error();
  }
};


/*
*  meaningcloud api takes following endpoints:
*   - entities
*   - relationships
*   - categories
*   - sentiment
*/
function meaningcloud(req, res, next){

  let types = req.body.types;
  let text = req.body.text;
  let callPromises = [];
  let options;

  types.forEach(type => {
    options = mcOptions(type, text);
    callPromises.push(hitApi(options, type));
  });
  Promise.all(callPromises)
    .then(function(results){
      return res.status(200).send(results);
    })
    .catch(function(err){
      return res.status(500).send(err);
    });

};



export {aylien, rosette, indico, meaningcloud}
