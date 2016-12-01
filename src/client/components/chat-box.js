import React from 'react';
import SelectionContainer from './selection-container';
import DropdownContainer from './dropdown-container';
import ConvoContainer from './convo-container';

class ChatBox extends React.Component {
  render(){
    return (
      <div id="chat">
        < SelectionContainer />
        < DropdownContainer />
        < ConvoContainer />
      </div>
    )
  }
}

export default ChatBox
