angular.module('chatCtrl', [])
.controller('ChatController', function($scope, $http){

  angular.element('#convo-container').bind('mousewheel', function (e) {
    angular.element(this).scrollTop(angular.element(this).scrollTop() - e.originalEvent.wheelDeltaY);

    return false;

  });



  $scope.keys = Object.keys;

  //make this a watched flag instead
  $scope.only = function(input){
    if(Object.keys(input).length === 1){
      return true;
    }
    return false;
  };


  $scope.text = 'yo!! apples and bananas are delicious';

  function ready(){
    for (var type in this.types) {
      if (this.types[type]){
        return true;
      }
    }
    return false;
  };

  $scope.aylien = {
    view: false,
    types: {
      classify: false,
      sentiment: false,
      concepts: false,
      hashtags: false
    },
    ready: ready
  };

  $scope.rosette = {
    view: false,
    types: {
      categories: false,
      sentiment: false,
      entities: false,
      relationships: false
    },
    ready: ready
  };

  $scope.indico = {
    view: false,
    types: {
      texttags: false,
      sentiment: false,
      personality: false,
      people: false,
      political: false,
      personas: false,
      emotion: false
    },
    ready: ready
  };

  $scope.meaningcloud = {
    view: false,
    types: {
      classification: false,
      sentiment: false,
      topics: false
    },
    ready: ready
  };



  $scope.chatWithAylien = function(){
    var types = [];
    for(var type in $scope.aylien.types){
      if($scope.aylien.types[type]){
        types.push(type);
      }
    };

    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/aylien', data)
      .then(function(resp){
        var analyses = {};
        var errors = [];
        var type;
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            type = resp.data[i].type;
            analyses[type] = JSON.parse(resp.data[i].data);
          }
        }
        $scope.convo.push({
          who: 'aylien',
          analyses: analyses,
          errors: errors,
          view: 'pretty',
          json: analyses
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'aylien',
          text: 'error'
        })
      });
  };


  $scope.chatWithRosette = function(){
    var types = [];
    for(var type in $scope.rosette.types){
      if($scope.rosette.types[type]){
        types.push(type);
      }
    };

    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/rosette', data)
      .then(function(resp){
        var analyses = [];
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            analyses.push(resp.data[i]);
          }
        }
        $scope.convo.push({
          who: 'rosette',
          text: $scope.text,
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'rosette',
          text: 'error'
        })
      });
  };


  $scope.chatWithIndico = function(){
    var types = [];
    for(var type in $scope.indico.types){
      if($scope.indico.types[type]){
        types.push(type);
      }
    };

    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/indico', data)
      .then(function(resp){
        var analyses = [];
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            analyses.push(resp.data[i]);
          }
        }
        $scope.convo.push({
          who: 'indico',
          text: $scope.text,
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'indico',
          text: 'error'
        })
      });
  };


  $scope.chatWithMeaningcloud = function(){
    var types = [];
    for(var type in $scope.meaningcloud.types){
      if($scope.meaningcloud.types[type]){
        types.push(type);
      }
    };
    var data = {
      types: types,
      text: $scope.text
    };
    $http.post('/chat/meaningcloud', data)
      .then(function(resp){
        var analyses = [];
        var errors = [];
        for (var i = 0; i < resp.data.length; i++) {
          if(resp.data[i].data === 'error'){
            errors.push(resp.data[i].type);
          } else {
            analyses.push(resp.data[i]);
          }
        }
        $scope.convo.push({
          who: 'indico',
          text: $scope.text,
          analyses: analyses,
          errors: errors
        });
        $scope.text = '';
      })
      .catch(function(err){
        $scope.convo.push({
          who: 'indico',
          text: 'error'
        })
      });
  };



  $scope.chat = function(){

    var userInput = false;

    if($scope.text.length){

      if($scope.aylien.ready()){
        $scope.chatWithAylien();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

      if($scope.rosette.ready()){
        $scope.chatWithRosette();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

      if($scope.indico.ready()){
        $scope.chatWithIndico();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

      if($scope.meaningcloud.ready()){
        $scope.chatWithMeaningcloud();
        if(!userInput){
          $scope.convo.push({
            who: 'user',
            text: $scope.text
          });
          userInput = true;
        }
      }

    }

  };

  $scope.showTexttags = function(event){
    angular.element(event.target).nextAll(2).css('display', 'block');
    angular.element(event.target).css('display', 'none');
    angular.element(event.target).next().css('display', 'inline');
  };

  $scope.hideTexttags = function(event){
    angular.element(event.target).prev().css('display', 'inline');
    angular.element(event.target).css('display', 'none');
    angular.element(event.target).next().css('display', 'none');
  };

$scope.convo = [
  {
    who: 'user',
    text: 'sup sup sup sup sup'
  },
  {
    who: 'aylien',
    analyses: {
      "classify": {
        text: "yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!",
        "language": "en",
        "categories":
         [
           {
             "label": "health treatment - diet",
             "code": "07003003",
             "confidence": 0.999999920957461
           },
           {
             "label": "sports",
             "code": "07003003",
             "confidence": 0.5845345645
           },
           {
             "label": "politics",
             "code": "07003003",
             "confidence": 0.449504443
           }
        ]
      },
      "sentiment": {
       "polarity":"positive",
       "subjectivity":"subjective",
       "text":"yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!",
       "polarity_confidence":0.999940037727356,
       "subjectivity_confidence":1
     },
     "concepts": {
      "text":"yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!",
      "language":"en",
      "concepts":{
        "http://dbpedia.org/resource/Calvin_and_Hobbes":{
          "surfaceForms":[
            {
              "string":"Calvin and Hobbes",
              "score":1,
              "offset":57
            }
          ],
          "types":[
            "http://dbpedia.org/ontology/Agent",
            "http://www.wikidata.org/entity/Q215627",
            "http://schema.org/Person",
            "http://xmlns.com/foaf/0.1/Person",
            "http://www.wikidata.org/entity/Q5",
            "http://dbpedia.org/ontology/Person",
            "http://www.wikidata.org/entity/Q95074",
            "http://dbpedia.org/ontology/FictionalCharacter"
          ],
          "support":320
        },
        "http://dbpedia.org/resource/Calvin_and_Shobbes":{
          "surfaceForms":[
            {
              "string":"Calvin and Shobbes",
              "score":1,
              "offset":57
            }
          ],
          "types":[
            "http://dbpedia.org/ontology/Agent",
            "http://www.wikidata.org/entity/Q215627",
            "http://schema.org/Person",
            "http://xmlns.com/foaf/0.1/Person",
            "http://www.wikidata.org/entity/Q5",
            "http://dbpedia.org/ontology/Person",
            "http://www.wikidata.org/entity/Q95074",
            "http://dbpedia.org/ontology/FictionalCharacter"
          ],
          "support":320
        }
      },
      },
      "hashtags": {
        "text": "yo bananas are flipping awesome, and I also love hiking. Calvin and Hobbes are homies!",
        "language": "en",
        "hashtags": [ "#CalvinAndHobbes", "#Apples" ]
      }
    },
    "errors": [
      "error2"
    ],
    "view": "pretty"
  },
  {
    who:'rosette',
    analyses:{
      entities:[
        {
          type:'PERSON',
          mention:'Hillary Clinton',
          normalized:'Hillary Clinton',
          count:1,
          entityId:'Q6294'
        },
        {
          type:'PERSON',
          mention:'Calvin',
          normalized:'Calvin',
          count:1,
          entityId:'sah'
        },
        {
          type:'ANIMAL',
          mention:'Hobbes',
          normalized:'Hobbes',
          count:1,
          entityId:'sah?'
        }
      ],
      categories:[
        {
          label:'HOBBIES_AND_INTERESTS',
          confidence:0.05658204154654853
        },
        {
          label:'GETTING_MONEY',
          confidence:0.2456654456
        }
      ],
      sentiment:{
        document:{
          label:'pos',
          confidence:0.797550182166894
        },
        entities:[
          {
            type:'PERSON',
            mention:'Hillary Clinton',
            normalized:'Hillary Clinton',
            count:1,
            entityId:'Q6294',
            sentiment:{
              label:'pos',
              confidence:0.7768189179319668
            }
          },
          {
            type:'PERSON',
            mention:'Barack Obama',
            normalized:'Barack Obama',
            count:1,
            entityId:'barryo',
            sentiment:{
              label:'pos',
              confidence:0.4566818979319668
            }
          },
          {
            type:'PERSON',
            mention:'Mickey Mouse',
            normalized:'Mickey Mouse',
            count:1,
            entityId:'mickey',
            sentiment:{
              label:'pos',
              confidence:0.03490349090
            }
          }
        ]
      },
      relationships:[
        {
          predicate:'attend',
          arg1:'Hillary Clinton',
          arg1Id:'Q6294',
          arg2:'Wellesley College',
          modalities:[
            'assertion'
          ],
          confidence:0.6764000811091223
        },
        {
          predicate:'attend',
          arg1:'Joe Biden',
          arg1Id:'Q6294',
          arg2:'University of Delaware',
          modalities:[
            'assertion'
          ],
          confidence:0.454000811091223
        },
        {
          predicate:'attend',
          arg1:'Barack Obama',
          arg1Id:'Q76',
          arg2:'Occidental',
          modalities:[
            'assertion'
          ],
          confidence:0.6764000811091223
        }
      ]
    },
    view:'pretty',
    errors:[
      'error',
      'error'
    ]
  },
  {
    who:'indico',
    analyses:{
      texttags:{
        results:{
          dieting:0.0107409429,
          golf:0.0021911245,
          fishing:0.003130729,
          islam:0.0054833151,
          relationships:0.0038802736000000003,
          atheism:0.007172240900000001,
          hunting:0.0042093742,
          personal:0.008837838800000001,
          nostalgia:0.0057791909,
          writing:0.005706128,
          hockey:0.0025327751,
          soccer:0.0036636412,
          political_discussion:0.0056255169,
          photography:0.0051464242,
          vegan:0.010935106200000001,
          wedding:0.0099470659,
          school:0.0047320749,
          judaism:0.0076663613000000005,
          nfl:0.0042976445,
          architecture:0.0027873453,
          fitness:0.0111873266,
          gender_issues:0.0062468357,
          art:0.0108036816,
          energy:0.0026856261,
          wrestling:0.004907685,
          general_food:0.0101661562,
          books:0.0076128393,
          design:0.010502651,
          skateboarding:0.0034350624,
          nba:0.0056667283,
          investment:0.0031883818,
          psychology:0.0037091972,
          cooking:0.015883388800000002,
          religion:0.0051934921000000005,
          health:0.0124131124,
          individualist_politics:0.0082176397,
          pets:0.0061459057,
          medicine:0.0039406825,
          electronics:0.0026218665,
          guns:0.0051174343,
          math:0.0028588887,
          diy:0.006603436000000001,
          biology:0.0058614617,
          jobs:0.0023942722,
          business:0.0039655947,
          cars:0.0051657646,
          anthropology:0.0061398557,
          lgbt:0.010835643300000001,
          baseball:0.0034246917,
          news:0.0074483437,
          rugby:0.0029880686,
          realestate:0.0020121349,
          vegetarian:0.0050071958,
          programming:0.0025325289,
          personalfinance:0.0027332565,
          anime:0.0064080871,
          military:0.0030428559,
          swimming:0.0031115757,
          weather:0.0016697363000000001,
          economic_discussion:0.0049791017,
          gardening:0.0152114945,
          weight_training:0.0040837904000000005,
          fiction:0.0071830921,
          singing:0.0117009483,
          tennis:0.0027289669,
          beer:0.0080150402,
          christianity:0.0050054102,
          entertainment_news:0.0088034713,
          music:0.0125463877,
          nutrition:0.3137291789,
          cricket:0.0022861536,
          drugs:0.0045919372,
          environmental:0.0040670125,
          aviation:0.0034633470000000003,
          personal_care_and_beauty:0.0118346165,
          television:0.010307585400000001,
          sailing:0.0038050932000000003,
          comics:0.0154849137,
          science:0.0048769634,
          scuba:0.0046424238,
          left_politics:0.0095597164,
          history:0.0041068183000000005,
          right_politics:0.008135255400000001,
          fashion:0.012646314700000001,
          conspiracy:0.003853056,
          education:0.007284276100000001,
          technology:0.0074822205,
          film:0.023556532800000002,
          tattoo:0.0121215213,
          yoga:0.0042695121,
          startups_and_entrepreneurship:0.0044834854,
          bicycling:0.004355266,
          travel:0.0084117374,
          boxing:0.002354886,
          poetry:0.0091856778,
          romance:0.0043426014,
          buddhism:0.0047327444,
          comedy:0.0070636797000000005,
          gaming:0.0061970110000000005,
          poker:0.0022668337,
          philosophy:0.007269943500000001,
          parenting:0.008861843500000001,
          running:0.0074020278000000005,
          climbing:0.0034300049000000003,
          astronomy:0.0024834893000000003,
          archery:0.0031682813000000003,
          surfing:0.0023916726000000003,
          sports:0.0045748544,
          ultimate:0.0023345156,
          crafts:0.0078796421,
          wine:0.0061334512
        }
      },
      sentiment:{
        results:0.7298417901
      },
      personality:{
        results:{
          openness:0.45676236950000004,
          extraversion:0.48251084710000003,
          agreeableness:0.4915289607,
          conscientiousness:0.5541553189
        }
      },
      people:{
        results:[
          'Barack Obama',
          'Hillary Clinton',
          'Joe Biden',
          'Tim Kaine'
        ]
      },
      political:{
        results:{
          Libertarian:0.0981165543,
          Green:0.5856987238,
          Liberal:0.226309225,
          Conservative:0.0898754299
        }
      },
      emotion:{
        results:{
          anger:0.0285347775,
          joy:0.8419603109,
          sadness:0.0714776292,
          fear:0.0250141397,
          surprise:0.0330131538
        }
      }
    },
    view:'pretty',
    errors:[
      'error', 'error'
    ]
  },
  {
    who: 'meaningcloud',
    view: 'pretty',
    analyses: {
      'topics': {
        "status": {
          "code": "0",
          "msg": "OK",
          "credits": "1",
          "remaining_credits": "39879"
        },
        "entity_list": [
          {
            "form": "Calvin",
            "id": "ed4c372878",
            "sementity": {
              "class": "instance",
              "fiction": "nonfiction",
              "id": "ODENTITY_LAST_NAME",
              "type": "Top>Person>LastName"
            },
            "semld_list": [
              "sumo:LastName"
            ],
            "variant_list": [
              {
                "form": "Calvin",
                "inip": "57",
                "endp": "62"
              }
            ],
            "relevance": "100"
          },
          {
            "form": "Socrates",
            "id": "ed4c372878",
            "sementity": {
              "class": "instance",
              "fiction": "nonfiction",
              "id": "ODENTITY_LAST_NAME",
              "type": "Top>Person>LastName"
            },
            "semld_list": [
              "sumo:LastName"
            ],
            "variant_list": [
              {
                "form": "Calvin",
                "inip": "57",
                "endp": "62"
              }
            ],
            "relevance": "100"
          },
          {
            "form": "Hobbes",
            "id": "11e81c5397",
            "sementity": {
              "class": "instance",
              "fiction": "nonfiction",
              "id": "ODENTITY_LAST_NAME",
              "type": "Top>Person>LastName"
            },
            "semld_list": [
              "sumo:LastName"
            ],
            "variant_list": [
              {
                "form": "Hobbes",
                "inip": "68",
                "endp": "73"
              }
            ],
            "relevance": "100"
          }
        ],
        "concept_list": [
          {
            "form": "banana",
            "id": "04829d79a9",
            "sementity": {
              "class": "class",
              "fiction": "nonfiction",
              "id": "ODENTITY_FRUIT_OR_VEGETABLE",
              "type": "Top>Product>Food>FruitOrVegetable"
            },
            "semld_list": [
              "sumo:PreparedFood"
            ],
            "variant_list": [
              {
                "form": "bananas",
                "inip": "3",
                "endp": "9"
              }
            ],
            "relevance": "100"
          }
        ],
        "time_expression_list": [],
        "money_expression_list": [],
        "quantity_expression_list": [],
        "other_expression_list": [],
        "quotation_list": [],
        "relation_list": [
          {
            "form": "yo bananas are flipping awesome, and I also love hiking.",
            "inip": "0",
            "endp": "30",
            "subject": {
              "form": "bananas",
              "lemma_list": [
                "banana"
              ],
              "sense_id_list": [
                "04829d79a9"
              ]
            },
            "verb": {
              "form": "are flipping",
              "lemma_list": [
                "flip"
              ]
            },
            "complement_list": [],
            "degree": "1"
          },
          {
            "form": "yo bananas are flipping awesome, and I also love hiking.",
            "inip": "37",
            "endp": "54",
            "subject": {
              "form": "I",
              "lemma_list": [
                "I"
              ],
              "sense_id_list": [
                "PRONHUMAN"
              ]
            },
            "verb": {
              "form": "love",
              "lemma_list": [
                "love"
              ],
              "sense_id_list": [
                "ODENTITY_BIOLOGICAL_PROCESS",
                "ODENTITY_DUAL_OBJECT_PROCESS",
                "ODENTITY_INTENTIONAL_PSYCHOLOGICAL_PROCESS"
              ]
            },
            "complement_list": [
              {
                "form": "also",
                "type": "isComplement"
              },
              {
                "form": "hiking",
                "type": "isDirectObject"
              }
            ],
            "degree": "1"
          },
          {
            "form": "Calvin and Hobbes are homies!",
            "inip": "57",
            "endp": "85",
            "subject": {
              "form": "Calvin and Hobbes"
            },
            "verb": {
              "form": "are",
              "lemma_list": [
                "be"
              ]
            },
            "complement_list": [],
            "degree": "1"
          }
        ]
      },
      'sentiment': {
        "status": {
          "code": "0",
          "msg": "OK",
          "credits": "1",
          "remaining_credits": "39878"
        },
        "model": "general_en",
        "score_tag": "P+",
        "agreement": "AGREEMENT",
        "subjectivity": "SUBJECTIVE",
        "confidence": "100",
        "irony": "NONIRONIC",
        "sentence_list": [
          {
            "text": "yo bananas are flipping awesome, and I also love hiking.",
            "inip": "0",
            "endp": "55",
            "bop": "y",
            "confidence": "100",
            "score_tag": "P+",
            "agreement": "AGREEMENT",
            "segment_list": [
              {
                "text": "yo bananas are flipping awesome",
                "segment_type": "main",
                "inip": "0",
                "endp": "30",
                "confidence": "100",
                "score_tag": "P+",
                "agreement": "AGREEMENT",
                "polarity_term_list": [
                  {
                    "text": "awesome",
                    "inip": "24",
                    "endp": "30",
                    "confidence": "100",
                    "score_tag": "P+",
                    "sentimented_concept_list": [
                      {
                        "form": "banana",
                        "id": "04829d79a9",
                        "variant": "bananas",
                        "inip": "3",
                        "endp": "9",
                        "type": "Top>Product>Food>FruitOrVegetable",
                        "score_tag": "P+"
                      }
                    ]
                  }
                ]
              },
              {
                "text": "I also love hiking",
                "segment_type": "main",
                "inip": "37",
                "endp": "54",
                "confidence": "100",
                "score_tag": "P+",
                "agreement": "AGREEMENT",
                "polarity_term_list": [
                  {
                    "text": "love@V",
                    "inip": "44",
                    "endp": "47",
                    "confidence": "100",
                    "score_tag": "P+"
                  }
                ]
              }
            ],
            "sentimented_entity_list": [],
            "sentimented_concept_list": [
              {
                "form": "banana",
                "id": "04829d79a9",
                "type": "Top>Product>Food>FruitOrVegetable",
                "score_tag": "P+"
              }
            ]
          },
          {
            "text": "Calvin and Hobbes are homies!",
            "inip": "57",
            "endp": "85",
            "bop": "n",
            "confidence": "100",
            "score_tag": "NONE",
            "agreement": "AGREEMENT",
            "segment_list": [
              {
                "text": "Calvin and Hobbes are homies!",
                "segment_type": "secondary",
                "inip": "57",
                "endp": "85",
                "confidence": "100",
                "score_tag": "NONE",
                "agreement": "AGREEMENT",
                "polarity_term_list": [],
                "sentimented_entity_list": [
                  {
                    "form": "Hobbes",
                    "id": "11e81c5397",
                    "variant": "Hobbes",
                    "inip": "68",
                    "endp": "73",
                    "type": "Top>Person>LastName",
                    "score_tag": "NONE"
                  },
                  {
                    "form": "Calvin",
                    "id": "ed4c372878",
                    "variant": "Calvin",
                    "inip": "57",
                    "endp": "62",
                    "type": "Top>Person>LastName",
                    "score_tag": "NONE"
                  }
                ]
              }
            ],
            "sentimented_entity_list": [
              {
                "form": "Hobbes",
                "id": "11e81c5397",
                "type": "Top>Person>LastName",
                "score_tag": "NONE"
              },
              {
                "form": "Calvin",
                "id": "ed4c372878",
                "type": "Top>Person>LastName",
                "score_tag": "NONE"
              }
            ],
            "sentimented_concept_list": []
          }
        ],
        "sentimented_entity_list": [
          {
            "form": "Hobbes",
            "id": "11e81c5397",
            "type": "Top>Person>LastName",
            "score_tag": "NONE"
          },
          {
            "form": "Calvin",
            "id": "ed4c372878",
            "type": "Top>Person>LastName",
            "score_tag": "NONE"
          }
        ],
        "sentimented_concept_list": [
          {
            "form": "banana",
            "id": "04829d79a9",
            "type": "Top>Product>Food>FruitOrVegetable",
            "score_tag": "P+"
          }
        ]
      },
      'classification': {
        "status": {
          "code": "0",
          "msg": "OK",
          "credits": "1",
          "remaining_credits": "39877"
        },
        "category_list": [
          {
            "code": "Food&Drink",
            "label": "Food & Drink",
            "abs_relevance": "1",
            "relevance": "100"
          },
          {
            "code": "Food&Drink",
            "label": "Hillary",
            "abs_relevance": "1",
            "relevance": "100"
          },
          {
            "code": "Barry O",
            "label": "Barry O",
            "abs_relevance": "1",
            "relevance": "100"
          }
        ]
      }
    },
    errors: [
      'error'
    ]
  }
]

});
