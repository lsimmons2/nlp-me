import React from 'react';

class IndicoMessage extends React.Component {

  render(){

    let successes = null;
    if(this.props.analyses.successes.length){
      successes = this.props.analyses.successes.map(success => {
        if (success.type === 'texttags'){
          return (
            <div key='texttags'>
              <h5>texttags</h5>
            </div>
          )
        }
        if (success.type === 'sentiment'){
          return (
            <div key='sentiment'>
              <h5>Sentiment</h5>
            </div>
          )
        }
        if (success.type === 'personality'){
          return (
            <div key='personality'>
              <h5>personality</h5>
            </div>
          )
        }
        if (success.type === 'people'){
          return (
            <div key='people'>
              <h5>people</h5>
            </div>
          )
        }
        if (success.type === 'political'){
          return (
            <div key='political'>
              <h5>political</h5>
            </div>
          )
        }
        if (success.type === 'emotion'){
          return (
            <div key='emotion'>
              <h5>emotion</h5>
            </div>
          )
        }
      })
    }

    let errors = null;

    return (
      <div className="message indico">
        <div>
          {successes}
        </div>
        <div>
          {errors}
        </div>
      </div>
    )

  }
}

export default IndicoMessage
