angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  $scope.convo = [];
  $scope.text = 'yo!! apples and bananas are delicious';

  $scope.aylien = {
    view: false,
    enabled: true,
    types: {
      classify: true,
      sentiment: true,
      concepts: false,
      entities: false,
      summary: false,
      hashtags: false
    }
  };

  $scope.rosette = {
    view: false,
    enabled: true,
    types: {
      categories: false,
      sentiment: true,
      entities: false,
      relationships: false
    }
  };

  $scope.meaningcloud = {
    view: false,
    enabled: false,
    types: {
      categories: false,
      sentiment: false,
      entities: false,
      relationships: false
    }
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


  //$scope.chatWithRosette = function(){
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
  //};


  function checkAylien(){
    let types = $scope.aylien.types;
    if(types.classify){
      return true;
    }
    if(types.sentiment){
      return true;
    }
    if(types.concepts){
      return true;
    }
    if(types.entities){
      return true;
    }
    if(types.summary){
      return true;
    }
    if(types.hashtags){
      return true;
    }
    return false;
  }

  function checkRosette(){
    let types = $scope.rosette.types;
    if(types.categories){
      return true;
    }
    if(types.sentiment){
      return true;
    }
    if(types.relationships){
      return true;
    }
    if(types.entities){
      return true;
    }
    return false;
  }


  $scope.chat = function(){
    var userInput = false;
    if($scope.text.length){

      if($scope.aylien.enabled && checkAylien()){
        $scope.chatWithAylien();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

      if($scope.rosette.enabled && checkRosette()){
        $scope.chatWithRosette();
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
})
