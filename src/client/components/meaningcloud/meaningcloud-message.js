import React from 'react';

class MeaningcloudMessage extends React.Component {

  render(){

    let successes = null;
    if(this.props.analyses.successes.length){
      successes = this.props.analyses.successes.map(success => {
        if (success.type === 'classify'){
          return (
            <div key='classification'>
              <h5>classification</h5>
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
        if (success.type === 'topics'){
          return (
            <div key='topics'>
              <h5>topics</h5>
            </div>
          )
        }
      })
    }

    let errors = null;

    return (
      <div className="message meaningcloud">
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

export default MeaningcloudMessage
