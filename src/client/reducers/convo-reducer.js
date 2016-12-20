
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
      }
      return Object.assign({}, convo, {
          isFetching: false,
          messages: [...convo['messages'], message]
        });

    case 'CHAT_ERROR':
      return convo;

    case 'TOGGLE_MESSAGE_VIEW':
      return{
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

    default:
      return convo;

  }

}
