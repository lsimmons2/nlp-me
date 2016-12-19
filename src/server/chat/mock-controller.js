

var aylien = {};
var rosette = {};
var indico = {};
var meaningcloud = {};



aylien.classify = function(){

  return {
      "type": "classify",
      "data": "{\n  \"text\": \"So if the devil wear Prada, Adam Eve wear Nada, I'm in between, but way more fresher.\",\n  \"language\": \"en\",\n  \"categories\": [{\n    \"label\": \"arts, culture and entertainment - nightclub\",\n    \"code\": \"01023000\",\n    \"confidence\": 0.9744709946314386\n  }]\n}"
    };

};

aylien.sentiment = function(){
  return {
      "type": "sentiment",
      "data": "{\n  \"polarity\": \"negative\",\n  \"subjectivity\": \"subjective\",\n  \"text\": \"I'm like the fly Malcolm X, buy any jeans necessary\",\n  \"polarity_confidence\": 0.3802330791950226,\n  \"subjectivity_confidence\": 1.0\n}"
    };
};

aylien.concepts = function(){
  return {
      "type": "concepts",
      "data": "{\n  \"text\": \"I'm like the fly Malcolm X, buy any jeans necessary\",\n  \"language\": \"en\",\n  \"concepts\": {\n    \"http://dbpedia.org/resource/Malcolm_X\": {\n      \"surfaceForms\": [{\n        \"string\": \"Malcolm X\",\n        \"score\": 0.9999963068766374,\n        \"offset\": 17\n      }],\n      \"types\": [\"http://dbpedia.org/ontology/Person\"],\n      \"support\": 1341\n    }\n  }\n}"
    };
};

aylien.hashtags = function(){
  return {
      "type": "hashtags",
      "data": "{\n  \"text\": \"So if the devil wear Prada, Adam Eve wear Nada, I'm in between, but way more fresher.\",\n  \"language\": \"en\",\n  \"hashtags\": [\"#Adam\", \"#Prada\"]\n}"
    };
};




rosette.categories = function(){
  return {
      "type": "categories",
      "data": {
        "categories": [
          {
            "label": "TECHNOLOGY_AND_COMPUTING",
            "confidence": 0.06990357074628932
          }
        ]
      }
    };
};

rosette.entities = function(){
  return {
      "type": "entities",
      "data": {
        "entities": [
          {
            "type": "PERSON",
            "mention": "Malcolm X",
            "normalized": "Malcolm X",
            "count": 1,
            "entityId": "Q43303"
          }
        ]
      }
    };
};

rosette.relationships = function(){
  return {
      "type": "relationships",
      "data": {
        "relationships": [
          {
            "predicate": "is",
            "arg1": "Sex",
            "arg2": "on fire",
            "modalities": [
              "assertion"
            ],
            "confidence": 0.6516253693330798
          }
        ]
      }
    };
};

rosette.sentiment = function(){
  return {
      "type": "sentiment",
      "data": {
        "document": {
          "label": "pos",
          "confidence": 0.5756002591232839
        },
        "entities": [
          {
            "type": "PERSON",
            "mention": "Malcolm X",
            "normalized": "Malcolm X",
            "count": 1,
            "entityId": "Q43303",
            "sentiment": {
              "label": "pos",
              "confidence": 0.5888354235094712
            }
          }
        ]
      }
    }
};



indico.emotion = function(){
  return {
      "type": "emotion",
      "data": {
        "results": {
          "anger": 0.10650923100000001,
          "joy": 0.39788001780000004,
          "fear": 0.2506706119,
          "sadness": 0.2103400528,
          "surprise": 0.0346001238
        }
      }
    };
};

indico.people = function(){
  return {
      "type": "people",
      "data": {
        "results": [
          {
            "text": "Adam Eve",
            "confidence": 0.4032040834,
            "position": [
              28,
              36
            ]
          },
          {
            "text": "Eve",
            "confidence": 0.2177971303,
            "position": [
              33,
              36
            ]
          },
          {
            "text": "Adam",
            "confidence": 0.092138648,
            "position": [
              28,
              32
            ]
          },
          {
            "text": "Prada",
            "confidence": 0.0842634141,
            "position": [
              21,
              26
            ]
          },
          {
            "text": "devil wear Prada",
            "confidence": 0.013975519700000001,
            "position": [
              10,
              26
            ]
          }
        ]
      }
    };
};

indico.personality = function(){
  return {
      "type": "personality",
      "data": {
        "results": {
          "openness": 0.5887406652,
          "extraversion": 0.5798121393,
          "agreeableness": 0.5125332862,
          "conscientiousness": 0.46917480850000004
        }
      }
    };
};

indico.political = function(){
  return {
      "type": "political",
      "data": {
        "results": {
          "Libertarian": 0.19979138670000002,
          "Green": 0.48585385080000004,
          "Liberal": 0.19911500810000002,
          "Conservative": 0.11523976920000001
        }
      }
    };
};

indico.sentiment = function(){
  return {
      "type": "sentiment",
      "data": {
        "results": 0.48536382850000004
      }
    };
};

indico.texttags = function(){
  return {
      "type": "texttags",
      "data": {
        "results": {
          "dieting": 0.0046511598000000005,
          "golf": 0.012517795,
          "fishing": 0.027193031200000002,
          "islam": 0.0051551905,
          "relationships": 0.0012328666,
          "atheism": 0.0031501214000000002,
          "hunting": 0.0029213896,
          "personal": 0.003336758,
          "nostalgia": 0.0023660609,
          "writing": 0.0031779390000000003,
          "hockey": 0.0029168524000000003,
          "soccer": 0.0018796028,
          "political_discussion": 0.0046269616,
          "photography": 0.0062224554,
          "vegan": 0.0035141469,
          "wedding": 0.0014982480000000002,
          "school": 0.0029198406,
          "judaism": 0.0022194137,
          "nfl": 0.0027744114,
          "architecture": 0.0021471996,
          "fitness": 0.0045522304,
          "gender_issues": 0.0039052696,
          "art": 0.0078442424,
          "energy": 0.0051218224,
          "wrestling": 0.0032606204000000002,
          "general_food": 0.0037585642000000003,
          "books": 0.0032719099000000002,
          "design": 0.0033365778,
          "skateboarding": 0.0035720893,
          "nba": 0.0025641156000000003,
          "investment": 0.0115560835,
          "psychology": 0.0015842205,
          "cooking": 0.0049932381,
          "religion": 0.0022924236000000002,
          "health": 0.0043004208,
          "individualist_politics": 0.0053855941,
          "pets": 0.0039936116,
          "medicine": 0.0015197825,
          "electronics": 0.0034495029,
          "guns": 0.008236286800000001,
          "math": 0.0022058784000000002,
          "diy": 0.0068591839,
          "biology": 0.012351477100000001,
          "jobs": 0.0018218216000000001,
          "business": 0.0086513145,
          "cars": 0.0056102291,
          "anthropology": 0.0020786713,
          "lgbt": 0.0029538727,
          "baseball": 0.0042041868,
          "news": 0.0058584731,
          "rugby": 0.0046188846,
          "realestate": 0.008102828900000001,
          "vegetarian": 0.0031479438,
          "programming": 0.0040784566000000005,
          "personalfinance": 0.0050553729000000006,
          "anime": 0.0026918548000000003,
          "military": 0.0056242323,
          "swimming": 0.0216860997,
          "weather": 0.0015329753,
          "economic_discussion": 0.0062817794000000005,
          "gardening": 0.0035918638,
          "weight_training": 0.0037382093000000003,
          "fiction": 0.0049920728000000004,
          "singing": 0.0035593251,
          "tennis": 0.0021371952000000002,
          "entertainment_news": 0.0049873604,
          "christianity": 0.0020427412,
          "beer": 0.0069407783,
          "music": 0.0054563508,
          "nutrition": 0.0037532518000000003,
          "cricket": 0.0024185809,
          "drugs": 0.0061422839,
          "environmental": 0.009488845000000001,
          "aviation": 0.0331558738,
          "personal_care_and_beauty": 0.0028628541,
          "television": 0.0045670575,
          "sailing": 0.003457841,
          "comics": 0.0061291579,
          "science": 0.0040583176,
          "scuba": 0.0017563345,
          "left_politics": 0.0077636692,
          "history": 0.0021871165,
          "right_politics": 0.0030166179,
          "fashion": 0.45176874110000004,
          "conspiracy": 0.0071835530000000005,
          "education": 0.0027926718000000003,
          "technology": 0.0077243525,
          "film": 0.0040777628,
          "tattoo": 0.0020983588,
          "yoga": 0.0027780734,
          "startups_and_entrepreneurship": 0.0069082182,
          "bicycling": 0.0059417797,
          "travel": 0.0067961995,
          "boxing": 0.0016583061,
          "poetry": 0.0069969686,
          "romance": 0.0016582186000000001,
          "buddhism": 0.0039441045,
          "comedy": 0.0040284593,
          "gaming": 0.0100042377,
          "poker": 0.0034363631,
          "philosophy": 0.0053743273000000005,
          "parenting": 0.0025239752,
          "running": 0.0018119253000000001,
          "climbing": 0.005181257900000001,
          "astronomy": 0.0026800763,
          "archery": 0.0055532252,
          "surfing": 0.0029386283,
          "sports": 0.0037252093000000003,
          "ultimate": 0.0040479814,
          "crafts": 0.0042056738,
          "wine": 0.0036220650000000003
        }
      }
    };
};





meaningcloud.classification = function(){
  return {
      "type": "classification",
      "data": "{\"status\":{\"code\":\"0\",\"msg\":\"OK\",\"credits\":\"1\",\"remaining_credits\":\"39915\"},\"category_list\":[{\"code\":\"Style&Fashion>Fashion\",\"label\":\"Style & Fashion>Fashion\",\"abs_relevance\":\"1\",\"relevance\":\"100\"},{\"code\":\"Education\",\"label\":\"Education\",\"abs_relevance\":\"1\",\"relevance\":\"100\"}]}"
    };
};

meaningcloud.sentiment = function(){
  return {
      "type": "sentiment",
      "data": "{\"status\":{\"code\":\"0\",\"msg\":\"OK\",\"credits\":\"1\",\"remaining_credits\":\"39957\"},\"model\":\"general_en\",\"score_tag\":\"N+\",\"agreement\":\"AGREEMENT\",\"subjectivity\":\"OBJECTIVE\",\"confidence\":\"100\",\"irony\":\"NONIRONIC\",\"sentence_list\":[{\"text\":\"hurry up with my damn croissants\",\"inip\":\"0\",\"endp\":\"31\",\"bop\":\"y\",\"confidence\":\"100\",\"score_tag\":\"N+\",\"agreement\":\"AGREEMENT\",\"segment_list\":[{\"text\":\"hurry up with my damn croissants\",\"segment_type\":\"main\",\"inip\":\"0\",\"endp\":\"31\",\"confidence\":\"100\",\"score_tag\":\"N+\",\"agreement\":\"AGREEMENT\",\"polarity_term_list\":[{\"text\":\"damn\",\"inip\":\"17\",\"endp\":\"20\",\"confidence\":\"100\",\"score_tag\":\"N+\"}]}],\"sentimented_entity_list\":[],\"sentimented_concept_list\":[]}],\"sentimented_entity_list\":[],\"sentimented_concept_list\":[]}"
    };
};

meaningcloud.topics = function(){
  return {
      "type": "topics",
      "data": "{\"status\":{\"code\":\"0\",\"msg\":\"OK\",\"credits\":\"1\",\"remaining_credits\":\"39999\"},\"entity_list\":[],\"concept_list\":[],\"time_expression_list\":[],\"money_expression_list\":[],\"quantity_expression_list\":[],\"other_expression_list\":[],\"quotation_list\":[],\"relation_list\":[]}"
    };
};




export { aylien, rosette, indico, meaningcloud }
