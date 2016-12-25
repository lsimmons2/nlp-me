
import React from 'react'

class UserMessage extends React.Component {
  render(){
    return (
      <div className="user-message-container">
        <div className="message user">
            <span className="outer-triangle"> </span>
            <span className="inner-triangle"> </span>
            <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default UserMessage
