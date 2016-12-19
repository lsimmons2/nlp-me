import React from 'react';
import Message from './message';

class ConvoContainer extends React.Component {

  render(){

    let messages;
    let count = 0;
    if(this.props.messages.length){
      messages = this.props.messages.map(message => {
        count ++;
        return <Message key={count} analyses={message.analyses} errors={message.errors}/>
      })
    } else {
      messages = <p id="to-begin">To begin, select some of the analyses in the dropdowns above and see what they can figure out about your input.</p>
    }

    return (
      <div id="convo-container">
        {messages}
      </div>
    )
  }
}

export default ConvoContainer
