
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
          selectAll={this.props.selectAll}
          unselectAll={this.props.unselectAll}
          toggleSelection={this.props.toggleSelection}
        />
        < RosetteDropdown
          apiName='rosette'
          api={this.props.apis.rosette}
          selectAll={this.props.selectAll}
          unselectAll={this.props.unselectAll}
          toggleSelection={this.props.toggleSelection}
        />
        < IndicoDropdown
          apiName='indico'
          api={this.props.apis.indico}
          selectAll={this.props.selectAll}
          unselectAll={this.props.unselectAll}
          toggleSelection={this.props.toggleSelection}
        />
        < MeaningcloudDropdown
          apiName='meaningcloud'
          api={this.props.apis.meaningcloud}
          selectAll={this.props.selectAll}
          unselectAll={this.props.unselectAll}
          toggleSelection={this.props.toggleSelection}
        />
      </div>
    )
  }
}


export default DropdownContainer
