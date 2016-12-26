export default function rosetteReducer(rosette = {}, action){

  switch(action.type){

    case 'ROSETTE_TOGGLE_VIEW':
      return { ...rosette, view: !rosette.view}

    case 'ROSETTE_TOGGLE_SELECTION':
      let analysisType = action.analysisType;
      return {
        ...rosette,
        types: {
          ...rosette.types,
          [analysisType]: !rosette.types[analysisType]
        }
      }

    case 'ROSETTE_SELECT_ALL':
      let selectedTypes = {};
      for(let type in rosette.types){
        selectedTypes[type] = true;
      }
      return {
        ...rosette,
        types: selectedTypes
      }

    case 'ROSETTE_UNSELECT_ALL':
      let unselectedTypes = {};
      for(let type in rosette.types){
        unselectedTypes[type] = false;
      }
      return {
        ...rosette,
        types: unselectedTypes
      }


    default:
      return rosette

  }

}
