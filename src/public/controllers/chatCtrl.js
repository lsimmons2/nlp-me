angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  $scope.convo = [
    /*{
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
    */
  ];


  $scope.text = 'apples and bananas are delicious';

  //$scope.chat = function(){
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
  //};

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
