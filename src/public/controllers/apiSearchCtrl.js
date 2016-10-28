angular.module('apiSearchCtrl', [])
.controller('ApiSearchController', function($scope, $http){

  $scope.text = 'the owls are not what they seem';
  $scope.aylien = {};
  $scope.bitext = {};
  $scope.rosette = {};
  $scope.results = {};


  $scope.submitAylien = function(){
      var data = {
        text: $scope.text,
        analysis: $scope.aylien
      }
      $http.post('/nlp/aylien', data)
        .then(function(resp){
          $scope.aylienError = false;
          for(var index in resp.data){
            resp.data[index] = JSON.parse(resp.data[index]);
          }
          $scope.results.aylien = resp.data;
          $scope.results.aylien.error = false;
        })
        .catch(function(resp){
          $scope.results.aylien = {};
          $scope.results.aylien.error = true;
        });
  };

  $scope.submitBitext = function(){
      var data = {
        text: $scope.text,
        analysis: $scope.bitext
      }
      $http.post('/nlp/bitext', data)
        .then(function(resp){
          for(var index in resp.data){
            resp.data[index] = JSON.parse(resp.data[key]);
          }
          $scope.results.bitext = resp.data;
          $scope.results.bitext.error = false;
        })
        .catch(function(resp){
          $scope.results.bitext = {};
          $scope.results.bitext.error = true;
        })
  };

  $scope.submitRosette = function(){
    var data = {
      text: $scope.text,
      analysis: $scope.rosette
    }
    $http.post('/nlp/rosette', data)
      .then(function(resp){
        for(var key in resp.data){
          resp.data[key] = JSON.parse(resp.data[key]);
        }
        $scope.results.rosette = resp.data;
        $scope.results.rosette.error = false;
      })
      .catch(function(resp){
        $scope.results.rosette = {};
        $scope.results.rosette.error = true;
      })
  };


  $scope.submit = function(){
    if($scope.aylienCheck && $scope.aylien.sentiment || $scope.aylienCheck && $scope.aylien.concepts || $scope.aylienCheck && $scope.aylien.classification){
      $scope.submitAylien();
    }
    if($scope.bitextCheck && $scope.bitext.sentiment || $scope.bitextCheck && $scope.bitext.concepts || $scope.bitextCheck && $scope.bitext.classification){
      $scope.submitBitext();
    }
    if($scope.rosetteCheck && $scope.rosette.sentiment || $scope.rosetteCheck && $scope.rosette.concepts || $scope.rosetteCheck && $scope.rosette.classification){
      $scope.submitRosette();
    }
  };

});
