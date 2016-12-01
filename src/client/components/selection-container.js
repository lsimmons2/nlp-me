import React from 'react';
import ApiSelection from './api-selection'

class SelectionContainer extends React.Component {
  render(){
    return (
      <div id="selection-container">
        < ApiSelection />
        < ApiSelection />
        < ApiSelection />
        < ApiSelection />
      </div>
    )
  }
}

export default SelectionContainer
