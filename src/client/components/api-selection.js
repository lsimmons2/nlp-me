import React from 'react';

class ApiSelection extends React.Component {

  constructor(props){
    super(props);
  }

  toggleView(){
    console.log('sah from component');
    this.props.actions.toggleView(this.props.api);
  }

  render(){

    let apiSelectionElement;
    if (this.props.apiName === 'aylien'){
      apiSelectionElement = (
        <div className="api-selection" id={ this.props.apiName + "-selection" }>
          <img className="api-logo" src={"images/aylien-icon.png"}/>
          <span id="aylien-logo-text">AYLIEN</span>
          <span className="glyphicon glyphicon-chevron-down dropdown-toggle"></span>
          <span className="glyphicon glyphicon-chevron-up dropdown-toggle"></span>
        </div>
      )
    } else {
      apiSelectionElement = (
        <div className="api-selection" id={ this.props.api + "-selection" }>
          <img className="api-logo" src={"images/" + this.props.api + "-logo.png"}/>
          <span className="glyphicon glyphicon-chevron-down dropdown-toggle"></span>
          <span className="glyphicon glyphicon-chevron-up dropdown-toggle"></span>
        </div>
      )
    }

    return (
      <div className="api-selection-container" onClick={this.toggleView.bind(this)}>
        {apiSelectionElement}
      </div>
    )
  }
}

export default ApiSelection
