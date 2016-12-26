
import React from 'react';
import Tooltip from 'react-tooltip';


class MeaningcloudDropdown extends React.Component {

  selectAll(){
    this.props.selectAll('meaningcloud');
  }

  unselectAll(){
    this.props.unselectAll('meaningcloud');
  }

  toggleSelection(type){
    this.props.toggleSelection('meaningcloud', type)
  }

  render(){

    let viewStyle = {};
    if (this.props.api.view){
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
                  onChange={this.toggleSelection.bind(this, 'classification')}
                  checked={this.props.api.types.classification}
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
                  onChange={this.toggleSelection.bind(this, 'sentiment')}
                  checked={this.props.api.types.sentiment}
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
                  onChange={this.toggleSelection.bind(this, 'topics')}
                  checked={this.props.api.types.topics}
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

export default MeaningcloudDropdown
