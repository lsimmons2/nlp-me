export default function rosetteReducer(rosette = {}, action){

  switch(action.type){

    case 'ROSETTE_TOGGLE_VIEW':
      return { ...rosette, view: !rosette.view}

    default:
      return rosette

  }

}
