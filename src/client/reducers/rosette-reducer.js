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

    default:
      return rosette

  }

}
