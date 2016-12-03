
import React from 'react';
import Tooltip from 'react-tooltip';


class AylienDropdown extends React.Component {

  render(){
    return (
      <div className="dropdown" id="aylien-dropdown">
        <h3 className="dropdown-header">Analysis Options</h3>
        <ul className="api-types-list">
          <li>
            <div data-tip data-for="aylien-classify-tooltip" >Classify</div>
            < Tooltip id="aylien-classify-tooltip" place="right" >
              Produces confidence scores for different categories in your input.
            </ Tooltip >
            <div className="api-checkbox cb1">
                <input type="checkbox" id="acb-classify" />
                <label htmlFor="acb-classify"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="aylien-sentiment-tooltip">Sentiment</div>
            < Tooltip id="aylien-sentiment-tooltip" place="right" >
              Produces scores for the polarity and subjectivity your input expresses.
            </ Tooltip >
            <div className="api-checkbox cb1">
                <input type="checkbox" id="acb-sentiment" />
                <label htmlFor="acb-sentiment"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="aylien-concepts-tooltip">Concepts</div>
            < Tooltip id="aylien-concepts-tooltip" place="right" >
              Extracts different concepts from your input.
            </ Tooltip >
            <div className="api-checkbox cb1">
                <input type="checkbox" id="acb-concepts" />
                <label htmlFor="acb-concepts"></label>
             </div>
          </li>
          <li>
            <div data-tip data-for="aylien-hashtags-tooltip">Hashtags</div>
            < Tooltip id="aylien-hashtags-tooltip" place="right" >
              Extracts different hashtags from your input.
            </ Tooltip >
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
      // <div className="dropdown" id="aylien-dropdown">
      //   <h3 className="dropdown-header">Analysis Options</h3>
      //   <ul className="api-types-list">
      //     <li>
      //       <div tooltip-placement="right" tooltip-className="indico-tooltip" uib-tooltip="Produces confidence scores for different categories in your input.">Classify</div>
      //       <div className="api-checkbox cb1">
      //           <input type="checkbox" id="acb-classify" />
      //           <label htmlFor="acb-classify"></label>
      //        </div>
      //     </li>
      //     <li>
      //       <div tooltip-placement="right" tooltip-className="indico-tooltip" uib-tooltip="Produces scores for the polarity and subjectivity your input expresses.">Sentiment</div>
      //       <div className="api-checkbox cb1">
      //           <input type="checkbox" id="acb-sentiment" />
      //           <label htmlFor="acb-sentiment"></label>
      //        </div>
      //     </li>
      //     <li>
      //       <div tooltip-placement="top" tooltip-className="indico-tooltip" uib-tooltip="Extracts different concepts from your input.">Concepts</div>
      //       <div className="api-checkbox cb1">
      //           <input type="checkbox" id="acb-concepts" />
      //           <label htmlFor="acb-concepts"></label>
      //        </div>
      //     </li>
      //     <li>
      //       <div tooltip-placement="top" tooltip-className="indico-tooltip" uib-tooltip="Extracts different hashtags from your input.">Hashtags</div>
      //       <div className="api-checkbox cb1">
      //           <input type="checkbox" id="acb-hashtags" />
      //           <label htmlFor="acb-hashtags"></label>
      //        </div>
      //     </li>
      //   </ul>
      //   <div className="un-select-all">
      //     Select all
      //   </div>
      //   <div className="un-select-all">
      //     Unselect all
      //   </div>
      // </div>
    )
  }
}

export default AylienDropdown
