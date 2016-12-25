
import React from 'react'

class FeedbackError extends React.Component {

  render(){

    return (

      <p id="feedback-error" >
        <span className="glyphicon glyphicon-remove"></span>
        Woops! Something went wrong submitting your feedback. Would appreciate it if you could email me at leooscar.simmons@gmail.com. Thanks!
      </p>
    )

  }

}

export default FeedbackError
