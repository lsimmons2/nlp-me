import React from 'react';
import Message from './message';

class ConvoContainer extends React.Component {
  render(){
    return (
      <div id="convo-container">
        <p id="to-begin">To begin, select some of the analyses in the dropdowns above and see what they can figure out about your input.</p>
        < Message />
        < Message />
        < Message />
      </div>
    )
  }
}

export default ConvoContainer
