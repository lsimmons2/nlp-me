
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import defInitialState from './initial-state'

let finalCreateStore = compose(
  applyMiddleware(thunk, logger())
)(createStore)

function ready(){
  for (var type in this.types) {
    if (this.types[type]){
      return true;
    }
  }
  return false;
};


export default function configureStore(initialState = defInitialState){
  return finalCreateStore(rootReducer, initialState)
}
