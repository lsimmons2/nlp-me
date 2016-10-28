
describe('ApiSearchController', function(){


  beforeEach(module('apiSearchCtrl'));

  beforeEach(module('testService'));

  var service;
  var $scope;
  var $controller;
  var $q;
  var $httpBackend;

  beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, _$httpBackend_, _TestService_){
    service = _TestService_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $scope = _$rootScope_.$new();
    $controller = _$controller_('ApiSearchController', {
      $scope: $scope
    });
  }));

  describe('submitAylien()', function(){


    it('Function defined', function(){
      $scope.submitAylien.should.exist;
    });

    it('handles array of one analysis', function(){

      $scope.results.should.not.have.property('aylien');

      $scope.text = 'the owls are not what they seem';
      $scope.aylien.sentiment = true;
      $scope.aylien.concepts = true;
      $scope.aylien.classification = true;

      $httpBackend.whenPOST('/nlp/aylien').respond(200, service.getAylienRes());

      $scope.submitAylien();
      $httpBackend.flush();

      $scope.results.aylien.should.exist;
      $scope.results.aylien.should.be.an('array');

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
