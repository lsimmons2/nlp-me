
import React from 'react'

class FailMessage extends React.Component {

  renderHeader(){
    return (
      <div>
        <strong>Woops!</strong>
      </div>
    )
  }

  renderErrors(){
    let errorsList = [];
    let errors = this.props.errors;
    for (let i = 0; i < errors.length; i++) {
      errorsList.push(errors[i])
      if(i !== errors.length -1 ){
        errorsList.push(', ');
      }
    }
    return errorsList;
  }

  render(){

    return (
      <div className={'message ' + this.props.api}>

        <span className="outer-triangle"> </span>
        <span className="inner-triangle"> </span>

        <div className="message-header">
          {this.renderHeader()}
        </div>

        <div>
          <p>
            Unluckily none of the analyses you selected could be performed successfully on your input. Please try another input or choose some other analyses.
          </p>
        </div>

        <div>
          <p>
            <strong key='first'>Attempted analyses: </strong>
            {this.renderErrors()}
          </p>
        </div>

      </div>
    )
  }

}

export default FailMessage
