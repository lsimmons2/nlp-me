
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

  return ({
    getAylienRes: getAylienRes
  });

});
