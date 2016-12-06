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
    if (typeof input === 'string'){
      input = parseFloat(input);
    }
    var multAns = input * 100;
    var fixedMultAns = multAns.toFixed(2);
    return fixedMultAns;
  }
})
.filter('oneToTen', function($filter){
  return function(input){
    if(input === 1 || parseInt(input) === 1){
      return 1;
    }
    if (typeof input === 'string'){
      input = parseFloat(input);
    }
    return input.toFixed(2);
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
