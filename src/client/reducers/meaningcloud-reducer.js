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

    default:
      return meaningcloud

  }

}
