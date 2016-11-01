angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  $scope.convo = [
    {
      who: 'aylien',
      text: 'sup?'
    },
    {
      who:'user',
      text: 'sup?'
    },
    {
      who: 'aylien',
      text: 'tryna rage?'
    },
    {
      who:'user',
      text: 'def?'
    },
    {
      who:'user',
      text: 'you tryna rage?'
    },
    {
      who: 'aylien',
      text: 'def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def'
    },
    {
      who:'user',
      text: 'tight'
    },
    {
      who:'user',
      text: 'def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def def'
    },
    {
      who: 'aylien',
      text: 'word'
    },
    {
      who:'user',
      text: 'sweet'
    },
    {
      who: 'aylien',
      text: 'let\'s rage then'
    },
    {
      who:'user',
      text: 'def'
    }
  ];

  $scope.text = '';

  $scope.chat = function(){
    if($scope.text.length){
    console.log($scope.text.length);
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
  };

})
.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  }
})
