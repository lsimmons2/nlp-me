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


  $scope.text = '';

  function ready(){
    for (var type in this.types) {
      if (this.types[type]){
        return true;
      }
    }
    return false;
  };

  $scope.aylien = {
    view: false,
    types: {
      classify: false,
      sentiment: false,
      concepts: false,
      hashtags: false
    },
    ready: ready
  };

  $scope.rosette = {
    view: false,
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
    types: {
      texttags: false,
      sentiment: false,
      personality: false,
      people: false,
      political: false,
      emotion: false
    },
    ready: ready
  };

  $scope.meaningcloud = {
    view: false,
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
          errors: errors,
          view: 'pretty',
          json: analyses
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
        var analyses = {};
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            type = resp.data[i].type;
            analyses[type] = resp.data[i].data;
          }
        }
        $scope.convo.push({
          who: 'rosette',
          view: 'pretty',
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
        var analyses = {};
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            type = resp.data[i].type;
            analyses[type] = resp.data[i].data;
          }
        }
        $scope.convo.push({
          who: 'indico',
          view: 'pretty',
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
        var analyses = {};
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            type = resp.data[i].type;
            analyses[type] = JSON.parse(resp.data[i].data);
          }
        }
        $scope.convo.push({
          who: 'meaningcloud',
          view: 'pretty',
          text: $scope.text,
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'meaningcloud',
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

  $scope.showTexttags = function(event){
    angular.element(event.target).nextAll(2).css('display', 'block');
    angular.element(event.target).css('display', 'none');
    angular.element(event.target).next().css('display', 'inline');
  };

  $scope.hideTexttags = function(event){
    angular.element(event.target).prev().css('display', 'inline');
    angular.element(event.target).css('display', 'none');
    angular.element(event.target).next().css('display', 'none');
  };

$scope.convo = [];

});
