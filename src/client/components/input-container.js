
import React from 'react';

class InputContainer extends React.Component {

  constructor(props){
    super(props);
    this.props.chat();
  }

  chat(event){
    event.preventDefault();
    this.props.chat();
  }

  render(){
    return (
      <div id="input-container">
        <form onSubmit={this.chat.bind(this)}>
          <input type="text"/>
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default InputContainer
