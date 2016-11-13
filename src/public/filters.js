angular.module('App')
.filter('cap', function($filter){
  return function(input){
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
})
.filter('perc', function($filter){
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
.filter('oneToTen', function($filter){
  return function(input){
    if(input === 1 || parseInt(input) === 1){
      return 1;
    }
    if (typeof input !== 'string'){
      input = input.toString();
    }
    input = input.match(/^-?\d+(?:\.\d{0,2})?/)[0];
    return input;
  }
})
.filter('rosetteSentiment', function($filter){
  return function(input){
    if(input === 'pos'){
      return 'positive';
    }
    if(input === 'neg'){
      return 'negative';
    }
    if(input === 'neu'){
      return 'neutral';
    }
  }
})
