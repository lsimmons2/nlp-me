
// this should be what 'whatwg-fetch' when I set
// up Karma to run tests in browser environment
import 'isomorphic-fetch'

import reducer from '../../../src/client/reducers/feedback-reducer'
import chai from 'chai'
import initialState from '../../../src/client/initial-state'
const should = chai.should();



describe('UPDATE_FEEDBACK', () => {

  it('should update feedback data with data passed to it', () => {
    let feedbackData = {
      name: 'sah',
      email: 'sahh',
      message: 'sahhh'
    };
    let action = {
      type: 'UPDATE_FEEDBACK',
      data: feedbackData
    };
    let feedback = initialState.feedback;
    let returnedState = reducer(feedback, action);
    returnedState.data.should.equal(feedbackData);
  })

})


describe('FEEDBACK_REQUEST', () => {

  it('should set state.feedback.isFetching to true', () => {
    let action = {
      type: 'FEEDBACK_REQUEST'
    };
    let feedback = initialState.feedback;
    let returnedState = reducer(feedback, action);
    returnedState.isFetching.should.equal(true);
  })

  it('should set each state.feedback.data properties to \'\' to true', () => {
    let action = {
      type: 'FEEDBACK_REQUEST'
    };
    let feedback = initialState.feedback;
    feedback.data = {
      name: 'blah',
      email: 'blah blah',
      message: 'blah blah blah'
    };
    let returnedState = reducer(feedback, action);
    returnedState.data.name.should.equal('');
    returnedState.data.email.should.equal('');
    returnedState.data.message.should.equal('');
  })

})


describe('FEEDBACK_SUCCESS', () => {

  it('should set state.feedback.isFetching to false', () => {
    let action = {
      type: 'FEEDBACK_SUCCESS'
    };
    let feedback = initialState.feedback;
    let returnedState = reducer(feedback, action);
    returnedState.isFetching.should.equal(false);
  })

  it('should set state.feedback.success to true', () => {
    let action = {
      type: 'FEEDBACK_SUCCESS'
    };
    let feedback = initialState.feedback;
    let returnedState = reducer(feedback, action);
    returnedState.success.should.equal(true);
  })

})

describe('FEEDBACK_ERROR', () => {

  it('should set state.feedback.isFetching to false', () => {
    let action = {
      type: 'FEEDBACK_ERROR'
    };
    let feedback = initialState.feedback;
    let returnedState = reducer(feedback, action);
    returnedState.isFetching.should.equal(false);
  })

  it('should set state.feedback.error to true', () => {
    let action = {
      type: 'FEEDBACK_ERROR'
    };
    let feedback = initialState.feedback;
    let returnedState = reducer(feedback, action);
    returnedState.error.should.equal(true);
  })

})
