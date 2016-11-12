angular.module('routes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutController'
    })
    .when('/chat', {
      templateUrl: 'views/chat.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo: '/about'
    });
}]);
