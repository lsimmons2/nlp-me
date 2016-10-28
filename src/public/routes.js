angular.module('routes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/apis', {
      templateUrl: 'views/apiSearch.html',
      controller: 'ApiSearchController'
    })
    .when('/chat', {
      templateUrl: 'views/chat.html',
      controller: 'ChatController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
