
// this should be what 'whatwg-fetch' when I set
// up Karma to run tests in browser environment
import 'isomorphic-fetch'

import reducer from '../../../src/client/reducers/convo-reducer'
import chai from 'chai'
import initialState from '../../../src/client/initial-state'
const should = chai.should();


describe('UPDATE_INPUT', () => {

  it('should update the input with input of action', () => {
    let action = {
      type: 'UPDATE_INPUT',
      input: 'sah?'
    };
    let convo = initialState.convo;
    convo.input = 'sup?'
    let returnedState = reducer(convo, action);
    returnedState.input.should.equal('sah?');
  })

})


describe('CLEAR_INPUT', () => {

  it('should clear the input', () => {
    let action = {
      type: 'CLEAR_INPUT',
      input: 'sahhh I\'m a user'
    };
    let convo = initialState.convo;
    convo.input = 'sahh I should kinda be the input above in the action'
    let returnedState = reducer(convo, action);
    returnedState.input.should.equal('');
  })

  it('should create a user message with action.input', () => {
    let action = {
      type: 'CLEAR_INPUT',
      input: 'sahhh I\'m a user'
    };
    let convo = initialState.convo;
    convo.input = 'sahh I should kinda be the input above in the action';
    convo.messages = [];
    let returnedState = reducer(convo, action);
    returnedState.messages.should.deep.equal([
      {
        user: true,
        text: 'sahhh I\'m a user'
      }
    ]);
  })

})


describe('CHAT_REQUEST', () => {

  it('should set convo.isFetching to true', () => {
    let action = {
      type: 'CHAT_REQUEST'
    };
    let convo = initialState.convo;
    let returnedState = reducer(convo, action);
    returnedState.isFetching.should.equal(true);
  })

})


describe('CHAT_SUCCESS', () => {

  for (let api in initialState.apis){

    describe(api, () => {

      it(`should add a message to convo of api from action.${api}`, () => {
        let action = {
          type: 'CHAT_SUCCESS',
          api: api,
          analyses: {
            successes: [
              {
                type: 'aSuccessfulAnalysisType',
                data: 'successfulAnalysisData'
              }
            ],
            errors: [
              'aFailedAnalysisType',
              'anotherFailedAnalysisType'
            ]
          }
        };
        let convo = initialState.convo
        let returnedState = reducer(convo, action);
        returnedState.messages.length.should.equal(1);
        returnedState.messages[0].api.should.equal(api);
      })

      it('should add a message to convo with analyses from action.analyses', () => {
        let analyses = {
          successes: [
            {
              type: 'aSuccessfulAnalysisType',
              data: 'successfulAnalysisData'
            }
          ],
          errors: [
            'aFailedAnalysisType',
            'anotherFailedAnalysisType'
          ]
        };
        let action = {
          type: 'CHAT_SUCCESS',
          api: api,
          analyses: analyses
        };
        let convo = initialState.convo
        let returnedState = reducer(convo, action);
        returnedState.messages.length.should.equal(1);
        returnedState.messages[0].analyses.should.equal(analyses);
      })

    })

  }

})


describe('CHAT_FAIL', () => {

  for (let api in initialState.apis){

    describe(api, () => {

      it(`should add a message to convo of api from action.${api}`, () => {
        let action = {
          type: 'CHAT_FAIL',
          api: api,
          errors: ['someError', 'someOtherError']
        };
        let convo = initialState.convo
        let returnedState = reducer(convo, action);
        returnedState.messages.length.should.equal(1);
        returnedState.messages[0].api.should.equal(api);
      })

      it('should add a message to convo with errors from action.errors', () => {
        let errors = ['someError', 'someOtherError'];
        let action = {
          type: 'CHAT_FAIL',
          api: api,
          errors
        };
        let convo = initialState.convo
        let returnedState = reducer(convo, action);
        returnedState.messages.length.should.equal(1);
        returnedState.messages[0].errors.should.equal(errors);
      })

    })

  }

})


describe('TOGGLE_MESSAGE_VIEW', () => {

  it('should change viewJson property of message with id of action.id from false to true', () => {
    let convo = initialState.convo;
    let analyses = {
      successes: [
        {
          type: 'aSuccessfulAnalysisType',
          data: 'successfulAnalysisData'
        }
      ],
      errors: [
        'aFailedAnalysisType',
        'anotherFailedAnalysisType'
      ]
    };
    convo.messages = [
      {
        api: 'someApi',
        analyses: analyses,
        viewJson: false,
        id: 0
      },
      {
        api: 'someOtherApi',
        analyses: analyses,
        viewJson: false,
        id: 1
      },
      {
        api: 'someOtherOtherApi',
        analyses: analyses,
        viewJson: false,
        id: 2
      }
    ];
    let action = {
      type: 'TOGGLE_MESSAGE_VIEW',
      id: 1
    };
    let returnedState = reducer(convo, action);
    returnedState.messages.forEach(message => {
      if (message.id === 1){
        message.viewJson.should.equal(true);
      } else {
        message.viewJson.should.equal(false);
      }
    })
  })

  it('should change viewJson property of message with id of action.id from true to false', () => {
    let convo = initialState.convo;
    let analyses = {
      successes: [
        {
          type: 'aSuccessfulAnalysisType',
          data: 'successfulAnalysisData'
        }
      ],
      errors: [
        'aFailedAnalysisType',
        'anotherFailedAnalysisType'
      ]
    };
    convo.messages = [
      {
        api: 'someApi',
        analyses: analyses,
        viewJson: true,
        id: 0
      },
      {
        api: 'someOtherApi',
        analyses: analyses,
        viewJson: true,
        id: 1
      },
      {
        api: 'someOtherOtherApi',
        analyses: analyses,
        viewJson: true,
        id: 2
      }
    ];
    let action = {
      type: 'TOGGLE_MESSAGE_VIEW',
      id: 1
    };
    let returnedState = reducer(convo, action);
    returnedState.messages.forEach(message => {
      if (message.id === 1){
        message.viewJson.should.equal(false);
      } else {
        message.viewJson.should.equal(true);
      }
    })
  })



})


describe('TOGGLE_TEXTTAGS_VIEW', () => {

  it('should change viewTexttags property message of with id of action.id from false to true', () => {
    let convo = initialState.convo;
    let analyses = {
      successes: [
        {
          type: 'aSuccessfulAnalysisType',
          data: 'successfulAnalysisData'
        }
      ],
      errors: [
        'aFailedAnalysisType',
        'anotherFailedAnalysisType'
      ]
    };
    convo.messages = [
      {
        api: 'someApi',
        analyses: analyses,
        viewJson: false,
        id: 0
      },
      {
        api: 'indico',
        analyses: analyses,
        viewJson: false,
        viewTexttags: false,
        id: 1
      },
      {
        api: 'someOtherOtherApi',
        analyses: analyses,
        viewJson: false,
        id: 2
      }
    ];
    let action = {
      type: 'TOGGLE_TEXTTAGS_VIEW',
      id: 1
    };
    let returnedState = reducer(convo, action);
    returnedState.messages.forEach(message => {
      if (message.id === 1){
        message.viewTexttags.should.equal(true);
      }
    })
  })

  it('should change viewTexttags property of message with id of action.id from true to false', () => {
    let convo = initialState.convo;
    let analyses = {
      successes: [
        {
          type: 'aSuccessfulAnalysisType',
          data: 'successfulAnalysisData'
        }
      ],
      errors: [
        'aFailedAnalysisType',
        'anotherFailedAnalysisType'
      ]
    };
    convo.messages = [
      {
        api: 'someApi',
        analyses: analyses,
        viewJson: true,
        id: 0
      },
      {
        api: 'indico',
        analyses: analyses,
        viewJson: false,
        viewTexttags: true,
        id: 1
      },
      {
        api: 'someOtherOtherApi',
        analyses: analyses,
        viewJson: true,
        id: 2
      }
    ];
    let action = {
      type: 'TOGGLE_TEXTTAGS_VIEW',
      id: 1
    };
    let returnedState = reducer(convo, action);
    returnedState.messages.forEach(message => {
      if (message.id === 1){
        message.viewTexttags.should.equal(false);
      }
    })
  })



})
