
angular.module('testService', []).factory('TestService', function() {

  function getAylienRes(){

    return [
      JSON.stringify({
        "polarity": "negative",
        "subjectivity": "subjective",
        "text": "the owls are not what they seem",
        "polarity_confidence": 0.727140486240387,
        "subjectivity_confidence": 1.0
      })
    ];

  };

  function aylienChatRes(){
    return [
      {
        type: 'entities',
        data: '{\n  "text": "yo!! apples and bananas are delicious",\n  "language": "en",\n  "entities": {\n    "keyword": ["apples and bananas are delicious", "bananas", "delicious", "apples"]\n  }\n}'
      },
      {
        type: 'summary',
        data: 'error'
      }
    ]
  };

  function rosetteChatRes(){
    return [
      {
        type: 'categories',
        data: {
          categories: [
            {
              confidence: 0.05183973045327137,
              label: 'FOOD_AND_DRINK'
            }
          ]
        }
      },
      {
        type: 'sentiment',
        data: 'error'
      }
      ]
  };




  return ({
    getAylienRes: getAylienRes,
    aylienChatRes: aylienChatRes,
    rosetteChatRes: rosetteChatRes
  });

});
