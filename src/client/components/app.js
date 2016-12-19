
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Chat from './chat'
import About from './about-page'


class App extends React.Component {

  render(){
    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={About} />
          <Route name='about' path='/about' component={About}/>
          <Route name='chat' path='/chat' component={Chat}/>
        </Route>
      </Router>
    )
  }
}

export default App
