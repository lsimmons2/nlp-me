export default function aylienReducer(aylien = {}, action){

  switch(action.type){

    case 'AYLIEN_TOGGLE_VIEW':
      return { ...aylien, view: !aylien.view}

    default:
      return aylien

  }

}
