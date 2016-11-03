
var request = require('supertest');
var chai = require('chai');
var should = chai.should();

var app = require('../../dist/server/app.js');
var config = require('../../config/config');
var agent = request.agent(app);



describe('POST /aylien', function(){

  it('returns array of analyses', function(done){
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
        text: 'yo! I love bananas!!!'
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

});



describe('POST /rosette', function(){

  it('returns array of analyses', function(done){
    agent
      .post('/chat/rosette')
      .send({
        types: [
          'entities',
          'sentiment',
          'categories',
          'relationships'
        ],
        text: 'yo! I love bananas!!!'
      })
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.body.should.be.an('array');
        res.body.length.should.equal(4);
        for (var i = 0; i < res.body.length; i++) {
          res.body[i].type.should.be.a('string');
          res.body[i].data.should.be.an('Object');
        }
        done();
      });
  });

});
