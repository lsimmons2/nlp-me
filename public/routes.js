angular.module('routes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'public/views/home.html'
    })
    .when('/apis', {
      templateUrl: 'public/views/apiSearch.html',
      controller: 'ApiSearchController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
