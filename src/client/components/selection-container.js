import React from 'react';
import ApiSelection from './api-selection'

class SelectionContainer extends React.Component {

  toggleView(){
    console.log('sah from component');
  }

  render(){
    return (
      <div id="selection-container">
        < ApiSelection actions={this.props.actions} api={this.props.aylien} apiName='aylien'/>
        < ApiSelection actions={this.props.actions} api='rosette' />
        < ApiSelection actions={this.props.actions} api='indico' />
        < ApiSelection actions={this.props.actions} api='meaningcloud' />
      </div>
    )
  }
}

export default SelectionContainer
