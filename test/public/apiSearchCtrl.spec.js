describe('ApiSearchController', function(){

  var RES200 = [
    JSON.stringify({
      "polarity": "negative",
      "subjectivity": "subjective",
      "text": "the owls are not what they seem",
      "polarity_confidence": 0.727140486240387,
      "subjectivity_confidence": 1.0
    })
  ];

  beforeEach(module('apiSearchCtrl'));

  var $scope;
  var $controller;
  var $q;
  var $httpBackend;

  beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, _$httpBackend_){
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $scope = _$rootScope_.$new();
    $controller = _$controller_('ApiSearchController', {
      $scope: $scope
    });
  }));

  describe('submitAylien()', function(){

    var aylien;
    beforeEach(function(){
      aylien = {};
    });

    it('Function defined', function(){
      $scope.submitAylien.should.exist;
    });

    it('returns data object when given text', function(){

      $scope.results.should.not.have.property('aylien');

      $scope.text = 'the owls are not what they seem';
      $scope.aylien.sentiment = true;
      $scope.aylien.concepts = true;
      $scope.aylien.classification = true;

      $httpBackend.whenPOST('/nlp/aylien').respond(200, RES200);

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
