
import React from 'react'

import UserMessage from './user-message'
import AylienMessage from './aylien/aylien-message'
import RosetteMessage from './rosette/rosette-message'
import IndicoMessage from './indico/indico-message'
import MeaningcloudMessage from './meaningcloud/meaningcloud-message'
import FailMessage from './fail-message'

class ConvoContainer extends React.Component {

  componentWillUpdate() {
    this.convoLength = this.props.messages.length;
  }

  componentDidUpdate() {
    if (this.convoLength < this.props.messages.length) {
      let node = this.refs.convo;
      node.scrollTop = node.scrollHeight
    }
  }

  onMouseOver(){
    document.body.style.overflow='hidden';
  }

  onMouseOut(){
    document.body.style.overflow='auto';
  }

  render(){

    let messages;
    if(this.props.messages.length){
      messages = this.props.messages.map((message, index) => {
        message.id = index;
        if (message.fail){
          return (
            <FailMessage
              key={index.toString()}
              api={message.api}
              errors={message.errors}
            />
          )
        }
        if (message.user){
          return (
            <UserMessage
              key={index.toString()}
              text={message.text}
            />
          )
        }
        if (message.api === 'aylien'){
          return (
            <AylienMessage
              key={index.toString()}
              id={index}
              analyses={message.analyses}
              viewJson={message.viewJson}
              toggleMessageView={this.props.toggleMessageView}
            />
          )
        }
        if (message.api === 'rosette'){
          return (
            <RosetteMessage
              key={index.toString()}
              id={index}
              analyses={message.analyses}
              viewJson={message.viewJson}
              toggleMessageView={this.props.toggleMessageView}
            />
          )
        }
        if (message.api === 'indico'){
          return (
            <IndicoMessage
              key={index.toString()}
              id={index}
              analyses={message.analyses}
              viewJson={message.viewJson}
              viewTexttags={message.viewTexttags}
              toggleMessageView={this.props.toggleMessageView}
              toggleTexttagsView={this.props.toggleTexttagsView}
            />
          )
        }
        if (message.api === 'meaningcloud'){
          return (
            <MeaningcloudMessage
              key={index.toString()}
              id={index}
              analyses={message.analyses}
              viewJson={message.viewJson}
              toggleMessageView={this.props.toggleMessageView}
            />
          )
        }

      })
    } else {
      messages = <p id="to-begin">To begin, select some of the analyses in the dropdowns above and see what they can figure out about your input.</p>
    }

    return (
      <div
        id="convo-container"
        ref="convo"
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}>
        {messages}
      </div>
    )
  }
}

export default ConvoContainer
