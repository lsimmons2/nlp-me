
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

function selectAll(api){
  let selectAllType = api.toUpperCase() + '_SELECT_ALL';
  return {
    type: selectAllType
  }
}

function unselectAll(api){
  let unselectAllType = api.toUpperCase() + '_UNSELECT_ALL';
  return {
    type: unselectAllType
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

function clearInput(input){
  return {
    type: 'CLEAR_INPUT',
    input
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
  if(process.env.NODE_ENV === 'test'){
    url = 'http://localhost:8080' + url;
  }
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

    if (input.length){
      let clearedInput = false;
      for(api in apis){
        if (apis[api].ready()){
          if (!clearedInput){
            dispatch(clearInput(input));
            clearedInput = true;
          }
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
}

function updateFeedback(data){
  return {
    type: 'UPDATE_FEEDBACK',
    data
  }
}

function feedbackRequest(){
  return {
    type: 'FEEDBACK_REQUEST'
  };
}

function feedbackSuccess(){
  return {
    type: 'FEEDBACK_SUCCESS'
  }
}

function feedbackError(){
  return {
    type: 'FEEDBACK_ERROR'
  }
}

function sendFeedback(){
  return function(dispatch, getState){

    let data = getState().feedback.data;

    dispatch(feedbackRequest());

    let url = '/feedback';

    if(process.env.NODE_ENV === 'test'){
      url = 'http://localhost:8080' + url;
    }

    let req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    return fetch(url, req)
      .then(data => {
        dispatch(feedbackSuccess());
      })
      .catch(err => {
        dispatch(feedbackError());
      })

  }
}

function updateInput(input){
  return {
    type: 'UPDATE_INPUT',
    input
  }
}
export {
  toggleDropdownView,
  toggleSelection,
  selectAll,
  unselectAll,
  toggleMessageView,
  toggleTexttagsView,
  updateInput,
  clearInput,
  chatRequest,
  chatError,
  chatSuccess,
  callApi,
  chat,
  updateFeedback,
  sendFeedback
}
