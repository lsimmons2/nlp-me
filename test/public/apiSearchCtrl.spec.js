describe('BoardController', function(){

  beforeEach(module('apiSearchCtrl'));

  var $scope;
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $controller = $controller('ApiSearchController', {
      $scope: $scope
    });
  }));

  describe('submitAylien()', function(){
    it('Function defined', function(){
      $scope.submitAylien.should.exist;
    });
  });

  describe('submitBitext()', function(){
    it('Function defined', function(){
      $scope.submitBitext.should.exist;
    });
  });

  describe('submitRosette()', function(){
    it('Function defined', function(){
      $scope.submitRosette.should.exist;
    });
  });

  describe('submit()', function(){
    it('Function defined', function(){
      $scope.submit.should.exist;
    });
  });

});
