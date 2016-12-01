import React from 'react';
import Message from './message';

class ConvoContainer extends React.Component {
  render(){
    return (
      <div id="convo-container">
        < Message />
        < Message />
        < Message />
      </div>
    )
  }
}

export default ConvoContainer
