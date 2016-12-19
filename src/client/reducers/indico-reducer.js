export default function indicoReducer(indico = {}, action){

  switch(action.type){

    case 'INDICO_TOGGLE_VIEW':
      return { ...indico, view: !indico.view}

    case 'INDICO_TOGGLE_SELECTION':
      let analysisType = action.analysisType;
      return {
        ...indico,
        types: {
          ...indico.types,
          [analysisType]: !indico.types[analysisType]
        }
      }

    default:
      return indico

  }

}
