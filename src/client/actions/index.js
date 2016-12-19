
let actions = {

  toggleView: function(api){
    let toggleViewType = api.toUpperCase() + '_TOGGLE_VIEW';
    return {
      type: toggleViewType
    }
  },

  toggleSelection: function(api, analysisType){
    let toggleSelectionType = api.toUpperCase() + '_TOGGLE_SELECTION';
    return {
      type: toggleSelectionType,
      analysisType
    }
  }

}


export default actions
