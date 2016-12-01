import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ChatBox from './chat-box';
import AboutPage from './about-page';
import '../style/main.scss';


class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={AboutPage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/chat' component={ChatBox} />
      </Router>
    )
  }
}


export default App
