
import React from 'react';
import Tooltip from 'react-tooltip';


class IndicoDropdown extends React.Component {

  render(){

    let viewStyle = {};
    if (this.props.view){
      viewStyle.display = 'block';
    } else {
      viewStyle.display = 'none';
    }

    return (
      <div className="dropdown" id="indico-dropdown" style={viewStyle} >
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div data-tip data-for="indico-texttags-tooltip">Text Tags</div>
            < Tooltip id="indico-texttags-tooltip" >
              Produces confidence scores for the correlation between 111 text tags (similar to categories) and your input.
            </ Tooltip >
            <div className="api-checkbox cb3">
                <input type="checkbox" id="icb-texttags"/>
                <label htmlFor="icb-texttags"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="indico-sentiment-tooltip">Sentiment</div>
            < Tooltip id="indico-sentiment-tooltip" >
              Produces a sentiment score between 0 and 1 for your input. Above 0.5 indicates positive sentiment, below 0.5 indicates negative sentiment.
            </ Tooltip >
            <div className="api-checkbox cb3">
                <input type="checkbox" id="icb-sentiment"/>
                <label htmlFor="icb-sentiment"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="indico-personality-tooltip">Personality</div>
            < Tooltip id="indico-personality-tooltip" >
              Produces scores for how strongly your input expresses openness, extraversion, agreeableness, and conscientiousness.
            </ Tooltip >
            <div className="api-checkbox cb3">
                <input type="checkbox" id="icb-personality"/>
                <label htmlFor="icb-personality"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="indico-people-tooltip">People</div>
            < Tooltip id="indico-people-tooltip" >
              Extracts the people referenced in your input.
            </ Tooltip >
            <div className="api-checkbox cb3">
                <input type="checkbox" id="icb-people"/>
                <label htmlFor="icb-people"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="indico-political-tooltip">Political</div>
            < Tooltip id="indico-political-tooltip" >
              Produces scores that represent the likelihood that your input expresses a leaning to the liberal, green, conservative, and libertarian political affiliations.
            </ Tooltip >
            <div className="api-checkbox cb3">
                <input type="checkbox" id="icb-political"/>
                <label htmlFor="icb-political"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="indico-emotion-tooltip">Emotion</div>
            < Tooltip id="indico-emotion-tooltip" >
              Produces scores for how much your input expresses anger, joy, fear, surprise, and sadness.
            </ Tooltip >
            <div className="api-checkbox cb3">
                <input type="checkbox" id="icb-emotion"/>
                <label htmlFor="icb-emotion"></label>
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

export default IndicoDropdown
