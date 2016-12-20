
function ready(){
  for (var type in this.types) {
    if (this.types[type]){
      return true;
    }
  }
  return false;
}

export default {
  convo: {
    input: '',
    isFetching: false,
    messages: []
  },
  apis: {
    aylien: {
      view: false,
      types: {
        classify: false,
        sentiment: false,
        concepts: false,
        hashtags: false
      },
    ready: ready
    },
    rosette: {
      view: false,
      types: {
        categories: false,
        sentiment: false,
        entities: false,
        relationships: false
      },
      ready: ready
    },
    indico: {
      view: false,
      types: {
        texttags: true,
        sentiment: true,
        personality: true,
        people: true,
        political: true,
        emotion: true
      },
      ready: ready
    },
    meaningcloud: {
      view: false,
      types: {
        classification: false,
        sentiment: false,
        topics: false
      },
      ready: ready
    }
  }
}
