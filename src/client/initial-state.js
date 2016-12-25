
function ready(){
  for (var type in this.types) {
    if (this.types[type]){
      return true;
    }
  }
  return false;
}

export default {
  feedback: {
    isFetching: false,
    error: false,
    success: false,
    data: {
      name: '',
      email: '',
      message: ''
    }
  },
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
        texttags: false,
        sentiment: false,
        personality: false,
        people: false,
        political: false,
        emotion: false
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
