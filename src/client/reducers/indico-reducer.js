export default function indicoReducer(indico = {}, action){

  switch(action.type){

    case 'INDICO_TOGGLE_VIEW':
      return { ...indico, view: !indico.view}

    default:
      return indico

  }

}
