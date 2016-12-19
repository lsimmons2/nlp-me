
// import * as format from '../format'


export default function(convo={}, action){

  switch(action.type){

    case 'CHAT_REQUEST':
      return { ...convo,
        isFetching: true,
        input: ''
      };

    case 'CHAT_SUCCESS':
      // format[action.api](action.data);
      // console.log(action.data);
      console.log(action.api);
      console.log(action.message);
      return { ...convo,
        messages: [...convo['messages'], action.message]
      };
      // return convo;

    case 'CHAT_ERROR':
      return convo;

    default:
      return convo;

  }

}
