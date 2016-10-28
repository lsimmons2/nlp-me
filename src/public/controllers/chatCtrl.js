angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){
  $scope.convo = [];
  $scope.chat = function(){
    $scope.convo.push({
      who: 'user',
      text: $scope.text
    });
    $http.get('/chat/aylien')
      .then(function(resp){

      })
      .catch(function(err){
        $scope.convo.push({
          who: 'aylien',
          text: 'error'
        })
      });
  };
});
