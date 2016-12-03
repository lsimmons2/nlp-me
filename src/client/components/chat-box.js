
import React from 'react';

import SelectionContainer from './selection-container';
import DropdownContainer from './dropdown-container';
import ConvoContainer from './convo-container';
import InputContainer from './input-container';


class ChatBox extends React.Component {
  render(){

    let viewChoices = {};
    [this.props.aylien].forEach( api => {
      viewChoices['aylien'] = api.view;
    })

    return (
      <div id="chat">
        < SelectionContainer actions={this.props.actions} aylien={this.props.aylien}/>
        < DropdownContainer viewChoices={viewChoices}/>
        < ConvoContainer />
        < InputContainer />
      </div>
    )
  }
}

export default ChatBox
