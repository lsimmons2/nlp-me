
// this should be what 'whatwg-fetch' when I set
// up Karma to run tests in browser environment
import 'isomorphic-fetch'

import reducer from '../../../src/client/reducers/meaningcloud-reducer'
import chai from 'chai'
import initialState from '../../../src/client/initial-state'
const should = chai.should();



describe('MEANINGCLOUD_TOGGLE_VIEW', () => {

  it('should toggle only the view property of state.apis.meaningcloud', () => {
    let action = {
      type: 'MEANINGCLOUD_TOGGLE_VIEW'
    };
    let meaningcloud = initialState.apis.meaningcloud;
    meaningcloud.view = true;
    let returnedState = reducer(meaningcloud, action);
    returnedState.view.should.equal(false);
  })

})


describe('MEANINGCLOUD_TOGGLE_SELECTION', () => {

  let meaningcloudTypes = initialState.apis.meaningcloud.types;

  for(let type in meaningcloudTypes){
    it(`should toggle the passed property of meaningcloud.${type} from true to false`, () => {
      let action = {
        type: 'MEANINGCLOUD_TOGGLE_SELECTION',
        analysisType: type
      };
      let meaningcloud = initialState.apis.meaningcloud;
      meaningcloud.types[type] = true;
      let returnedState = reducer(meaningcloud, action);
      returnedState.types[type].should.equal(false);
    })

    it(`should toggle the passed property of meaningcloud.${type} from false to true`, () => {
      let action = {
        type: 'MEANINGCLOUD_TOGGLE_SELECTION',
        analysisType: type
      };
      let meaningcloud = initialState.apis.meaningcloud;
      meaningcloud.types[type] = false;
      let returnedState = reducer(meaningcloud, action);
      returnedState.types[type].should.equal(true);
    })
  }

})


describe('MEANINGCLOUD_SELECT_ALL', () => {

  it('should set each property of state.apis.meaningcloud.types to true', () => {
    let action = {
      type: 'MEANINGCLOUD_SELECT_ALL'
    };
    let meaningcloud = initialState.apis.meaningcloud;
    let returnedState = reducer(meaningcloud, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(true)
    }
  })

})


describe('MEANINGCLOUD_UNSELECT_ALL', () => {

  it('should set each property of state.apis.meaningcloud.types to false', () => {
    let action = {
      type: 'MEANINGCLOUD_UNSELECT_ALL'
    };
    let meaningcloud = initialState.apis.meaningcloud;
    let returnedState = reducer(meaningcloud, action);
    for(let type in returnedState.types){
      returnedState.types[type].should.equal(false)
    }
  })

})
