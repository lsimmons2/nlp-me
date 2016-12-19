
export default function(convo={}, action){

  switch(action.type){

    case 'CHAT_REQUEST':
      return { ...convo,
        isFetching: true,
        input: ''
      };

    case 'CHAT_SUCCESS':
      let message = {
        api: action.api,
        analyses: action.analyses
      }
      return Object.assign({}, convo, {
          isFetching: false,
          messages: [...convo['messages'], message]
        });

    case 'CHAT_ERROR':
      return convo;

    default:
      return convo;

  }

}
