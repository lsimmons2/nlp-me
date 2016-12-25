
import { combineReducers } from 'redux'

import convoReducer from './convo-reducer'
import feedbackReducer from './feedback-reducer'

import aylienReducer from './aylien-reducer'
import rosetteReducer from './rosette-reducer'
import indicoReducer from './indico-reducer'
import meaningcloudReducer from './meaningcloud-reducer'


const apisReducer = combineReducers({
  aylien: aylienReducer,
  rosette: rosetteReducer,
  indico: indicoReducer,
  meaningcloud: meaningcloudReducer
})

const rootReducer = combineReducers({
  convo: convoReducer,
  feedback: feedbackReducer,
  apis: apisReducer
})

export default rootReducer
