
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import initialState from './initial-state'
import App from './components/app';
import configureStore from './store';
import './style/main.scss';


let store = configureStore(initialState);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
