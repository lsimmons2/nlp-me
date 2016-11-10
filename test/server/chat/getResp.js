/*** AYLIEN ***
  'classify',
  'sentiment',
  'concepts',
  'entities',
  'hashtags'
*/

/*** ROSETTE ***
  'entities',
  'sentiment',
  'categories',
  'relationships'
*/

/*** INDICO ***
  'texttags',
  'sentiment',
  'personality',
  'people',
  'political',
  'personas',
  'emotion'
*/

/*** MEANING CLOUD ***
  'topics',
  'sentiment',
  'classification'
*/


import util from 'util';
import fs from 'fs';
import inputs from './inputs';
import request from 'request';


let text;
let toAdd;
const type = 'classification';
let file = './responses/meaningcloud/classification.js';

let options = {
  url: 'http://127.0.0.1:8080/chat/meaningcloud',
  json: {
    types: [type]
  }
};


function hitApi(text) {

  options.json.text = text;

  return new Promise((resolve) => {
    request.post(options, (err, response, body) => {
      if(err){
        toAdd = {
          type: type,
          text: text,
          error: err
        }
        fs.appendFile(file, JSON.stringify(toAdd, null, 2) + ',\r\n');
        resolve();
      }
      toAdd = {
        type: type,
        text: text,
        res: body
      }
      fs.appendFile(file, JSON.stringify(toAdd, null, 2) + ',\r\n');
      resolve();
    })
  });

};


let chain = Promise.resolve();
let timeout = 0;
for (const input of inputs.slice(1)) {
  setTimeout(() => {
    chain = chain.then(hitApi(input));
  }, timeout);
  timeout += 500;
}
