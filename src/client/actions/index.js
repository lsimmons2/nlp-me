
require('es6-promise').polyfill();
import 'whatwg-fetch'

function toggleView(api){
  let toggleViewType = api.toUpperCase() + '_TOGGLE_VIEW';
  return {
    type: toggleViewType
  }
}

function toggleSelection(api, analysisType){
  let toggleSelectionType = api.toUpperCase() + '_TOGGLE_SELECTION';
  return {
    type: toggleSelectionType,
    analysisType
  }
}

function chatRequest(){
  return {
    type: 'CHAT_REQUEST'
  }
}

function chatSucess(){

}

function chatError(){

}

function callApi(api, input, types){

  let url = `/chat/${api}`;
  let req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: input,
      types
    })
  };

  return fetch(url, req)
    .then(resp => {
      if(!resp.ok){
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => {
      console.log('sah');
      console.log(data);
    })
    .catch(err => {
      console.log('nah?');
      console.log(err);
    })

}

function chat(){

  return function(dispatch, getState){

    const input = getState().convo.input;
    let api;
    let apis = getState().apis;
    let type;
    let types = [];

    for(api in apis){

      if(apis[api].ready()){
        dispatch(chatRequest());
        for(type in apis[api].types){
          if (apis[api].types[type]){
            types.push(type);
          }
        }
        callApi(api, input, types);
        types = [];
      }

    }

  }


}


export { toggleView, toggleSelection, chat }
