import React from 'react';
import ApiSelection from './api-selection'

class SelectionContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="selection-container">
        < ApiSelection
          actions={this.props.actions}
          view={this.props.viewChoices.aylien}
          apiName='aylien'
        />
        < ApiSelection
          actions={this.props.actions}
          view={this.props.viewChoices.rosette}
          apiName='rosette'
        />
        < ApiSelection
          actions={this.props.actions}
          view={this.props.viewChoices.indico}
          apiName='indico'
        />
        < ApiSelection
          actions={this.props.actions}
          view={this.props.viewChoices.meaningcloud}
          apiName='meaningcloud'
        />
      </div>
    )
  }
}

export default SelectionContainer
