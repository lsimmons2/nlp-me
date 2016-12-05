import React from 'react';

class ApiSelection extends React.Component {

  constructor(props){
    super(props);
  }

  toggleView(){
    this.props.actions.toggleView(this.props.apiName);
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
          <img className="api-logo" src={"images/aylien-icon.png"}/>
          <span id="aylien-logo-text">AYLIEN</span>
          {arrowElement}
        </div>
      )
    } else {
      apiSelectionElement = (
        <div className="api-selection" id={ this.props.apiName + "-selection" }>
          <img className="api-logo" src={"images/" + this.props.apiName + "-logo.png"}/>
          {arrowElement}
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
