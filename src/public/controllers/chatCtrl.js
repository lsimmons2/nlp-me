angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  $scope.convo = [];
  $scope.showAylien = true;
  $scope.showRosette = false;
  $scope.text = 'apples and bananas are delicious';

  $scope.chat = function(){
    if($scope.text.length){
      $scope.convo.push({
        who: 'user',
        text: $scope.text
      });
      var data = {
        text: $scope.text
      }
      $http.post('/chat/aylien', data)
        .then(function(resp){
          console.log(resp.data);
          //var analysis = JSON.parse(resp.data);
          console.log(typeof resp.data[0]);
          $scope.convo.push({
            who: 'aylien',
            text: $scope.text,
            analysis: resp.data
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
