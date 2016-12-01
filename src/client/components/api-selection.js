import React from 'react';

class ApiSelection extends React.Component {
  render(){
    return (
      <div className="api-selection-container">
        <div className="api-selection" id="aylien-selection">
          <img className="api-logo" src="images/aylien-icon.png"/>
          <span id="aylien-logo-text">AYLIEN</span>
          <span className="glyphicon glyphicon-chevron-down dropdown-toggle"></span>
          <span className="glyphicon glyphicon-chevron-up dropdown-toggle"></span>
        </div>
      </div>
    )
  }
}

export default ApiSelection
