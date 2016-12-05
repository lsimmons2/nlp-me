
import React from 'react';

import SelectionContainer from './selection-container';
import DropdownContainer from './dropdown-container';
import ConvoContainer from './convo-container';
import InputContainer from './input-container';


class ChatBox extends React.Component {
  render(){

    let viewChoices = {};
    for(let api in this.props.apis){
      viewChoices[api] = this.props.apis[api].view;
    }

    return (
      <div id="chat">
        < SelectionContainer
          actions={this.props.actions}
          viewChoices={viewChoices}
        />
        < DropdownContainer
          viewChoices={viewChoices}
        />
        < ConvoContainer />
        < InputContainer />
      </div>
    )
  }
}

export default ChatBox
