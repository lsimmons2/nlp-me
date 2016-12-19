
let actions = {

  toggleView: function(api){
    let type = api.toUpperCase() + '_TOGGLE_VIEW';
    return {
      type: type,
      api: api
    }
  }

}


export default actions
