angular.module('App')
.filter('cap', function($filter){
  return function(input){
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
})
.filter('Perc', function($filter){
  return function(input){
    if(input === 1 || parseInt(input) === 1){
      return 100;
    }
    if (typeof input !== 'string'){
      input = input.toString();
    }
    input = input.match(/^-?\d+(?:\.\d{0,4})?/)[0];
    return (input * 100);
  }
})
