
import React from 'react';
import Tooltip from 'react-tooltip';


class IndicoDropdown extends React.Component {

  selectAll(){
    this.props.selectAll('indico');
  }

  unselectAll(){
    this.props.unselectAll('indico');
  }

  toggleSelection(type){
    this.props.toggleSelection('indico', type)
  }

  render(){

    let viewStyle = {};
    if (this.props.api.view){
      viewStyle.display = 'block';
    } else {
      viewStyle.display = 'none';
    }

    return (
      <div className="dropdown" id="indico-dropdown" style={viewStyle} >
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div className="analysis-type-label" data-tip data-for="indico-texttags-tooltip">Text Tags</div>
            < Tooltip class="tooltip-class" id="indico-texttags-tooltip" >
              Produces confidence scores for the correlation between 111 text tags (similar to categories) and your input.
            </ Tooltip >
            <div className="api-checkbox cb3">
              <input
                type="checkbox"
                id="icb-texttags"
                onChange={this.toggleSelection.bind(this, "texttags")}
                checked={this.props.api.types.texttags}
              />
              <label htmlFor="icb-texttags"></label>
             </div>
          </li>
          <li>
            <div className="analysis-type-label" data-tip data-for="indico-sentiment-tooltip">Sentiment</div>
            < Tooltip class="tooltip-class" id="indico-sentiment-tooltip" >
              Produces a sentiment score between 0 and 1 for your input. Above 0.5 indicates positive sentiment, below 0.5 indicates negative sentiment.
            </ Tooltip >
            <div className="api-checkbox cb3">
              <input
                type="checkbox"
                id="icb-sentiment"
                onChange={this.toggleSelection.bind(this, "sentiment")}
                checked={this.props.api.types.sentiment}
              />
              <label htmlFor="icb-sentiment"></label>
             </div>
          </li>
          <li>
            <div className="analysis-type-label" data-tip data-for="indico-personality-tooltip">Personality</div>
            < Tooltip class="tooltip-class" id="indico-personality-tooltip" >
              Produces scores for how strongly your input expresses openness, extraversion, agreeableness, and conscientiousness.
            </ Tooltip >
            <div className="api-checkbox cb3">
              <input
                type="checkbox"
                id="icb-personality"
                onChange={this.toggleSelection.bind(this, "personality")}
                checked={this.props.api.types.personality}
              />
              <label htmlFor="icb-personality"></label>
             </div>
          </li>
          <li>
            <div className="analysis-type-label" data-tip data-for="indico-people-tooltip">People</div>
            < Tooltip class="tooltip-class" id="indico-people-tooltip" >
              Extracts the people referenced in your input.
            </ Tooltip >
            <div className="api-checkbox cb3">
              <input
                type="checkbox"
                id="icb-people"
                onChange={this.toggleSelection.bind(this, "people")}
                checked={this.props.api.types.people}
              />
              <label htmlFor="icb-people"></label>
             </div>
          </li>
          <li>
            <div className="analysis-type-label" data-tip data-for="indico-political-tooltip">Political</div>
            < Tooltip class="tooltip-class" id="indico-political-tooltip" >
              Produces scores that represent the likelihood that your input expresses a leaning to the liberal, green, conservative, and libertarian political affiliations.
            </ Tooltip >
            <div className="api-checkbox cb3">
              <input
                type="checkbox"
                id="icb-political"
                onChange={this.toggleSelection.bind(this, "political")}
                checked={this.props.api.types.political}
              />
              <label htmlFor="icb-political"></label>
             </div>
          </li>
          <li>
            <div className="analysis-type-label" data-tip data-for="indico-emotion-tooltip">Emotion</div>
            < Tooltip class="tooltip-class" id="indico-emotion-tooltip" >
              Produces scores for how much your input expresses anger, joy, fear, surprise, and sadness.
            </ Tooltip >
            <div className="api-checkbox cb3">
              <input
                type="checkbox"
                id="icb-emotion"
                onChange={this.toggleSelection.bind(this, "emotion")}
                checked={this.props.api.types.emotion}
              />
              <label htmlFor="icb-emotion"></label>
             </div>
          </li>
        </ul>
        <div className="un-select-all" onClick={this.selectAll.bind(this)}>
          Select all
        </div>
        <div className="un-select-all" onClick={this.unselectAll.bind(this)}>
          Unselect all
        </div>
      </div>
    )
  }
}

export default IndicoDropdown
