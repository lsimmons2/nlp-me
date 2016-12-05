import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChatBox from './chat-box';
import AboutPage from './about-page';
import actions from '../actions';
import '../style/main.scss';

// class App extends React.Component {
//   render() {
//     return (
//       <Router history={hashHistory}>
//         <Route path='/' component={AboutPage} />
//         <Route path='/about' component={AboutPage} />
//         <Route path='/chat' component={ChatBox} />
//       </Router>
//     )
//   }
// }

class App extends React.Component {

  render(){
    return (
      < ChatBox
        actions={this.props.actions}
        apis={this.props.apis}
      />
    )
  }
}


function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
