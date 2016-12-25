
import React from 'react'

import FeedbackFetching from './feedback-fetching'
import FeedbackSuccess from './feedback-success'
import FeedbackError from './feedback-error'

class Feedback extends React.Component {

  handleChange(input, event){
    let data = this.props.feedback.data;
    data[input] = event.target.value;
    this.props.updateFeedback(data)
  }

  sendFeedback(event){
    event.preventDefault();
    this.props.sendFeedback();
  }

  render(){

    let status;
    if (this.props.feedback.isFetching){
      status = <FeedbackFetching/>
    } else if (this.props.feedback.error){
      status = <FeedbackError/>
    } else if (this.props.feedback.success){
      status = <FeedbackSuccess/>
    } else {
      status = null;
    }

    return (
      <div id="feedback" className="row">

        <div className="col-xs-12">

          <h3>Feedback</h3>
          <p>Would love to hear feedback anyone has for the app. Feel free to reach out below or on <a href="http://leosimmons.me" target="_blank">my website</a>. Source code <a href="https://github.com/lsimmons2/nlp-app" target="_blank">here</a>.
          </p>

        </div>

        <div className="col-xs-12">

          <form name="contactForm">
            <div className="form-group">
              <input
                onChange={this.handleChange.bind(this, 'name')}
                value={this.props.feedback.data.name}
                className="form-control"
                placeholder="Name" type="text"
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange.bind(this, 'email')}
                value={this.props.feedback.data.email}
                className="form-control"
                placeholder="Email" type="text"
              />
            </div>
            <div className="form-group">
              <textarea
                onChange={this.handleChange.bind(this, 'message')}
                value={this.props.feedback.data.message}
                className="form-control"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="form-group">
              <div id="submit-container">
                <input
                  onClick={this.sendFeedback.bind(this)}
                  className="form-control btn"
                  type="submit" value="Send"
                />
              </div>
            </div>
          </form>


          {status}


        </div>

      </div>
    )
  }

}

export default Feedback
