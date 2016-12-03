import React from 'react';
import ApiSelection from './api-selection'

class SelectionContainer extends React.Component {

  render(){
    return (
      <div id="selection-container">
        < ApiSelection actions={this.props.actions} api={this.props.aylien} apiName='aylien'/>
        < ApiSelection actions={this.props.actions} api={this.props.rosette} apiName='rosette'/>
        < ApiSelection actions={this.props.actions} api={this.props.indico} apiName='indico'/>
        < ApiSelection actions={this.props.actions} api={this.props.meaningcloud} apiName='meaningcloud'/>
      </div>
    )
  }
}

export default SelectionContainer
