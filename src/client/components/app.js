
import React from 'react'
import { Router, Route, IndexRedirect, Redirect, browserHistory } from 'react-router'

import Chat from './chat'
import About from './about-page'
import Nav from './nav'


class App extends React.Component {

  render(){
    return (
      <Router key={Math.random()} history={browserHistory}>
        <Route path='/' component={Nav}>
          <IndexRedirect to='/about'/>
          <Route name='about' path='/about' component={About}/>
          <Route name='chat' path='/chat' component={Chat}/>
          <Redirect from='*' to='/about'/>
        </Route>
      </Router>
    )
  }
}

export default App
