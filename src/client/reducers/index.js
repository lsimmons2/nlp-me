
import { combineReducers } from 'redux';
import aylienReducer from './aylien-reducer';


const rootReducer = combineReducers({
  aylien: aylienReducer
})

export default rootReducer
