import React from 'react';

class Message extends React.Component {
  render(){
    return (
      <div className="message aylien">

        <img className="avatar" src="/images/aylien-icon.png"/>

        <span className="outer-triangle"> </span>
        <span className="inner-triangle"> </span>

        <div className="message-header">
          Here are my analyses of your input
        </div>

        <div>
          <h5>Sentiment</h5>
        </div>
      </div>
    )
  }
}

export default Message
