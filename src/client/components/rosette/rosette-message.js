
import React from 'react';

class RosetteMessage extends React.Component {

  render(){
    let successes = null;
    if(this.props.analyses.successes.length){
      successes = this.props.analyses.successes.map(success => {
        if (success.type === 'categories'){
          return (
            <div key='categories'>
              <h5>categories</h5>
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
        if (success.type === 'entities'){
          return (
            <div key='entities'>
              <h5>entities</h5>
            </div>
          )
        }
        if (success.type === 'relationships'){
          return (
            <div key='relationships'>
              <h5>relationships</h5>
            </div>
          )
        }
      })
    }

    let errors = null;

    return (
      <div className="message rosette">
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

export default RosetteMessage
