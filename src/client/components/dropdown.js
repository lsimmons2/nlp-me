import React from 'react';

class Dropdown extends React.Component {
  render(){
    return (
      <div className="dropdown" id="aylien-dropdown">
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div tooltip-placement="right" tooltip-className="indico-tooltip" uib-tooltip="Produces confidence scores for different categories in your input.">Classify</div>
            <div className="api-checkbox cb1">
                <input type="checkbox" id="acb-classify" />
                <label htmlFor="acb-classify"></label>
             </div>
          </li>
          <li>
            <div tooltip-placement="right" tooltip-className="indico-tooltip" uib-tooltip="Produces scores for the polarity and subjectivity your input expresses.">Sentiment</div>
            <div className="api-checkbox cb1">
                <input type="checkbox" id="acb-sentiment" />
                <label htmlFor="acb-sentiment"></label>
             </div>
          </li>
          <li>
            <div tooltip-placement="top" tooltip-className="indico-tooltip" uib-tooltip="Extracts different concepts from your input.">Concepts</div>
            <div className="api-checkbox cb1">
                <input type="checkbox" id="acb-concepts" />
                <label htmlFor="acb-concepts"></label>
             </div>
          </li>
          <li>
            <div tooltip-placement="top" tooltip-className="indico-tooltip" uib-tooltip="Extracts different hashtags from your input.">Hashtags</div>
            <div className="api-checkbox cb1">
                <input type="checkbox" id="acb-hashtags" />
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

export default Dropdown
