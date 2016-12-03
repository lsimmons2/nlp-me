
import React from 'react';

class InputContainer extends React.Component {
  render(){
    return (
      <div id="input-container">
        <form>
          <input type="text"/>
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default InputContainer
