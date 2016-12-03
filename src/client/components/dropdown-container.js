
import React from 'react';

import AylienDropdown from './aylien/dropdown';
import RosetteDropdown from './rosette/dropdown';
import IndicoDropdown from './indico/dropdown';
import MeaningcloudDropdown from './meaningcloud/dropdown';

class DropdownContainer extends React.Component {
  render(){
    return (
      <div id="dropdown-container">
        < AylienDropdown />
        < RosetteDropdown />
        < IndicoDropdown />
        < MeaningcloudDropdown />
      </div>
    )
  }
}

export default DropdownContainer
