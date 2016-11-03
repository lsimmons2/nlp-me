
describe('ChatController', function(){


  beforeEach(module('chatCtrl'));

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
    $controller = _$controller_('ChatController', {
      $scope: $scope
    });
  }));

  describe('initial state', function(){

    it('$scope.aylien', function(){
      var aylien = $scope.aylien;
      aylien.should.exist;
      aylien.should.be.an('object');
      aylien.view.should.equal(false);
      aylien.enabled.should.equal(false);
      aylien.types.classify.should.equal(false);
      aylien.types.sentiment.should.equal(false);
      aylien.types.concepts.should.equal(false);
      aylien.types.entities.should.equal(false);
      aylien.types.summary.should.equal(false);
      aylien.types.hashtags.should.equal(false);
    });

    it('$scope.rosette', function(){
      var rosette = $scope.rosette;
      rosette.should.exist;
      rosette.should.be.an('object');
      rosette.view.should.equal(false);
      rosette.enabled.should.equal(false);
      rosette.types.categories.should.equal(false);
      rosette.types.sentiment.should.equal(false);
      rosette.types.entities.should.equal(false);
      rosette.types.relationships.should.equal(false);
    });

    it('$scope.convo', function(){
      $scope.convo.should.exist;
      $scope.convo.should.be.an('array');
      $scope.convo.length.should.equal(0);
    })

  });

  describe('chatWithAylien()', function(){


    it('Function defined', function(){
      $scope.chatWithAylien.should.exist;
    });

    it('sets analyses and errors', function(){

      $scope.text = 'sah aylien?';

      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylienChatRes());
      $scope.chatWithAylien();
      $httpBackend.flush();

      $scope.convo.length.should.equal(1);
      var message = $scope.convo[0];
      message.who.should.equal('aylien');
      message.text.should.equal('sah aylien?');
      message.errors.should.deep.equal(['summary']);
      message.analyses[0].should.have.property('type', 'entities');
      message.analyses[0].should.have.property('data', '{\n  "text": "yo!! apples and bananas are delicious",\n  "language": "en",\n  "entities": {\n    "keyword": ["apples and bananas are delicious", "bananas", "delicious", "apples"]\n  }\n}');
      $scope.text.should.equal('');
    });

  });


  describe('chatWithRosette()', function(){


    it('Function defined', function(){
      $scope.chatWithRosette.should.exist;
    });

    it('sets analyses and errors', function(){

      $scope.text = 'sah rosette?';

      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosetteChatRes());
      $scope.chatWithRosette();
      $httpBackend.flush();

      $scope.convo.length.should.equal(1);
      var message = $scope.convo[0];
      message.who.should.equal('rosette');
      message.text.should.equal('sah rosette?');
      message.errors.should.deep.equal(['sentiment']);
      message.analyses[0].should.have.property('type', 'categories');
      message.analyses[0].data.should.have.property('categories');
      $scope.text.should.equal('');
    });

  });


  describe('chat()', function(){
    it('Function defined', function(){
      $scope.chat.should.exist;
    });
  });

});
