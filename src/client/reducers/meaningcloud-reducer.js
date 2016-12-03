export default function meaningcloudReducer(meaningcloud = {}, action){

  switch(action.type){

    case 'MEANINGCLOUD_TOGGLE_VIEW':
      return { ...meaningcloud, view: !meaningcloud.view}

    default:
      return meaningcloud

  }

}
