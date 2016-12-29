
// this should be what 'whatwg-fetch' when I set
// up Karma to run tests in browser environment
import 'isomorphic-fetch'

import reducer from '../../../src/client/reducers/indico-reducer'
import chai from 'chai'
import initialState from '../../../src/client/initial-state'
const should = chai.should();



describe('INDICO_TOGGLE_VIEW', () => {

  it('should toggle only the view property of state.apis.indico', () => {
    let action = {
      type: 'INDICO_TOGGLE_VIEW'
    };
    let indico = initialState.apis.indico;
    indico.view = true;
    let returnedState = reducer(indico, action);
    returnedState.view.should.equal(false);
  })

})


describe('INDICO_TOGGLE_SELECTION', () => {

  let indicoTypes = initialState.apis.indico.types;

  for(let type in indicoTypes){
    it(`should toggle the passed property of indico.${type} from true to false`, () => {
      let action = {
        type: 'INDICO_TOGGLE_SELECTION',
        analysisType: type
      };
      let indico = initialState.apis.indico;
      indico.types[type] = true;
      let returnedState = reducer(indico, action);
      returnedState.types[type].should.equal(false);
    })

    it(`should toggle the passed property of indico.${type} from false to true`, () => {
      let action = {
        type: 'INDICO_TOGGLE_SELECTION',
        analysisType: type
      };
      let indico = initialState.apis.indico;
      indico.types[type] = false;
      let returnedState = reducer(indico, action);
      returnedState.types[type].should.equal(true);
    })
  }

})


describe('INDICO_SELECT_ALL', () => {

  it('should set each property of state.apis.indico.types to true', () => {
    let action = {
      type: 'INDICO_SELECT_ALL'
    };
    let indico = initialState.apis.indico;
    let returnedState = reducer(indico, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(true)
    }
  })

})


describe('INDICO_UNSELECT_ALL', () => {

  it('should set each property of state.apis.indico.types to false', () => {
    let action = {
      type: 'INDICO_UNSELECT_ALL'
    };
    let indico = initialState.apis.indico;
    let returnedState = reducer(indico, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(false)
    }
  })

})
