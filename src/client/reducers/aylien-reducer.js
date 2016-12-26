export default function aylienReducer(aylien = {}, action){

  switch(action.type){

    case 'AYLIEN_TOGGLE_VIEW':
      return { ...aylien, view: !aylien.view}

    case 'AYLIEN_TOGGLE_SELECTION':
      let analysisType = action.analysisType;
      return {
        ...aylien,
        types: {
          ...aylien.types,
          [analysisType]: !aylien.types[analysisType]
        }
      }

    case 'AYLIEN_SELECT_ALL':
      let selectedTypes = {};
      for(let type in aylien.types){
        selectedTypes[type] = true;
      }
      return {
        ...aylien,
        types: selectedTypes
      }

    case 'AYLIEN_UNSELECT_ALL':
      let unselectedTypes = {};
      for(let type in aylien.types){
        unselectedTypes[type] = false;
      }
      return {
        ...aylien,
        types: unselectedTypes
      }

    default:
      return aylien

  }

}
