angular.module('apiSearchController', [])
.controller('ApiSearchController', function($scope, $http){

  $scope.text = 'the owls are not what they seem';
  $scope.aylien = {};
  $scope.bitext = {};
  $scope.rosette = {};
  $scope.results = {};


  function submitAylien(){
      var data = {
        text: $scope.text,
        analysis: $scope.aylien
      }
      $http.post('/aylien', data)
        .then(function(resp){
          $scope.aylienError = false;
          for(var key in resp.data){
            resp.data[key] = JSON.parse(resp.data[key]);
          }
          $scope.results.aylien = resp.data;
          $scope.results.aylien.error = false;
        })
        .catch(function(resp){
          $scope.results.aylien = {};
          $scope.results.aylien.error = true;
        });
  };

  function submitBitext(){
      var data = {
        text: $scope.text,
        analysis: $scope.bitext
      }
      $http.post('/bitext', data)
        .then(function(resp){
          for(var key in resp.data){
            resp.data[key] = JSON.parse(resp.data[key]);
          }
          $scope.results.bitext = resp.data;
          $scope.results.bitext.error = false;
        })
        .catch(function(resp){
          $scope.results.bitext = {};
          $scope.results.bitext.error = true;
        })
  };

  function submitRosette(){
    var data = {
      text: $scope.text,
      analysis: $scope.rosette
    }
    $http.post('/rosette', data)
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
      submitAylien();
    }
    if($scope.bitextCheck && $scope.bitext.sentiment || $scope.bitextCheck && $scope.bitext.concepts || $scope.bitextCheck && $scope.bitext.classification){
      submitBitext();
    }
    if($scope.rosetteCheck && $scope.rosette.sentiment || $scope.rosetteCheck && $scope.rosette.concepts || $scope.rosetteCheck && $scope.rosette.classification){
      submitRosette();
    }
  };

});
