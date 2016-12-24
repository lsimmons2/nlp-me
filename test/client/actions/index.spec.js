
import 'isomorphic-fetch'

import * as actions from '../../../src/client/actions'
import chai from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

import initialState from '../../../src/client/initial-state'
const should = chai.should();



describe('toggleDropdownView()', () => {

  it('should create actions of type <API>_TOGGLE_VIEW', () => {

    let aylienAction = actions.toggleDropdownView('aylien');
    let rosetteAction = actions.toggleDropdownView('rosette');
    let indicoAction = actions.toggleDropdownView('indico');
    let meaningcloudAction = actions.toggleDropdownView('meaningcloud');

    aylienAction.type.should.equal('AYLIEN_TOGGLE_VIEW');
    rosetteAction.type.should.equal('ROSETTE_TOGGLE_VIEW');
    indicoAction.type.should.equal('INDICO_TOGGLE_VIEW');
    meaningcloudAction.type.should.equal('MEANINGCLOUD_TOGGLE_VIEW');

  })

});



describe('toggleSelection()', () => {

  describe('aylien', () => {

    it('should return action of type AYLIEN_TOGGLE_SELECTION', () => {
      let aylienAction = actions.toggleSelection('aylien', 'classify');
      aylienAction.type.should.equal('AYLIEN_TOGGLE_SELECTION');
    })

    it('should return action with the right analysisType property', () => {
      let classifyAction = actions.toggleSelection('aylien', 'classify');
      classifyAction.analysisType.should.equal('classify');
      let sentimentAction = actions.toggleSelection('aylien', 'sentiment');
      sentimentAction.analysisType.should.equal('sentiment');
      let conceptsAction = actions.toggleSelection('aylien', 'concepts');
      conceptsAction.analysisType.should.equal('concepts');
      let hashtagsAction = actions.toggleSelection('aylien', 'hashtags');
      hashtagsAction.analysisType.should.equal('hashtags');
    })

  })

  describe('rosette', () => {

    it('should return action of type ROSETTE_TOGGLE_SELECTION', () => {
      let rosetteAction = actions.toggleSelection('rosette', 'classify');
      rosetteAction.type.should.equal('ROSETTE_TOGGLE_SELECTION');
    })

    it('should return action with the right analysisType property', () => {
      let categoriesAction = actions.toggleSelection('rosette', 'categories');
      categoriesAction.analysisType.should.equal('categories');
      let sentimentAction = actions.toggleSelection('rosette', 'sentiment');
      sentimentAction.analysisType.should.equal('sentiment');
      let entitiesAction = actions.toggleSelection('rosette', 'entities');
      entitiesAction.analysisType.should.equal('entities');
      let relationshipsAction = actions.toggleSelection('rosette', 'relationships');
      relationshipsAction.analysisType.should.equal('relationships');
    })

  })

  describe('indico', () => {

    it('should return action of type INDICO_TOGGLE_SELECTION', () => {
      let indicoAction = actions.toggleSelection('indico', 'texttags');
      indicoAction.type.should.equal('INDICO_TOGGLE_SELECTION');
    })

    it('should return action with the right analysisType property', () => {
      let texttagsAction = actions.toggleSelection('indico', 'texttags');
      texttagsAction.analysisType.should.equal('texttags');
      let sentimentAction = actions.toggleSelection('indico', 'sentiment');
      sentimentAction.analysisType.should.equal('sentiment');
      let personalityAction = actions.toggleSelection('indico', 'personality');
      personalityAction.analysisType.should.equal('personality');
      let peopleAction = actions.toggleSelection('indico', 'people');
      peopleAction.analysisType.should.equal('people');
      let politicalAction = actions.toggleSelection('indico', 'political');
      politicalAction.analysisType.should.equal('political');
      let emotionAction = actions.toggleSelection('indico', 'emotion');
      emotionAction.analysisType.should.equal('emotion');
    })

  })

  describe('meaningcloud', () => {

    it('should return action of type INDICO_TOGGLE_SELECTION', () => {
      let meaningcloudAction = actions.toggleSelection('meaningcloud', 'texttags');
      meaningcloudAction.type.should.equal('MEANINGCLOUD_TOGGLE_SELECTION');
    })

    it('should return action with the right analysisType property', () => {
      let classificationAction = actions.toggleSelection('indico', 'classification');
      classificationAction.analysisType.should.equal('classification');
      let sentimentAction = actions.toggleSelection('indico', 'sentiment');
      sentimentAction.analysisType.should.equal('sentiment');
      let topicsAction = actions.toggleSelection('indico', 'topics');
      topicsAction.analysisType.should.equal('topics');
    })

  })


})



describe('toggleTexttagsView()', () => {

  it('should return action of type TOGGLE_TEXTTAGS_VIEW and the right id property', () => {
    let id = Math.random().toFixed();
    let returnedAction = actions.toggleTexttagsView(id);
    returnedAction.type.should.equal('TOGGLE_TEXTTAGS_VIEW');
    returnedAction.id.should.equal(id);
  })

})



describe('chatRequest()', () => {

  it('should return actions of type CHAT_REQUEST', () => {
    let returnedAction = actions.chatRequest();
    returnedAction.type.should.equal('CHAT_REQUEST');
  })

})



describe('chatSuccess()', () => {

  it('should return actions of type CHAT_SUCCESS if successful analyses are passed to it', () => {
    let data = [
      {
        type: 'someAnalysis',
        data: {
          analysis: 'some successful analysis'
        }
      },
      {
        type: 'someOtherAnalysis',
        data: 'error'
      }
    ];
    let returnedAction = actions.chatSuccess('someApi', data);
    returnedAction.type.should.equal('CHAT_SUCCESS');
  })

  it('should return action with right api and analyses if type is CHAT_SUCCESS', () => {
    let data = [
      {
        type: 'someAnalysis',
        data: {
          analysis: 'some successful analysis'
        }
      },
      {
        type: 'someFailedAnalysis',
        data: 'error'
      }
    ];
    let returnedAction = actions.chatSuccess('someApi', data);
    returnedAction.api.should.equal('someApi');
    returnedAction.analyses.should.deep.equal({
      successes: [
        {
          type: 'someAnalysis',
          data: {
            analysis: 'some successful analysis'
          }
        }
      ],
      errors: ['someFailedAnalysis']
    })
  })

  it('should return actions of type CHAT_FAIL if no successful analyses are passed to it', () => {
    let data = [
      {
        type: 'someAnalysis',
        data: 'error'
      },
      {
        type: 'someOtherAnalysis',
        data: 'error'
      }
    ];
    let returnedAction = actions.chatSuccess('someApi', data);
    returnedAction.type.should.equal('CHAT_FAIL');
  })

  it('should return action with right api and errors if type is CHAT_FAIL', () => {
    let data = [
      {
        type: 'someFailedAnalysis',
        data: 'error'
      },
      {
        type: 'someOtherFailedAnalysis',
        data: 'error'
      }
    ];
    let returnedAction = actions.chatSuccess('someApi', data);
    returnedAction.api.should.equal('someApi');
    returnedAction.errors.should.deep.equal(
      [
        'someFailedAnalysis',
        'someOtherFailedAnalysis'
      ]
    )
  })

})



describe('chatError()', () => {

  it('should return actions of type CHAT_ERROR and the api passed to it', () => {
    let err = new Error('Some error.')
    let returnedAction = actions.chatError('whateverApi', err);
    returnedAction.type.should.equal('CHAT_ERROR');
    returnedAction.api.should.equal('whateverApi');
  })

});



describe('chat()', () => {

  it('should create actions of type CHAT_REQUEST if api analyses selected', () => {

    initialState.apis.aylien.types.classify = true;
    let store = mockStore(initialState);

    store.dispatch(actions.chat());

    let returnedActions = store.getActions();
    let expectedActions = [
      {
        type: 'CHAT_REQUEST'
      }
    ];

    returnedActions.should.deep.equal(expectedActions);

  })

})



describe('callApi()', () => {

  it('should create actions of type CHAT_SUCCESS if successful analyses returned', () => {

    afterEach( () => {
      nock.cleanAll();
    })

    nock('http://localhost:8080/chat')
      .post('/aylien')
      .reply(200,
        [
          {
            type: 'someAnalysis',
            data: {
              analysis: 'some successful analysis'
            }
          },
          {
            type: 'someOtherAnalysis',
            data: 'error'
          }
        ])

    initialState.apis.aylien.types.classify = true;
    let store = mockStore(initialState);

    actions.callApi(store.dispatch, 'aylien', 'sah?', ['classify'])
      .then( () => {
        let returnedActions = store.getActions();
        let expectedActions = [
          {
            type: 'CHAT_SUCCESS',
            api: 'aylien',
            analyses: {
              successes: [
                {
                  type: 'someAnalysis',
                  data: {
                    analysis: 'some successful analysis'
                  }
                }
              ],
              errors: ['someOtherAnalysis']
            }
          }
        ];
        returnedActions.should.deep.equal(expectedActions);
      })
      .catch( err => {
        console.log(err);
      })

  })

  it('should create actions of type CHAT_FAIL if no successful analyses returned', () => {

    afterEach( () => {
      nock.cleanAll();
    })

    nock('http://localhost:8080/chat')
      .post('/aylien')
      .reply(200,
        [
          {
            type: 'someAnalysis',
            data: 'error'
          },
          {
            type: 'someOtherAnalysis',
            data: 'error'
          }
        ])

    initialState.apis.aylien.types.classify = true;
    let store = mockStore(initialState);

    actions.callApi(store.dispatch, 'aylien', 'sah?', ['classify'])
      .then( () => {
        let returnedActions = store.getActions();
        let expectedActions = [
          {
            type: 'CHAT_FAIL',
            api: 'aylien',
            errors: ['someAnalysis', 'someOtherAnalysis']
          }
        ];
        returnedActions.should.deep.equal(expectedActions);
      })
      .catch( err => {
        console.log(err);
      })

  })

})
