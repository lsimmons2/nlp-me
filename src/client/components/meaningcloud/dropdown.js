
import React from 'react';
import Tooltip from 'react-tooltip';


class MeaningcloudDropdown extends React.Component {

  render(){
    return (
      <div className="dropdown" id="meaningcloud-dropdown">
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div  data-tip data-for="meaningcloud-classification-tooltip">Classification</div>
            < Tooltip id="meaningcloud-classification-tooltip" place="left" >
             Extracts categories in your input.
           </ Tooltip >
            <div className="api-checkbox cb4">
                <input type="checkbox" id="mccb-classification"/>
                <label htmlFor="mccb-classification"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="meaningcloud-sentiment-tooltip">Sentiment</div>
            < Tooltip id="meaningcloud-sentiment-tooltip" place="left" >
             Detects the polarity, subjectivity, irony, and emotional agreement in your input.
           </ Tooltip >
            <div className="api-checkbox cb4">
                <input type="checkbox" id="mccb-sentiment"/>
                <label htmlFor="mccb-sentiment"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="meaningcloud-classification-tooltip">Topics</div>
            < Tooltip id="meaningcloud-classification-tooltip" place="left" >
             Extracts the topics in your input.
           </ Tooltip >
            <div className="api-checkbox cb4">
                <input type="checkbox" id="mccb-topics"/>
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
