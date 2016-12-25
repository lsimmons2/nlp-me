
import React from 'react';

class InputContainer extends React.Component {

  // constructor(props){
  //   super(props);
  //   this.props.chat();
  // }

  handleChange(event){
    this.props.updateInput(event.target.value);
  }

  chat(event){
    event.preventDefault();
    this.props.chat();
  }

  render(){
    return (
      <div id="input-container">
        <form onSubmit={this.chat.bind(this)}>
          <input
            value={this.props.input}
            onChange={this.handleChange.bind(this)}
            type="text"
          />
          <button onClick={this.chat.bind(this)} type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default InputContainer
