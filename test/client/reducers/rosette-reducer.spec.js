
// this should be what 'whatwg-fetch' when I set
// up Karma to run tests in browser environment
import 'isomorphic-fetch'

import reducer from '../../../src/client/reducers/rosette-reducer'
import chai from 'chai'
import initialState from '../../../src/client/initial-state'
const should = chai.should();



describe('ROSETTE_TOGGLE_VIEW', () => {

  it('should toggle only the view property of state.apis.rosette', () => {
    let action = {
      type: 'ROSETTE_TOGGLE_VIEW'
    };
    let rosette = initialState.apis.rosette;
    rosette.view = true;
    let returnedState = reducer(rosette, action);
    returnedState.view.should.equal(false);
  })

})


describe('ROSETTE_TOGGLE_SELECTION', () => {

  let rosetteTypes = initialState.apis.rosette.types;

  for(let type in rosetteTypes){
    it(`should toggle the passed property of rosette.${type} from true to false`, () => {
      let action = {
        type: 'ROSETTE_TOGGLE_SELECTION',
        analysisType: type
      };
      let rosette = initialState.apis.rosette;
      rosette.types[type] = true;
      let returnedState = reducer(rosette, action);
      returnedState.types[type].should.equal(false);
    })

    it(`should toggle the passed property of rosette.${type} from false to true`, () => {
      let action = {
        type: 'ROSETTE_TOGGLE_SELECTION',
        analysisType: type
      };
      let rosette = initialState.apis.rosette;
      rosette.types[type] = false;
      let returnedState = reducer(rosette, action);
      returnedState.types[type].should.equal(true);
    })
  }

})


describe('ROSETTE_SELECT_ALL', () => {

  it('should set each property of state.apis.rosette.types to true', () => {
    let action = {
      type: 'ROSETTE_SELECT_ALL'
    };
    let rosette = initialState.apis.rosette;
    let returnedState = reducer(rosette, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(true)
    }
  })

})


describe('ROSETTE_UNSELECT_ALL', () => {

  it('should set each property of state.apis.rosette.types to false', () => {
    let action = {
      type: 'ROSETTE_UNSELECT_ALL'
    };
    let rosette = initialState.apis.rosette;
    let returnedState = reducer(rosette, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(false)
    }
  })

})
