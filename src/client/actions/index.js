let actions = {

  toggleView: function(api){
    let type = api.toUpperCase() + '_TOGGLE_VIEW';
    return {
      type: type,
      api: api
    }
  }


  // addRight: function(pair){
  //   return {
  //     type: 'GUESSED',
  //     pair: pair
  //   }
  // },
  //
  // addWrong: function(pair){
  //   return {
  //     type: 'GUESSED',
  //     pair: pair
  //   }
  // }

  // addName: function(name){
  //   return {
  //     type: 'ADD_NAME',
  //     name: name
  //   }
  // },
  //
  // completeName: function(id){
  //   return {
  //     type: 'COMPLETE_NAME',
  //     id: id
  //   }
  // },
  //
  // deleteName: function(id){
  //   return {
  //     type: 'DELETE_NAME',
  //     id: id
  //   }
  // },
  //
  // createNewUserId: function(){
  //   return {
  //     type: 'CREATE_USER_ID',
  //     id: Math.round(Math.random()*100)
  //   }
  // },
  //
  // createNewUserIdIfOdd: function(){
  //   return (dispatch, getState) => {
  //     const { user } = getState();
  //     if(user.id % 2 === 0){
  //       return;
  //     }
  //     return dispatch(actions.createNewUserId());
  //   }
  // },
  //
  // createNewUserAsyc(){
  //   return dispatch => {
  //     setTimeout( () => {
  //       dispatch(actions.createNewUserId())
  //     }, 2500)
  //
  //   }
  // }


}

// store.dispatch(addName('some name'))

export default actions
