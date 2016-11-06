angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  $scope.convo = [
    {
      who: 'rosette',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'user',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'meaningcloud',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'indico',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'aylien',
      analyses: {
        classify: {
          text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!',
          language: 'en',
          categories:
           [
             {
               label: 'health treatment - diet',
               code: '07003003',
               confidence: 0.999999920957461
             },
             {
               label: 'sports',
               code: '07003003',
               confidence: 0.5845345645
             },
             {
               label: 'politics',
               code: '07003003',
               confidence: 0.449504443
             }
          ]
        },
        sentiment: {
         polarity:'positive',
         subjectivity:'subjective',
         text:'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!',
         polarity_confidence:0.999940037727356,
         subjectivity_confidence:1
       },
       concepts: {
        text:'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!',
        language:'en',
        concepts:{
          'http://dbpedia.org/resource/Calvin_and_Hobbes':{
            surfaceForms:[
              {
                string:'Calvin and Hobbes',
                score:1,
                offset:57
              }
            ],
            types:[
              'http://dbpedia.org/ontology/Agent',
              'http://www.wikidata.org/entity/Q215627',
              'http://schema.org/Person',
              'http://xmlns.com/foaf/0.1/Person',
              'http://www.wikidata.org/entity/Q5',
              'http://dbpedia.org/ontology/Person',
              'http://www.wikidata.org/entity/Q95074',
              'http://dbpedia.org/ontology/FictionalCharacter'
            ],
            support:320
          },
          'http://dbpedia.org/resource/Calvin_and_Shobbes':{
            surfaceForms:[
              {
                string:'Calvin and Shobbes',
                score:1,
                offset:57
              }
            ],
            types:[
              'http://dbpedia.org/ontology/Agent',
              'http://www.wikidata.org/entity/Q215627',
              'http://schema.org/Person',
              'http://xmlns.com/foaf/0.1/Person',
              'http://www.wikidata.org/entity/Q5',
              'http://dbpedia.org/ontology/Person',
              'http://www.wikidata.org/entity/Q95074',
              'http://dbpedia.org/ontology/FictionalCharacter'
            ],
            support:320
          }
        },
        },
        hashtags: {
          text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!',
          language: 'en',
          hashtags: [ '#CalvinAndHobbes', '#Apples' ]
          //hashtags: ['#calvinandhobbes']
        }
      },
      errors: [
        //'error1',
        'error2'
      ]
    }
  ];


  //make this a watched flag instead
  $scope.only = function(input){
    if(Object.keys(input).length === 1){
      return true;
    }
    return false;
  }



  $scope.text = 'yo!! apples and bananas are delicious';

  function ready(){
    if(!this.enabled){
      return false;
    }
    for (var type in this.types) {
      if (!this.types[type]){
        return false;
      }
    }
    return true;
  };

  $scope.aylien = {
    view: true,
    enabled: false,
    types: {
      classify: false,
      sentiment: false,
      concepts: false,
      entities: false,
      hashtags: false
    },
    ready: ready
  };

  $scope.rosette = {
    view: false,
    enabled: false,
    types: {
      categories: false,
      sentiment: false,
      entities: false,
      relationships: false
    },
    ready: ready
  };

  $scope.indico = {
    view: false,
    enabled: false,
    types: {
      texttags: false,
      sentiment: false,
      personality: false,
      people: false,
      political: false,
      personas: false,
      emotion: false
    },
    ready: ready
  };

  $scope.meaningcloud = {
    view: false,
    enabled: false,
    types: {
      classification: false,
      sentiment: false,
      topics: false
    },
    ready: ready
  };



  $scope.chatWithAylien = function(){
    var types = [];
    for(var type in $scope.aylien.types){
      if($scope.aylien.types[type]){
        types.push(type);
      }
    };

    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/aylien', data)
      .then(function(resp){
        var analyses = {};
        var errors = [];
        var type;
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            type = resp.data[i].type;
            analyses[type] = resp.data[i].data;
          }
        }
        $scope.convo.push({
          who: 'aylien',
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'aylien',
          text: 'error'
        })
      });
  };


  $scope.chatWithRosette = function(){
    var types = [];
    for(var type in $scope.rosette.types){
      if($scope.rosette.types[type]){
        types.push(type);
      }
    };

    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/rosette', data)
      .then(function(resp){
        var analyses = [];
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            analyses.push(resp.data[i]);
          }
        }
        $scope.convo.push({
          who: 'rosette',
          text: $scope.text,
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'rosette',
          text: 'error'
        })
      });
  };


  $scope.chatWithIndico = function(){
    var types = [];
    for(var type in $scope.indico.types){
      if($scope.indico.types[type]){
        types.push(type);
      }
    };

    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/indico', data)
      .then(function(resp){
        var analyses = [];
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            analyses.push(resp.data[i]);
          }
        }
        $scope.convo.push({
          who: 'indico',
          text: $scope.text,
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'indico',
          text: 'error'
        })
      });
  };


  $scope.chatWithMeaningcloud = function(){
    var types = [];
    for(var type in $scope.meaningcloud.types){
      if($scope.meaningcloud.types[type]){
        types.push(type);
      }
    };
    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/meaningcloud', data)
      .then(function(resp){
        var analyses = [];
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            analyses.push(resp.data[i]);
          }
        }
        $scope.convo.push({
          who: 'indico',
          text: $scope.text,
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'indico',
          text: 'error'
        })
      });
  };



  $scope.chat = function(){
    var userInput = false;
    if($scope.text.length){

      if($scope.aylien.ready()){
        $scope.chatWithAylien();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

      if($scope.rosette.ready()){
        $scope.chatWithRosette();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

      if($scope.indico.ready()){
        $scope.chatWithIndico();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

      if($scope.meaningcloud.ready()){
        $scope.chatWithMeaningcloud();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

    }
  };


})
.filter('Perc', function($filter){
  return function(input){
    if(input === 1 || parseInt(input) === 1){
      return 100;
    }
    if (typeof input !== 'string'){
      input = input.toString();
    }
    input = input.match(/^-?\d+(?:\.\d{0,4})?/)[0];
    return (input * 100);
  }
})

/*
.directive('scrollBottom', function () {
  return {
    scope: {
      scrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  }
})*/
