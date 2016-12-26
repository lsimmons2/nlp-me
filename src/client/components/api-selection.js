import React from 'react';

class ApiSelection extends React.Component {

  toggleView(){
    this.props.toggleView(this.props.apiName);
  }

  render(){

    let arrowElement;
    if (this.props.view){
      arrowElement = <span className="glyphicon glyphicon-chevron-up dropdown-toggle"></span>
    } else {
      arrowElement = <span className="glyphicon glyphicon-chevron-down dropdown-toggle"></span>
    }

    let apiSelectionElement;
    if (this.props.apiName === 'aylien'){
      apiSelectionElement = (
        <div className="api-selection" id={ this.props.apiName + "-selection" }>
          <img className="selection-logo" src="images/aylien-icon.png"/>
          <span className="selection-logo" id="aylien-logo-text">AYLIEN</span>
          <img className="selection-icon" src="images/aylien-icon.png"/>
          {arrowElement}
        </div>
      )
    } else {
      apiSelectionElement = (
        <div className="api-selection" id={ this.props.apiName + "-selection" }>
          <img
            className="selection-logo"
            src={"images/" + this.props.apiName + "-logo.png"}
          />
          <img
            className="selection-icon"
            src={"images/" + this.props.apiName + "-icon.png"}
          />
          {arrowElement}
        </div>
      )
    }

    return (
      <div
        className="api-selection-container"
        id={this.props.apiName + "-selection-container"}
        onClick={this.toggleView.bind(this)}
      >
        {apiSelectionElement}
      </div>
    )
  }
}

export default ApiSelection
