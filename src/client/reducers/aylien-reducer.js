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

    default:
      return aylien

  }

}
