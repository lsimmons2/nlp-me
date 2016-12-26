export default function meaningcloudReducer(meaningcloud = {}, action){

  switch(action.type){

    case 'MEANINGCLOUD_TOGGLE_VIEW':
      return { ...meaningcloud, view: !meaningcloud.view}

    case 'MEANINGCLOUD_TOGGLE_SELECTION':
      let analysisType = action.analysisType;
      return {
        ...meaningcloud,
        types: {
          ...meaningcloud.types,
          [analysisType]: !meaningcloud.types[analysisType]
        }
      }

    case 'MEANINGCLOUD_SELECT_ALL':
      let selectedTypes = {};
      for(let type in meaningcloud.types){
        selectedTypes[type] = true;
      }
      return {
        ...meaningcloud,
        types: selectedTypes
      }

    case 'MEANINGCLOUD_UNSELECT_ALL':
      let unselectedTypes = {};
      for(let type in meaningcloud.types){
        unselectedTypes[type] = false;
      }
      return {
        ...meaningcloud,
        types: unselectedTypes
      }


    default:
      return meaningcloud

  }

}
