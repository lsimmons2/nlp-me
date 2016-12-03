export default function aylienReducer(aylien = {}, action){

  switch(action.type){

    case 'AYLIEN_TOGGLE_VIEW':
      return { ...aylien, view: !aylien.view}

    default:
      return aylien

  }

}



//
// let rightReducer = function(right = [], action) {
//
//   switch (action.type){
//
//     case 'GUESSED':
//       return [
//         action.pair, ...right
//       ]
//
//     default:
//       return right;
//
//   }
//
// }
//
// export default rightReducer
