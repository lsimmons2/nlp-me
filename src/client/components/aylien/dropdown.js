
import React from 'react';
import Tooltip from 'react-tooltip';


class AylienDropdown extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      classify: false,
      sentiment: false,
      concepts: false,
      hashtags: false
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
      <div className="dropdown" id="aylien-dropdown" style={viewStyle} >
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div data-tip data-for="aylien-classify-tooltip" >Classify</div>
            < Tooltip id="aylien-classify-tooltip" place="right" >
              Produces confidence scores for different categories in your input.
            </ Tooltip >
            <div className="api-checkbox cb1">
              <input
                type="checkbox"
                id="acb-classify"
                onChange={this.setSelection.bind(this, 'classify')}
                defaultChecked={this.state.classify}
              />
              <label htmlFor="acb-classify"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="aylien-sentiment-tooltip">Sentiment</div>
            < Tooltip id="aylien-sentiment-tooltip" place="right" >
              Produces scores for the polarity and subjectivity your input expresses.
            </ Tooltip >
            <div className="api-checkbox cb1">
              <input
                type="checkbox"
                id="acb-sentiment"
                onChange={this.setSelection.bind(this, 'sentiment')}
                defaultChecked={this.state.sentiment}
              />
              <label htmlFor="acb-sentiment"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="aylien-concepts-tooltip">Concepts</div>
            < Tooltip id="aylien-concepts-tooltip" place="right" >
              Extracts different concepts from your input.
            </ Tooltip >
            <div className="api-checkbox cb1">
              <input
                type="checkbox"
                id="acb-concepts"
                onChange={this.setSelection.bind(this, 'concepts')}
                defaultChecked={this.state.concepts}
              />
              <label htmlFor="acb-concepts"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="aylien-hashtags-tooltip">Hashtags</div>
            < Tooltip id="aylien-hashtags-tooltip" place="right" >
              Extracts different hashtags from your input.
            </ Tooltip >
            <div className="api-checkbox cb1">
              <input
                type="checkbox"
                id="acb-hashtags"
                onChange={this.setSelection.bind(this, 'hashtags')}
                defaultChecked={this.state.hashtags}
              />
              <label htmlFor="acb-hashtags"></label>
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

export default AylienDropdown
