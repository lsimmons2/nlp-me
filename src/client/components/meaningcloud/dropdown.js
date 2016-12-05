
import React from 'react';
import Tooltip from 'react-tooltip';


class MeaningcloudDropdown extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classification: false,
      sentiment: false,
      topics: false
    }
  }

  setSelection(type, e){
    let update = {};
    update[type] = e.target.checked;
    this.setState(update);
  }

  render(){

    let viewStyle = {};
    if (this.props.view){
      viewStyle.display = 'block';
    } else {
      viewStyle.display = 'none';
    }

    return (
      <div className="dropdown" id="meaningcloud-dropdown" style={viewStyle} >
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div  data-tip data-for="meaningcloud-classification-tooltip">Classification</div>
            < Tooltip id="meaningcloud-classification-tooltip" place="left" >
             Extracts categories in your input.
           </ Tooltip >
            <div className="api-checkbox cb4">
                <input
                  type="checkbox"
                  id="mccb-classification"
                  onChange={this.setSelection.bind(this, 'classification')}
                  defaultChecked={this.state.classification}
                />
                <label htmlFor="mccb-classification"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="meaningcloud-sentiment-tooltip">Sentiment</div>
            < Tooltip id="meaningcloud-sentiment-tooltip" place="left" >
             Detects the polarity, subjectivity, irony, and emotional agreement in your input.
           </ Tooltip >
            <div className="api-checkbox cb4">
                <input
                  type="checkbox"
                  id="mccb-sentiment"
                  onChange={this.setSelection.bind(this, 'sentiment')}
                  defaultChecked={this.state.sentiment}
                />
                <label htmlFor="mccb-sentiment"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="meaningcloud-topics-tooltip">Topics</div>
            < Tooltip id="meaningcloud-topics-tooltip" place="left" >
             Extracts the topics in your input.
           </ Tooltip >
            <div className="api-checkbox cb4">
                <input
                  type="checkbox"
                  id="mccb-topics"
                  onChange={this.setSelection.bind(this, 'topics')}
                  defaultChecked={this.state.topics}
                />
                <label htmlFor="mccb-topics"></label>
             </div>
          </li>
          <li>
            <div>
              &nbsp;
            </div>
          </li>
        </ul>
        <div className="un-select-all">
          Select all
        </div>
        <div className="un-select-all">
          Unselect all
        </div>
      </div>
    )
  }
}

export default MeaningcloudDropdown
