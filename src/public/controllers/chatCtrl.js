angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  $scope.convo = [
    {
      who: 'indico',
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
      who: 'rosette',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'user',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'aylien',
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
      who: 'user',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'rosette',
      text: 'sup sup sup sup sup'
    },
    {
      who: 'aylien',
      text: 'sup sup sup sup sup'
    }
  ];

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
    view: false,
    enabled: false,
    types: {
      classify: false,
      sentiment: false,
      concepts: false,
      entities: false,
      summary: false,
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
          who: 'aylien',
          text: $scope.text,
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
        console.log(resp.data);
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
        console.log(resp.data);
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


})/*
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
