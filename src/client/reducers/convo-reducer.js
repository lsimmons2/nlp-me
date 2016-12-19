
export default function(convo={}, action){

  switch(action.type){

    case 'CHAT_REQUEST':
      return { ...convo,
        isFetching: true,
        input: ''
      }

    case 'CHAT_SUCCESS':
      return convo;

    case 'CHAT_ERROR':
      return convo;

    default:
      return convo;

  }

}
