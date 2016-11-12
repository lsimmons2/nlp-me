angular.module('aboutCtrl', [])
.controller('AboutController', function($scope, $http){

  $scope.name = '';
  $scope.email = '';
  $scope.message = '';
  $scope.feedbackSuccess = false;
  $scope.feedbackError = false;

  $scope.feedback = function(){
    var data = {
      name: $scope.name,
      email: $scope.email,
      message: $scope.message
    };
    $http.post('/feedback', data)
      .then(function(resp){
        $scope.name = '';
        $scope.email = '';
        $scope.message = '';
        $scope.feedbackError = false;
        $scope.feedbackSuccess = true;
      })
      .catch(function(err){
        $scope.feedbackSuccess = false;
        $scope.feedbackError = true;
      });
  }

});
