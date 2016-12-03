
import React from 'react';

import AylienDropdown from './aylien/dropdown';
import RosetteDropdown from './rosette/dropdown';
import IndicoDropdown from './indico/dropdown';
import MeaningcloudDropdown from './meaningcloud/dropdown';

class DropdownContainer extends React.Component {
  render(){
    return (
      <div id="dropdown-container">
        < AylienDropdown view={this.props.viewChoices.aylien}/>
        < RosetteDropdown view={this.props.viewChoices.rosette}/>
        < IndicoDropdown view={this.props.viewChoices.indico}/>
        < MeaningcloudDropdown view={this.props.viewChoices.meaningcloud}/>
      </div>
    )
  }
}

export default DropdownContainer
