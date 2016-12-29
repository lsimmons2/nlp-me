
// this should be what 'whatwg-fetch' when I set
// up Karma to run tests in browser environment
import 'isomorphic-fetch'

import reducer from '../../../src/client/reducers/aylien-reducer'
import chai from 'chai'
import initialState from '../../../src/client/initial-state'
const should = chai.should();



describe('AYLIEN_TOGGLE_VIEW', () => {

  it('should toggle only the view property of state.apis.aylien', () => {
    let action = {
      type: 'AYLIEN_TOGGLE_VIEW'
    };
    let aylien = initialState.apis.aylien;
    aylien.view = true;
    let returnedState = reducer(aylien, action);
    returnedState.view.should.equal(false);
  })

})


describe('AYLIEN_TOGGLE_SELECTION', () => {

  let aylienTypes = initialState.apis.aylien.types;

  for(let type in aylienTypes){
    it(`should toggle the passed property of aylien.${type} from true to false`, () => {
      let action = {
        type: 'AYLIEN_TOGGLE_SELECTION',
        analysisType: type
      };
      let aylien = initialState.apis.aylien;
      aylien.types[type] = true;
      let returnedState = reducer(aylien, action);
      returnedState.types[type].should.equal(false);
    })

    it(`should toggle the passed property of aylien.${type} from false to true`, () => {
      let action = {
        type: 'AYLIEN_TOGGLE_SELECTION',
        analysisType: type
      };
      let aylien = initialState.apis.aylien;
      aylien.types[type] = false;
      let returnedState = reducer(aylien, action);
      returnedState.types[type].should.equal(true);
    })
  }

})


describe('AYLIEN_SELECT_ALL', () => {

  it('should set each property of state.apis.aylien.types to true', () => {
    let action = {
      type: 'AYLIEN_SELECT_ALL'
    };
    let aylien = initialState.apis.aylien;
    let returnedState = reducer(aylien, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(true)
    }
  })

})


describe('AYLIEN_UNSELECT_ALL', () => {

  it('should set each property of state.apis.aylien.types to false', () => {
    let action = {
      type: 'AYLIEN_UNSELECT_ALL'
    };
    let aylien = initialState.apis.aylien;
    let returnedState = reducer(aylien, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(false)
    }
  })

})
