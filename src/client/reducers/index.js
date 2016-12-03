
import { combineReducers } from 'redux';
import aylienReducer from './aylien-reducer';
import rosetteReducer from './rosette-reducer';
import indicoReducer from './indico-reducer';
import meaningcloudReducer from './meaningcloud-reducer';
// import mainReducer from './main-reducer';

const rootReducer = combineReducers({
  // aylien: mainReducer,
  // rosette: mainReducer,
  // indico: mainReducer,
  // meaningcloud: mainReducer
  aylien: aylienReducer,
  rosette: rosetteReducer,
  indico: indicoReducer,
  meaningcloud: meaningcloudReducer
})

export default rootReducer
