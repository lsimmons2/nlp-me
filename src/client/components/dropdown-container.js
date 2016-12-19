
import React from 'react';

import AylienDropdown from './aylien/dropdown';
import RosetteDropdown from './rosette/dropdown';
import IndicoDropdown from './indico/dropdown';
import MeaningcloudDropdown from './meaningcloud/dropdown';


class DropdownContainer extends React.Component {
  render(){
    return (
      <div id="dropdown-container">
        < AylienDropdown
          apiName='aylien'
          api={this.props.apis.aylien}
          toggleSelection={this.props.toggleSelection}
        />
        < RosetteDropdown
          apiName='rosette'
          api={this.props.apis.rosette}
          toggleSelection={this.props.toggleSelection}
        />
        < IndicoDropdown
          apiName='indico'
          api={this.props.apis.indico}
          toggleSelection={this.props.toggleSelection}
        />
        < MeaningcloudDropdown
          apiName='meaningcloud'
          api={this.props.apis.meaningcloud}
          toggleSelection={this.props.toggleSelection}
        />
      </div>
    )
  }
}


export default DropdownContainer
