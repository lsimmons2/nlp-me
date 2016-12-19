import React from 'react';
import ApiSelection from './api-selection'

class SelectionContainer extends React.Component {

  render(){
    return (
      <div id="selection-container">
        < ApiSelection
          toggleView={this.props.toggleView}
          view={this.props.viewChoices.aylien}
          apiName='aylien'
        />
        < ApiSelection
          toggleView={this.props.toggleView}
          view={this.props.viewChoices.rosette}
          apiName='rosette'
        />
        < ApiSelection
          toggleView={this.props.toggleView}
          view={this.props.viewChoices.indico}
          apiName='indico'
        />
        < ApiSelection
          toggleView={this.props.toggleView}
          view={this.props.viewChoices.meaningcloud}
          apiName='meaningcloud'
        />
      </div>
    )
  }
}

export default SelectionContainer
