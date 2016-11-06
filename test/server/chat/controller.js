
var request = require('supertest');
var chai = require('chai');
var should = chai.should();

var app = require('../../dist/server/app.js');
var config = require('../../config/config');
var agent = request.agent(app);
var analyses;
var analysisData;


describe('POST /chat/aylien', function(){

  it('returns all analyses if requested', function(done){
    agent
      .post('/chat/aylien')
      .send({
        types: [
          'classify',
          'sentiment',
          'concepts',
          'entities',
          'summarize',
          'hashtags'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.body.should.be.an('array');
        res.body.length.should.equal(6);
        for (var i = 0; i < res.body.length; i++) {
          res.body[i].type.should.be.a('string');
          res.body[i].data.should.be.a('string');
        }
        done();
      });
  });

  it('classify', function(done){
    agent
      .post('/chat/aylien')
      .send({
        types: [
          'classify'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('classify');
        analysisData = JSON.parse(analyses[0].data);
        analysisData.text.should.be.a('string');
        analysisData.language.should.equal('en');
        analysisData.categories.should.be.an('array');
        if(analysisData.categories.length > 0){
          for (var i = 0; i < analysisData.categories.length; i++) {
            analysisData.categories[i].label.should.be.an('string');
            analysisData.categories[i].code.should.be.a('string');
            analysisData.categories[i].confidence.should.be.within(0,1);
          }
        }
        done();
      });
  });

  it('sentiment', function(done){
    agent
      .post('/chat/aylien')
      .send({
        types: [
          'sentiment'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('sentiment');
        analysisData = JSON.parse(analyses[0].data);
        analysisData.text.should.be.a('string');
        analysisData.should.be.an('object');
        analysisData.polarity.should.be.oneOf(['positive', 'negative', 'neutral']);
        analysisData.subjectivity.should.be.oneOf(['subjective', 'objective'])
        analysisData.polarity_confidence.should.be.within(0,1);
        analysisData.subjectivity_confidence.should.be.within(0,1);
        done();
      });
  });


  it('concepts', function(done){
    agent
      .post('/chat/aylien')
      .send({
        types: [
          'concepts'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('concepts');
        analysisData = JSON.parse(analyses[0].data);
        analysisData.concepts.should.be.an('object');
        if(Object.keys(analysisData.concepts).length > 0){
          for(var field in analysisData.concepts){
            analysisData.concepts[field].surfaceForms.should.be.an('array');
            analysisData.concepts[field].types.should.be.an('array');
          };
        }
        done();
      });
  });

  it('entities', function(done){
    agent
      .post('/chat/aylien')
      .send({
        types: [
          'entities'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('entities');
        analysisData = JSON.parse(analyses[0].data);
        analysisData.entities.should.be.an('object');
        analysisData.entities.keyword.should.be.an('array');
        if(analysisData.entities.keyword.length > 0){
          for (var i = 0; i < analysisData.entities.keyword.length; i++) {
            analysisData.entities.keyword[i].should.be.a('string');
          }
        }
        done();
      });
  });

  it('hashtags', function(done){
    agent
      .post('/chat/aylien')
      .send({
        types: [
          'hashtags'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('hashtags');
        analysisData = JSON.parse(analyses[0].data);
        analysisData.text.should.be.a('string');
        analysisData.language.should.be.a('string');
        analysisData.hashtags.should.be.an('array');
        if(analysisData.hashtags.length > 0){
          for (var i = 0; i < analysisData.hashtags.length; i++) {
            analysisData.hashtags[i].should.be.a('string');
          }
        }
        done();
      });
  });


});



describe('POST /chat/rosette', function(){

  it('returns all analyses if requested', function(done){
    agent
      .post('/chat/rosette')
      .send({
        types: [
          'entities',
          'sentiment',
          'categories',
          'relationships'
        ],
        text: 'literally apples and bananas are my freaking favorite. I also love Hillary Clinton!!!!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(4);
        for (var i = 0; i < analyses.length; i++) {
          analyses[i].type.should.be.oneOf([
            'entities',
            'sentiment',
            'categories',
            'relationships'
          ]);
          analyses[i].data.should.be.an('Object');
        }
        done();
      });
  });


  it('entities', function(done){
    agent
      .post('/chat/rosette')
      .send({
        types: [
          'entities'
        ],
        text: 'literally apples and bananas are my freaking favorite. I also love Hillary Clinton!!!!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('entities');
        analyses[0].data.entities.should.be.an('array');
        if(analyses[0].data.entities.length > 0){
          for (var i = 0; i < analyses[0].data.entities.length; i++) {
            analyses[0].data.entities[i].type.should.be.a('string');
            analyses[0].data.entities[i].mention.should.be.a('string');
            analyses[0].data.entities[i].normalized.should.be.a('string');
            analyses[0].data.entities[i].count.should.be.a('number');
            analyses[0].data.entities[i].entityId.should.be.a('string');
          }
        }
        done();
      });
  });

  it('sentiment', function(done){
    agent
      .post('/chat/rosette')
      .send({
        types: [
          'sentiment'
        ],
        text: 'literally apples and bananas are my freaking favorite. I also love Hillary Clinton!!!!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('sentiment');
        analyses[0].data.document.should.be.an('object');
        analyses[0].data.document.label.should.be.a('string');
        analyses[0].data.document.confidence.should.be.within(0,1);
        analyses[0].data.entities.should.be.an('array');
        done();
      });
  });

  it('categories', function(done){
    agent
      .post('/chat/rosette')
      .send({
        types: [
          'categories'
        ],
        text: 'literally apples and bananas are my freaking favorite. I also love Hillary Clinton!!!!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('categories');
        analyses[0].data.categories.should.be.an('array');
        if(analyses[0].data.categories.length > 0){
          for (var i = 0; i < analyses[0].data.categories.length; i++) {
            analyses[0].data.categories[i].label.should.be.a('string');
            analyses[0].data.categories[i].confidence.should.be.within(0,1);
          }
        }
        done();
      });
  });

  it('relationships', function(done){
    agent
      .post('/chat/rosette')
      .send({
        types: [
          'relationships'
        ],
        text: 'calvin and hobbes are best friends'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('relationships');
        analyses[0].data.relationships.should.be.an('array');
        if(analyses[0].data.relationships.length > 0){
          for (var i = 0; i < analyses[0].data.relationships.length; i++) {
            //console.log(analyses[0].data.relationships[i]);
            //analyses[0].data.categories[i].label.should.be.a('string');
            //analyses[0].data.categories.confidence.should.be.within(0,1);
          }
        }
        done();
      });
  });

});



describe('POST /chat/indico', function(){

  it('returns all analyses if prompted', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'texttags',
          'sentiment',
          'personality',
          'people',
          'political',
          //'personas',//error
          'emotion'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        var analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(6);
        for (var i = 0; i < analyses.length; i++) {
          analyses[i].should.be.a('object');
          analyses[i].type.should.be.oneOf([
            'texttags',
            'sentiment',
            'personality',
            'people',
            'political',
            'personas',
            'emotion'
          ]);
          analyses[i].data.should.have.property('results');
        }
        if(err) return done(err);
        done();
      });
  });

  it('textags', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'texttags'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.body.should.be.an('array');
        res.body.length.should.equal(1);
        res.body[0].type.should.equal('texttags');
        res.body[0].data.results.should.be.an('object');
        Object.keys(res.body[0].data.results).length.should.equal(111);
        done();
      });
  });

  it('sentiment', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'sentiment'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('sentiment');
        analyses[0].data.results.should.be.within(0, 1);
        done();
      });
  });

  it('personality', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'personality'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('personality');
        analyses[0].data.results.openness.should.be.within(0,1);
        analyses[0].data.results.extraversion.should.be.within(0,1);
        analyses[0].data.results.agreeableness.should.be.within(0,1);
        analyses[0].data.results.conscientiousness.should.be.within(0,1);
        done();
      });
  });

  it('people', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'people'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('people');
        analyses[0].data.results.should.be.an('array');
        done();
      });
  });

  it('political', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'political'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('political');
        analyses[0].data.results.Libertarian.should.be.within(0,1);
        analyses[0].data.results.Green.should.be.within(0,1);
        analyses[0].data.results.Liberal.should.be.within(0,1);
        analyses[0].data.results.Conservative.should.be.within(0,1);
        done();
      });
  });

  it('emotion', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'emotion'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].data.results.anger.should.be.within(0,1);
        analyses[0].data.results.joy.should.be.within(0,1);
        analyses[0].data.results.sadness.should.be.within(0,1);
        analyses[0].data.results.surprise.should.be.within(0,1);
        done();
      });
  });

  it('emotion', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'emotion'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].data.results.anger.should.be.within(0,1);
        analyses[0].data.results.joy.should.be.within(0,1);
        analyses[0].data.results.sadness.should.be.within(0,1);
        analyses[0].data.results.surprise.should.be.within(0,1);
        done();
      });
  });

  it('emotion', function(done){
    agent
      .post('/chat/indico')
      .send({
        types: [
          'personas'
        ],
        text: 'I love bananas and apples and oranges and batman and black tea'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        console.log(analyses[0].data);/*
        analyses[0].data.results.anger.should.be.within(0,1);
        analyses[0].data.results.joy.should.be.within(0,1);
        analyses[0].data.results.sadness.should.be.within(0,1);
        analyses[0].data.results.surprise.should.be.within(0,1);*/
        done();
      });
  });

});




describe('POST /chat/meaningcloud', function(){

  it('returns all analyses if requested', function(done){
    agent
      .post('/chat/meaningcloud')
      .send({
        types: [
          'topics',
          'sentiment',
          'classification'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.body.should.be.an('array');
        res.body.length.should.equal(3);
        for (var i = 0; i < res.body.length; i++) {
          res.body[i].type.should.be.a('string');
          res.body[i].data.should.be.a('string');
        }
        done();
      });
  });


  it('topics', function(done){
    agent
      .post('/chat/meaningcloud')
      .send({
        types: [
          'topics'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('topics');
        analysisData = JSON.parse(analyses[0].data);
        analysisData.entity_list.should.be.an('array');
        if(analysisData.entity_list.length > 0){
          for (var i = 0; i < analysisData.entity_list.length; i++) {
            analysisData.entity_list[i].form.should.be.a('string');
            analysisData.entity_list[i].id.should.be.a('string');
            analysisData.entity_list[i].sementity.should.be.an('object');
            analysisData.entity_list[i].semld_list.should.be.an('array');
            analysisData.entity_list[i].variant_list.should.be.an('array');
            analysisData.entity_list[i].relevance.should.be.a('string');
          }
        }
        analysisData.concept_list.should.be.an('array');
        if(analysisData.concept_list.length > 0){
          for (var i = 0; i < analysisData.concept_list.length; i++) {
            analysisData.concept_list[i].form.should.be.a('string');
            analysisData.concept_list[i].id.should.be.a('string');
            analysisData.concept_list[i].sementity.should.be.an('object');
            analysisData.concept_list[i].semld_list.should.be.an('array');
            analysisData.concept_list[i].variant_list.should.be.an('array');
            analysisData.concept_list[i].relevance.should.be.a('string');
          }
        }
        done();
      });
  });


  it('sentiment', function(done){
    agent
      .post('/chat/meaningcloud')
      .send({
        types: [
          'sentiment'
        ],
        text: 'yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('sentiment');
        analysisData = JSON.parse(analyses[0].data);
        //analysisData.status.msg.should.be.oneOf([]);
        analysisData.subjectivity.should.be.a('string');
        parseInt(analysisData.confidence).should.be.a('number');
        analysisData.irony.should.be.a('string')
        done();
      });
  });


  it('classification', function(done){
    agent
      .post('/chat/meaningcloud')
      .send({
        types: [
          'classification'
        ],
        text: 'yo!! apples and bananas are delicious'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        analyses = res.body;
        analyses.should.be.an('array');
        analyses.length.should.equal(1);
        analyses[0].type.should.equal('classification');
        analysisData = JSON.parse(analyses[0].data);
        //analysisData.status.msg.should.be.oneOf([])
        analysisData.category_list.should.be.an('array');
        if(analysisData.category_list.length > 0){
          for (var i = 0; i < analysisData.category_list.length; i++) {
            analysisData.category_list[i].code.should.be.a('string');
            analysisData.category_list[i].label.should.be.a('string');
            parseInt(analysisData.category_list[i].abs_relevance).should.be.a('number');
            parseInt(analysisData.category_list[i].relevance).should.be.a('number');
          }
        }
        done();
      });
  });

});
