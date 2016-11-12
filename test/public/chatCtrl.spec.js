
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
      aylien.types.classify.should.equal(false);
      aylien.types.sentiment.should.equal(false);
      aylien.types.concepts.should.equal(false);
      aylien.types.hashtags.should.equal(false);
    });

    it('$scope.rosette', function(){
      var rosette = $scope.rosette;
      rosette.should.exist;
      rosette.should.be.an('object');
      rosette.view.should.equal(false);
      rosette.types.categories.should.equal(false);
      rosette.types.sentiment.should.equal(false);
      rosette.types.entities.should.equal(false);
      rosette.types.relationships.should.equal(false);
    });

    it('$scope.convo', function(){
      $scope.convo.should.exist;
      $scope.convo.should.be.an('array');
      $scope.convo.length.should.equal(0);
    });

  });



  describe('chatWithAylien()', function(){


    it('Function defined', function(){
      $scope.chatWithAylien.should.exist;
    });

    it('classify', function(){

      $scope.text = 'sah';
      $scope.aylien.types.classify = true;

      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylien.classify());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('aylien');
      message.analyses.classify.categories.should.be.an('array');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['sentiment', 'concepts', 'hashtags'])
      }
      $scope.text.should.equal('');
    });

    it('sentiment', function(){

      $scope.text = 'sah';
      $scope.aylien.types.sentiment = true;

      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylien.sentiment());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('aylien');
      message.analyses.sentiment.subjectivity.should.be.a('string');
      message.analyses.sentiment.subjectivity_confidence.should.be.a('number');
      message.analyses.sentiment.polarity.should.be.a('string');
      message.analyses.sentiment.polarity_confidence.should.be.a('number');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['classify', 'concepts', 'hashtags'])
      }
      $scope.text.should.equal('');
    });

    it('concepts', function(){

      $scope.text = 'sah';
      $scope.aylien.types.concepts = true;

      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylien.concepts());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('aylien');
      message.analyses.concepts.concepts.should.be.an('object');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['classify', 'sentiment', 'hashtags'])
      };
      $scope.text.should.equal('');
    });

    it('hashtags', function(){

      $scope.text = 'sah';
      $scope.aylien.types.hashtags = true;

      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylien.hashtags());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      $scope.convo[0].who.should.equal('user');
      var message = $scope.convo[1];
      message.who.should.equal('aylien');
      message.analyses.hashtags.hashtags.should.be.an('array');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['classify', 'sentiment', 'concepts'])
      };
      $scope.text.should.equal('');
    });

    it('handles 500 when it\'s the only API called', function(){
      $scope.text = 'sah';
      $scope.aylien.types.hashtags = true;
      $httpBackend.whenPOST('/chat/aylien').respond(500);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      var message = $scope.convo[1];
      message.who.should.equal('aylien');
      message.error.should.equal(true);

    });

    it('handles 500 when called with other APIs', function(){

      $scope.text = 'sah';
      $scope.aylien.types.hashtags = true;
      $scope.rosette.types.categories = true;
      $scope.indico.types.emotion = true;
      $scope.meaningcloud.types.classification = true;
      $httpBackend.whenPOST('/chat/aylien').respond(500);
      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosette.categories);
      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.emotion);
      $httpBackend.whenPOST('/chat/meaningcloud').respond(200, service.meaningcloud.classification);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(5);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      var apiMessages = $scope.convo.slice(1,6);
      for (var i = 0; i < apiMessages.length; i++) {
        apiMessages[i].who.should.be.oneOf(['aylien', 'indico', 'rosette', 'meaningcloud']);
        if(apiMessages[i].who !== 'aylien'){
          apiMessages[i].analyses.should.be.an('object');
        } else {
          apiMessages[i].error.should.equal(true);
        }
      }
    });

    it('does\'t fire when $scope.text is empty', function(){

      $scope.text = '';
      $scope.aylien.classify = true;
      $scope.aylien.sentiment = true;
      $scope.aylien.concepts = true;
      $scope.aylien.hashtags = true;

      $scope.chat();

      $scope.convo.length.should.equal(0);
      $scope.text.should.equal('');

    });

  });



  describe('chatWithRosette()', function(){


    it('Function defined', function(){
      $scope.chatWithRosette.should.exist;
    });


    it('categories', function(){

      $scope.text = 'sah';
      $scope.rosette.types.categories = true;

      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosette.categories());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('rosette');
      message.analyses.should.have.property('categories');
      message.analyses.categories.categories.should.be.an('array');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['entities', 'relationships', 'sentiment'])
      }
      $scope.text.should.equal('');
    });


    it('sentiment', function(){

      $scope.text = 'sah';
      $scope.rosette.types.sentiment = true;

      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosette.sentiment());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('rosette');      message.analyses.should.have.property('sentiment');
      message.analyses.sentiment.document.should.be.an('object');
      message.analyses.sentiment.entities.should.be.an('array');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['entities', 'relationships', 'categories'])
      }
      $scope.text.should.equal('');
    });


    it('relationships', function(){
      $scope.text = 'sah';
      $scope.rosette.types.relationships = true;

      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosette.relationships());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('rosette');      message.analyses.should.have.property('relationships');
      message.analyses.relationships.relationships.should.be.an('array');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['entities', 'sentiment', 'categories'])
      }
      $scope.text.should.equal('');
    });


    it('entities', function(){
      $scope.text = 'sah';
      $scope.rosette.types.entities = true;

      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosette.entities());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('rosette');      message.analyses.should.have.property('entities');
      message.analyses.entities.entities.should.be.an('array');
      message.errors.length.should.equal(3);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['relationships', 'sentiment', 'categories'])
      }
      $scope.text.should.equal('');
    });


    it('handles 500 when it\'s the only API called', function(){

      $scope.text = 'sah';
      $scope.rosette.types.categories = true;
      $httpBackend.whenPOST('/chat/rosette').respond(500);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      $scope.convo[1].who.should.equal('rosette');
      $scope.convo[1].error.should.equal(true);

    });


    it('handles 500 when called with other APIs', function(){

      $scope.text = 'sah';
      $scope.aylien.types.classify = true;
      $scope.rosette.types.categories = true;
      $scope.indico.types.emotion = true;
      $scope.meaningcloud.types.classification = true;
      $httpBackend.whenPOST('/chat/rosette').respond(500);
      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylien.classify);
      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.emotion);
      $httpBackend.whenPOST('/chat/meaningcloud').respond(200, service.meaningcloud.classification);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(5);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      var apiMessages = $scope.convo.slice(1,6);
      for (var i = 0; i < apiMessages.length; i++) {
        apiMessages[i].who.should.be.oneOf(['aylien', 'indico', 'rosette', 'meaningcloud']);
        if(apiMessages[i].who !== 'rosette'){
          apiMessages[i].analyses.should.be.an('object');
        } else {
          apiMessages[i].error.should.equal(true);
        }
      }
    });


    it('doesn\'t fire when $scope.text is empty', function(){

      $scope.text = '';
      $scope.rosette.categories = true;
      $scope.rosette.entities = true;
      $scope.rosette.relationships = true;
      $scope.rosette.sentiment = true;

      $scope.chat();

      $scope.convo.length.should.equal(0);
      $scope.text.should.equal('');

    });


  });



  describe('chatWithIndico()', function(){


    it('Function defined', function(){
      $scope.chatWithIndico.should.exist;
    });


    it('texttags', function(){

      $scope.text = 'sah';
      $scope.indico.types.texttags = true;

      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.texttags());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('indico');
      message.analyses.should.have.property('texttags');
      message.analyses.texttags.results.should.be.an('object');
      message.errors.length.should.equal(5);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['emotion', 'people', 'political', 'sentiment', 'personality'])
      }
      $scope.text.should.equal('');
    });


    it('sentiment', function(){

      $scope.text = 'sah';
      $scope.indico.types.sentiment = true;

      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.sentiment());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('indico');
      message.analyses.should.have.property('sentiment');
      message.analyses.sentiment.results.should.be.a('number');
      message.errors.length.should.equal(5);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['emotion', 'people', 'political', 'texttags', 'personality'])
      }
      $scope.text.should.equal('');
    });


    it('personality', function(){
      $scope.text = 'sah';
      $scope.indico.types.personality = true;

      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.personality());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('indico');
      message.analyses.should.have.property('personality');
      message.analyses.personality.results.should.be.an('object');
      message.errors.length.should.equal(5);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['emotion', 'people', 'political', 'texttags', 'sentiment'])
      }
      $scope.text.should.equal('');
    });


    it('people', function(){
      $scope.text = 'sah';
      $scope.indico.types.people = true;

      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.people());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('indico');
      message.analyses.should.have.property('people');
      message.analyses.people.results.should.be.an('array');
      message.errors.length.should.equal(5);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['emotion', 'personality', 'political', 'texttags', 'sentiment'])
      }
      $scope.text.should.equal('');
    });


    it('political', function(){
      $scope.text = 'sah';
      $scope.indico.types.political = true;

      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.political());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('indico');
      message.analyses.should.have.property('political');
      message.analyses.political.results.should.be.an('object');
      message.errors.length.should.equal(5);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['emotion', 'personality', 'people', 'texttags', 'sentiment'])
      }
      $scope.text.should.equal('');
    });


    it('emotion', function(){
      $scope.text = 'sah';
      $scope.indico.types.emotion = true;

      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.emotion());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('indico');
      message.analyses.should.have.property('emotion');
      message.analyses.emotion.results.should.be.an('object');
      message.errors.length.should.equal(5);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['political', 'personality', 'people', 'texttags', 'sentiment'])
      }
      $scope.text.should.equal('');
    });


    it('handles 500 when it\'s the only API called', function(){

      $scope.text = 'sah';
      $scope.indico.types.people = true;
      $httpBackend.whenPOST('/chat/indico').respond(500);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      $scope.convo[1].who.should.equal('indico');
      $scope.convo[1].error.should.equal(true);

    });


    it('handles 500 when called with other APIs', function(){

      $scope.text = 'sah';
      $scope.aylien.types.classify = true;
      $scope.rosette.types.categories = true;
      $scope.indico.types.emotion = true;
      $scope.meaningcloud.types.classification = true;
      $httpBackend.whenPOST('/chat/indico').respond(500);
      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylien.classify);
      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosette.categories);
      $httpBackend.whenPOST('/chat/meaningcloud').respond(200, service.meaningcloud.classification);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(5);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      var apiMessages = $scope.convo.slice(1,6);
      for (var i = 0; i < apiMessages.length; i++) {
        apiMessages[i].who.should.be.oneOf(['aylien', 'indico', 'rosette', 'meaningcloud']);
        if(apiMessages[i].who !== 'indico'){
          apiMessages[i].analyses.should.be.an('object');
        } else {
          apiMessages[i].error.should.equal(true);
        }
      }
    });


    it('doesn\'t fire when $scope.text is empty', function(){

      $scope.text = '';
      $scope.indico.emotion = true;
      $scope.indico.people = true;
      $scope.indico.personality = true;
      $scope.indico.political = true;
      $scope.indico.sentiment = true;
      $scope.indico.texttags = true;

      $scope.chat();

      $scope.convo.length.should.equal(0);
      $scope.text.should.equal('');

    });


  });



  describe('chatWithMeaningcloud()', function(){


    it('Function defined', function(){
      $scope.chatWithMeaningcloud.should.exist;
    });


    it('classification', function(){
      $scope.text = 'sah';
      $scope.meaningcloud.types.classification = true;

      $httpBackend.whenPOST('/chat/meaningcloud').respond(200, service.meaningcloud.classification());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('meaningcloud');
      message.analyses.should.have.property('classification');
      message.analyses.classification.category_list.should.be.an('array');
      message.errors.length.should.equal(2);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['sentiment', 'topics'])
      }
      $scope.text.should.equal('');
    });


    it('sentiment', function(){
      $scope.text = 'sah';
      $scope.meaningcloud.types.sentiment = true;

      $httpBackend.whenPOST('/chat/meaningcloud').respond(200, service.meaningcloud.sentiment());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('meaningcloud');
      message.analyses.should.have.property('sentiment');
      message.analyses.sentiment.subjectivity.should.be.a('string');
      message.analyses.sentiment.irony.should.be.a('string');
      message.errors.length.should.equal(2);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['classification', 'topics'])
      }
      $scope.text.should.equal('');
    });


    it('topics', function(){
      $scope.text = 'sah';
      $scope.meaningcloud.types.topics = true;

      $httpBackend.whenPOST('/chat/meaningcloud').respond(200, service.meaningcloud.topics());

      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      var message = $scope.convo[1];
      message.who.should.equal('meaningcloud');
      message.analyses.should.have.property('topics');
      message.analyses.topics.entity_list.should.be.an('array');
      message.errors.length.should.equal(2);
      for (var i = 0; i < message.errors.length; i++) {
        message.errors[i].should.be.oneOf(['classification', 'sentiment'])
      }
      $scope.text.should.equal('');
    });


    it('handles 500 when it\'s the only API called', function(){

      $scope.text = 'sah';
      $scope.meaningcloud.types.sentiment = true;
      $httpBackend.whenPOST('/chat/meaningcloud').respond(500);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(2);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      $scope.convo[1].who.should.equal('meaningcloud');
      $scope.convo[1].error.should.equal(true);

    });


    it('handles 500 when called with other APIs', function(){

      $scope.text = 'sah';
      $scope.aylien.types.classify = true;
      $scope.rosette.types.categories = true;
      $scope.indico.types.emotion = true;
      $scope.meaningcloud.types.classification = true;

      $httpBackend.whenPOST('/chat/meaningcloud').respond(500);
      $httpBackend.whenPOST('/chat/aylien').respond(200, service.aylien.classify);
      $httpBackend.whenPOST('/chat/rosette').respond(200, service.rosette.categories);
      $httpBackend.whenPOST('/chat/indico').respond(200, service.indico.emotion);
      $scope.chat();
      $httpBackend.flush();

      $scope.convo.length.should.equal(5);
      $scope.convo[0].who.should.equal('user');
      $scope.convo[0].text.should.equal('sah');
      var apiMessages = $scope.convo.slice(1,6);
      for (var i = 0; i < apiMessages.length; i++) {
        apiMessages[i].who.should.be.oneOf(['aylien', 'indico', 'rosette', 'meaningcloud']);
        if(apiMessages[i].who !== 'meaningcloud'){
          apiMessages[i].analyses.should.be.an('object');
        } else {
          apiMessages[i].error.should.equal(true);
        }
      }
    });


    it('doesn\'t fire when $scope.text is empty', function(){

      $scope.text = '';
      $scope.meaningcloud.classification = true;
      $scope.meaningcloud.sentiment = true;
      $scope.meaningcloud.topics = true;

      $scope.chat();

      $scope.convo.length.should.equal(0);
      $scope.text.should.equal('');

    });


  });



});
