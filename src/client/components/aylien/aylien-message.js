
import React from 'react';

class AylienMessage extends React.Component {

  render(){

    let successes = null;
    if(this.props.analyses.successes.length){
      successes = this.props.analyses.successes.map(success => {
        if (success.type === 'classify'){
          return (
            <div key='classify'>
              <h5>Classify</h5>
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
        if (success.type === 'concepts'){
          return (
            <div key='concepts'>
              <h5>Concepts</h5>
            </div>
          )
        }
        if (success.type === 'hashtags'){
          return (
            <div key='hashtags'>
              <h5>Hashtags</h5>
            </div>
          )
        }
      })
    }

    let errors = null;

    return (
      <div className="message aylien">
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

export default AylienMessage
