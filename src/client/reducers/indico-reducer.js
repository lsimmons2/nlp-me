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

    case 'INDICO_SELECT_ALL':
      let selectedTypes = {};
      for(let type in indico.types){
        selectedTypes[type] = true;
      }
      return {
        ...indico,
        types: selectedTypes
      }

    case 'INDICO_UNSELECT_ALL':
      let unselectedTypes = {};
      for(let type in indico.types){
        unselectedTypes[type] = false;
      }
      return {
        ...indico,
        types: unselectedTypes
      }


    default:
      return indico

  }

}
