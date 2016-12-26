
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import SelectionContainer from './selection-container';
import DropdownContainer from './dropdown-container';
import ConvoContainer from './convo-container';
import InputContainer from './input-container';
import * as actions from '../actions';


class Chat extends React.Component {
  render(){

    let viewChoices = {};
    for(let api in this.props.apis){
      viewChoices[api] = this.props.apis[api].view;
    }

    return (
      <div id="chat">
        < SelectionContainer
          toggleView={this.props.actions.toggleDropdownView}
          viewChoices={viewChoices}
        />
        < DropdownContainer
          selectAll={this.props.actions.selectAll}
          unselectAll={this.props.actions.unselectAll}
          toggleSelection={this.props.actions.toggleSelection}
          apis={this.props.apis}
        />
        < ConvoContainer
          messages={this.props.convo.messages}
          toggleMessageView={this.props.actions.toggleMessageView}
          toggleTexttagsView={this.props.actions.toggleTexttagsView}
        />
        < InputContainer
          input={this.props.convo.input}
          updateInput={this.props.actions.updateInput}
          chat={this.props.actions.chat}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
