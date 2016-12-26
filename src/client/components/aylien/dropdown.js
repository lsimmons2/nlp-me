
import React from 'react';
import Tooltip from 'react-tooltip';


class AylienDropdown extends React.Component {

  selectAll(){
    this.props.selectAll('aylien');
  }

  unselectAll(){
    this.props.unselectAll('aylien');
  }

  toggleSelection(type){
    this.props.toggleSelection('aylien', type)
  }

  render(){

    let viewStyle = {};
    if (this.props.api.view){
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
                onChange={this.toggleSelection.bind(this, 'classify')}
                checked={this.props.api.types.classify}
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
                onChange={this.toggleSelection.bind(this, 'sentiment')}
                checked={this.props.api.types.sentiment}
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
                onChange={this.toggleSelection.bind(this, 'concepts')}
                checked={this.props.api.types.concepts}
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
                onChange={this.toggleSelection.bind(this, 'hashtags')}
                checked={this.props.api.types.hashtags}
              />
              <label htmlFor="acb-hashtags"></label>
            </div>
          </li>
        </ul>
        <div className="un-select-all" onClick={this.selectAll.bind(this)} >
          Select all
        </div>
        <div className="un-select-all" onClick={this.unselectAll.bind(this)} >
          Unselect all
        </div>
      </div>
    )
  }
}

export default AylienDropdown
