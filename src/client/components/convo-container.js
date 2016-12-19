// aylien - classify, concepts, hashtags
// rosette - categories
//aylien links not working
import React from 'react'

import AylienMessage from './aylien/aylien-message'
import RosetteMessage from './rosette/rosette-message'
import IndicoMessage from './indico/indico-message'
import MeaningcloudMessage from './meaningcloud/meaningcloud-message'

class ConvoContainer extends React.Component {

  render(){

    let messages;
    let count = 0;
    if(this.props.messages.length){
      messages = this.props.messages.map(message => {
        count ++;
        if (message.api === 'aylien'){
          return (
            <AylienMessage
              key={count}
              analyses={message.analyses}
            />
          )
        }
        else if (message.api === 'rosette'){
          return (
            <RosetteMessage
              key={count}
              analyses={message.analyses}
            />
          )
        }
        else if (message.api === 'indico'){
          return (
            <IndicoMessage
              key={count}
              analyses={message.analyses}
            />
          )
        }
        else {
          return (
            <MeaningcloudMessage
              key={count}
              analyses={message.analyses}
            />
          )
        }

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
