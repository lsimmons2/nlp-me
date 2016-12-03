
import React from 'react';

import SelectionContainer from './selection-container';
import DropdownContainer from './dropdown-container';
import ConvoContainer from './convo-container';
import InputContainer from './input-container';


class ChatBox extends React.Component {
  render(){

    let viewChoices = {};
    if (this.props.aylien.view){
      viewChoices['aylien'] = true;
    } else viewChoices['aylien'] = false;
    if (this.props.rosette.view){
      viewChoices['rosette'] = true;
    } else viewChoices['rosette'] = false;
    if (this.props.indico.view){
      viewChoices['indico'] = true;
    } else viewChoices['indico'] = false;
    if (this.props.meaningcloud.view){
      viewChoices['meaningcloud'] = true;
    } else viewChoices['meaningcloud'] = false;


    return (
      <div id="chat">
        < SelectionContainer actions={this.props.actions} apis={this.props.apis}/>
        < DropdownContainer viewChoices={viewChoices}/>
        < ConvoContainer />
        < InputContainer />
      </div>
    )
  }
}

export default ChatBox
