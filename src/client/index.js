import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import configureStore from './store';
import { Provider } from 'react-redux';
// import './style/main.scss';


function ready(){
  for (var type in this.types) {
    if (this.types[type]){
      return true;
    }
  }
  return false;
};

let initialState = {
  // text: '',
  // convo: [],
  aylien: {
    view: false,
    types: {
      classify: false,
      sentiment: false,
      concepts: false,
      hashtags: false
    },
    ready: ready
  },
  rosette: {
    view: false,
    types: {
      categories: false,
      sentiment: false,
      entities: false,
      relationships: false
    },
    ready: ready
  },
  indico: {
    view: false,
    types: {
      texttags: false,
      sentiment: false,
      personality: false,
      people: false,
      political: false,
      emotion: false
    },
    ready: ready
  },
  meaningcloud: {
    view: false,
    types: {
      classification: false,
      sentiment: false,
      topics: false
    },
    ready: ready
  }
}

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
