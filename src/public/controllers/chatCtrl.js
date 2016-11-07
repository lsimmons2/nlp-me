angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  angular.element('#convo-container').bind('mousewheel', function (e) {
    angular.element(this).scrollTop(angular.element(this).scrollTop() - e.originalEvent.wheelDeltaY);

    return false;

  });



  $scope.keys = Object.keys;
  //make this a watched flag instead
  $scope.only = function(input){
    if(Object.keys(input).length === 1){
      return true;
    }
    return false;
  };


  $scope.text = 'yo!! apples and bananas are delicious';

  function ready(){
    if(!this.enabled){
      return false;
    }
    for (var type in this.types) {
      if (this.types[type]){
        return true;
      }
    }
    return false;
  };

  $scope.aylien = {
    view: false,
    enabled: true,
    types: {
      classify: true,
      sentiment: true,
      concepts: true,
      hashtags: true
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
            analyses[type] = JSON.parse(resp.data[i].data);
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


});
