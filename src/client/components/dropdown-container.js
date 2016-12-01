import React from 'react';
import Dropdown from './dropdown';

class DropdownContainer extends React.Component {
  render(){
    return (
      <div id="dropdown-container">
        < Dropdown />
        < Dropdown />
        < Dropdown />
        < Dropdown />
      </div>
    )
  }
}

export default DropdownContainer
