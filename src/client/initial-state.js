
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
        classify: true,
        sentiment: true,
        concepts: true,
        hashtags: true
      },
    ready: ready
    },
    rosette: {
      view: false,
      types: {
        categories: true,
        sentiment: true,
        entities: true,
        relationships: true
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
        classification: true,
        sentiment: true,
        topics: true
      },
      ready: ready
    }
  }
}
