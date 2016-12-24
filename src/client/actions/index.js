
require('es6-promise').polyfill();
import 'whatwg-fetch'

function toggleDropdownView(api){
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

function toggleMessageView(id){
  return {
    type: 'TOGGLE_MESSAGE_VIEW',
    id
  }
}

function toggleTexttagsView(id){
  return {
    type: 'TOGGLE_TEXTTAGS_VIEW',
    id
  }
}

function chatRequest(){
  return {
    type: 'CHAT_REQUEST'
  }
}

function chatSuccess(api, data){
  let analyses = {
    successes: [],
    errors: []
  };
  data.forEach(analysis => {
    if(analysis.data !== 'error'){
      if (typeof analysis.data === 'string' || analysis.data instanceof String){
        analysis.data = JSON.parse(analysis.data);
      }
      analyses.successes.push(analysis);
    } else {
      analyses.errors.push(analysis.type);
    }
  })
  if (!analyses.successes.length){
    let error = new Error('No successful analyses.');
    return {
      type: 'CHAT_FAIL',
      api,
      errors: analyses.errors
    }
  }
  return {
    type: 'CHAT_SUCCESS',
    api,
    analyses
  }
}

function chatError(api, error){
  return {
    type: 'CHAT_ERROR',
    api,
    error
  }
}

function callApi(dispatch, api, input, types){

  let url = `/chat/${api}`;
  let req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: input,
      types: types
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
      dispatch(chatSuccess(api, data));
    })
    .catch(err => {
      dispatch(chatError(api, err));
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
        callApi(dispatch, api, input, types);
        types = [];
      }
    }

  }
}


export {
  toggleDropdownView,
  toggleSelection,
  toggleMessageView,
  toggleTexttagsView,
  chatRequest,
  chatError,
  chatSuccess,
  callApi,
  chat
}
