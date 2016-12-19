
import React from 'react';
import Tooltip from 'react-tooltip';


class RosetteDropdown extends React.Component {

  toggleSelection(type){
    this.props.toggleSelection(this.props.apiName, type)
  }

  render(){

    let viewStyle = {};
    if (this.props.api.view){
      viewStyle.display = 'block';
    } else {
      viewStyle.display = 'none';
    }

    return (
      <div className="dropdown" id="rosette-dropdown" style={viewStyle} >
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div data-tip data-for="rosette-categories-tooltip">Categories</div>
            < Tooltip id="rosette-categories-tooltip" >
              Extracts different categories from your input.
            </ Tooltip >
            <div className="api-checkbox cb2">
              <input
                type="checkbox"
                id="rcb-categories"
                onChange={this.toggleSelection.bind(this, 'categories')}
              />
              <label htmlFor="rcb-categories"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="rosette-entities-tooltip">Entities</div>
            < Tooltip id="rosette-entities-tooltip" >
              Extracts different entities from your input.
            </ Tooltip >
            <div className="api-checkbox cb2">
              <input
                type="checkbox"
                id="rcb-entities"
                onChange={this.toggleSelection.bind(this, 'entities')}
              />
              <label htmlFor="rcb-entities"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="rosette-sentiment-tooltip">Sentiment</div>
            < Tooltip id="rosette-sentiment-tooltip" >
              Produces a confidence score for whether the overall sentiment of your input is positive or negative and individual confidence scores for whether each detected entity is correlated with positive or negative sentiment.
            </ Tooltip >
            <div className="api-checkbox cb2">
              <input
                type="checkbox"
                id="rcb-sentiment"
                onChange={this.toggleSelection.bind(this, 'sentiment')}
              />
              <label htmlFor="rcb-sentiment"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="rosette-relationships-tooltip">Relationships</div>
            < Tooltip id="rosette-relationships-tooltip" >
              Detects relationships between different entities in your input.
            </ Tooltip >
            <div className="api-checkbox cb2">
              <input
                type="checkbox"
                id="rcb-relationships"
                onChange={this.toggleSelection.bind(this, 'relationships')}
              />
              <label htmlFor="rcb-relationships"></label>
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

export default RosetteDropdown
