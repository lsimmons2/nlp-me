
const defFeedback = {
  isFetching: false,
  error: false,
  success: false,
  data: {
    name: '',
    email: '',
    message: ''
  }
}

export default function(feedback=defFeedback, action){

  switch(action.type){

    case 'UPDATE_FEEDBACK':
      return {
        ...feedback,
        data: action.data
      }

    case 'FEEDBACK_REQUEST':
      return {
        ...feedback,
        isFetching: true,
        data: {
          name: '',
          email: '',
          message: ''
        }
      };

    case 'FEEDBACK_SUCCESS':
      return {
        ...feedback,
        isFetching: false,
        success: true
      }

    case 'FEEDBACK_ERROR':
      return {
        ...feedback,
        isFetching: false,
        error: true
      }

    default:
      return feedback;
  }

}
