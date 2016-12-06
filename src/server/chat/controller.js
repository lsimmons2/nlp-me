

import request from 'request';
import config from '../../../config/config';
import Message from './models/messageModel';
import Call from './models/callModel';
import logger from './logger';
import AylienApi from 'aylien_textapi';

const aylienApi = new AylienApi({
  application_id: config.aylien.headers['X-AYLIEN-TextAPI-Application-ID'],
  application_key: config.aylien.headers['X-AYLIEN-TextAPI-Application-Key']
});



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





function store(api, body){
  let message = new Message;
  message.api = api;
  message.text = body.text;
  message.types = body.types;
  message.save()
    .then( message => {
      logger.info('Message saved: ', util.inspect(message, true, 6));
    })
    .catch( err => {
      logger.error('Error saving message: ', util.inspect(err, true, 6));
    })
};

import util from 'util';

function hitApi(options, api, type){

  return new Promise((resolve, reject) => {

    let call = new Call;
    call.api = api;
    call.url = options.url;
    if (options.form){
      call.text = options.form.text || options.form.txt;
    }
    if (options.json){
      call.text =  options.json.content || options.json.data;
    }
    call.type = type;

    request.post(options, (err, response, body) => {
      if(err || response.statusCode > 200){
        call.error = err || body || { error: 'Unknown error' };
        call.save()
          .then( call => {
            logger.info('Call saved: ', call);
          })
          .catch( err => {
            logger.error('Error saving call: ', err);
          })
        return resolve({
          type: type,
          data: 'error'
        });
      }
      call.response = body || { body: 'Unknown' };
      call.save()
        .then( call => {
          logger.info('Call saved: ', util.inspect(call, true, 6));
        })
        .catch( err => {
          logger.error('Error saving call: ', util.inspect(err, true, 6));
        })
      return resolve({
        type: type,
        data: body
      });
    })
  })

};



function callAylien(type, text){

  let analysis;

  return new Promise( (resolve, reject) => {

    if( type === 'classify') {
      aylienApi.classifyByTaxonomy({
        'text': text,
        'taxonomy': 'iab-qag'
      }, (error, response) => {
        if (error){
          logger.error('Error saving Aylien call: ', util.inspect(err, true, 6));
          return reject(error);
        }
        logger.info('Aylien call saved: ', util.inspect(response, true, 6));
        analysis = {};
        analysis['type'] = 'classify';
        analysis['data'] = JSON.stringify(response);
        return resolve(analysis);
      });
    }

    if ( type === 'sentiment') {
      aylienApi.sentiment({
        text: text,
        mode: 'tweet'
      }, function(error, response) {
        if (error){
          return reject(error);
        }
        analysis = {};
        analysis['type'] = 'sentiment';
        analysis['data'] = JSON.stringify(response)
        return resolve(analysis);
      });
    }

    if ( type === 'concepts') {
      aylienApi.concepts({
        text: text
      }, function(error, response) {
        if (error){
          return reject(error);
        }
        analysis = {};
        analysis['type'] = 'concepts';
        analysis['data'] = JSON.stringify(response);
        return resolve(analysis);
      });
    }

    if ( type === 'hashtags') {
      aylienApi.hashtags({
        text: text
      }, function(error, response) {
        if (error){
          return reject(error);
        }
        analysis = {};
        analysis['type'] = 'hashtags';
        analysis['data'] = JSON.stringify(response);
        return resolve(analysis);
      });
    }

  })


}



/*
*  aylien analyses:
*   - classify
*   - sentiment
*   - concepts
*   - hashtags
*/




function aylien(req, res, next){

  store('aylien', req.body);

  let types = req.body.types;
  let text = req.body.text;

  let callPromises = [];

  types.forEach(type => {
    callPromises.push(callAylien(type, text));
  });

  Promise.all(callPromises)
    .then(function(results){
      logger.info('Aylien response processed: ', results);
      return res.status(200).send(results);
    })
    .catch(function(err){
      logger.error('Error processing aylien reponse: ', err);
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

  store('rosette', req.body);

  let base = 'https://api.rosette.com/rest/v1/';
  let types = req.body.types;

  let options = {
    url: '',
    headers: config.rosette.headers,
    json: {
      'content': req.body.text,
      'language': 'eng'
    }
  };


  let callPromises = [];

  types.forEach(type => {
    options.url = base + type;
    callPromises.push(hitApi(options, 'rosette', type));
  });

  Promise.all(callPromises)
    .then(function(results){
      logger.info('Rosette response processed: ', results);
      return res.status(200).send(results);
    })
    .catch(function(err){
      logger.error('Error processing rosette reponse: ', err);
      return res.status(500).send(err);
    });

};


/*
*  indico sdk uses following methods/endpoints:
*   - texttags
*   - sentiment
*   - personality
*   - people
*   - political
*   - emotion
*/
function indico(req, res, next){

  store('indico', req.body);

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
    callPromises.push(hitApi(options, 'indico', type))
  });

  Promise.all(callPromises)
    .then(function(results){
      logger.info('Indico response processed: ', results);
      return res.status(200).send(results);
    })
    .catch(function(err){
      logger.error('Error processing indico reponse: ', err);
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
    throw new Error('Wrong analysis type');
  }
};


/*
*  meaningcloud api takes following endpoints:
*   - entities
*   - categories
*   - sentiment
*/
function meaningcloud(req, res, next){

  store('meaningcloud', req.body);

  let types = req.body.types;
  let text = req.body.text;
  let callPromises = [];
  let options;


  types.forEach(type => {
    options = mcOptions(type, text);
    callPromises.push(hitApi(options, 'meaningcloud', type));
  });

  Promise.all(callPromises)
    .then(function(results){
      logger.info('Meaningcloud response processed: ', results);
      return res.status(200).send(results);
    })
    .catch(function(err){
      logger.error('Error processing meaningcloud reponse: ', err);
      return res.status(500).send(err);
    });

};



export {aylien, rosette, indico, meaningcloud}
