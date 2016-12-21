
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
        analyses: action.analyses,
        viewJson: false
      };
      if (action.api === 'indico'){
        message['viewTexttags'] = false;
      }
      return Object.assign({}, convo, {
          isFetching: false,
          messages: [...convo['messages'], message]
        });

    // error in processing
    case 'CHAT_ERROR':
      return convo;

    // no successful analyses from apis
    case 'CHAT_FAIL':
      let failMessage = {
        api: action.api,
        fail: true,
        errors: action.errors
      };
      return Object.assign({}, convo, {
          isFetching: false,
          messages: [...convo['messages'], failMessage]
        });

    case 'TOGGLE_MESSAGE_VIEW':
      return {
        ...convo,
        messages: convo.messages.map(message => {
          if(message.id === action.id){
            return {
              ...message, viewJson: !message.viewJson
            }
          }
          return message;
        })
      };

      case 'TOGGLE_TEXTTAGS_VIEW':
        let ttMessage;
        let i;
        return {
          ...convo,
          messages: convo.messages.map(message => {
            if (message.id === action.id){
              message.viewTexttags = !message.viewTexttags;
            }
            return message;
          })
        }


    default:
      return convo;

  }

}
