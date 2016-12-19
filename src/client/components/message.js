import React from 'react';

class Message extends React.Component {
  render(){
    return (
      <div className="message aylien">

        <img className="avatar" src="/images/aylien-icon.png"/>

        <span className="outer-triangle"> </span>
        <span className="inner-triangle"> </span>

        <div className="message-header">
          Here are my analyses of your input
        </div>

        <div>
          <h5>Sentiment</h5>
        </div>
      </div>
    )
  }
}

export default Message


// <div class="message aylien" ng-if="message.who === 'aylien' && !message.error" ng-show="message.view === 'pretty'">
//
//
//         <span class="outer-triangle"> </span>
//         <span class="inner-triangle"> </span>
//
//         <div class="message-header">
//           <strong>Hello! Here are my analyses of your input</strong><span class="json-link"> - <a ng-click="message.view = 'json'">view in JSON</a></span>
//         </div>
//
//         <div ng-if="message.analyses.classify">
//           <h5>Classify</h5>
//           <p ng-if="message.analyses.classify.categories.length">
//             I'm
//             <span ng-repeat="category in message.analyses.classify.categories track by $index">
//               <span ng-if="$last && message.analyses.classify.categories.length > 1">and</span>
//               <strong class="data">{{ category.score | perc }}%</strong>
//               confident that
//               <strong class="data">{{category.label}}</strong>
//               is a category
//               <span class="comma-period" ng-if="!$last">,</span>
//               <span class="comma-period" ng-if="$last">.</span>
//             </span>
//           </p>
//           <p ng-if="!message.analyses.classify.categories.length">
//             No categories could be extracted from your input.
//           </p>
//         </div>
//
//         <div ng-if="message.analyses.sentiment">
//           <h5>Sentiment</h5>
//           <p>
//             I'm
//             <strong class="data">{{ message.analyses.sentiment.subjectivity_confidence | perc }}%</strong>
//             confident that the subjectivity is
//             <strong class="data">{{message.analyses.sentiment.subjectivity}}</strong>
//             and
//             <strong class="data">{{ message.analyses.sentiment.polarity_confidence | perc }}%</strong>
//             confident that the polarity is
//             <strong class="data">{{message.analyses.sentiment.polarity}}</strong>
//             <span class="comma-period">.</span>
//           </p>
//         </div>
//
//         <div ng-if="message.analyses.concepts.concepts">
//           <h5>Concepts</h5>
//
//           <p ng-if="keys(message.analyses.concepts.concepts).length === 0">
//             No concepts could be extracted from your input.
//           </p>
//
//           <p ng-if="keys(message.analyses.concepts.concepts).length === 1">
//             The only concept I could find was
//             <strong ng-repeat="(key, value) in message.analyses.concepts.concepts">
//               <a ng-href="{{key}}" target="_blank">{{value.surfaceForms[0].string}}</a>
//             </strong>
//             <span class="comma-period">.</span>
//           </p>
//
//           <p ng-if="keys(message.analyses.concepts.concepts).length > 1">
//             The concepts I found were
//             <span ng-repeat="(key, value) in message.analyses.concepts.concepts">
//               <span ng-if="$last">and</span>
//               <strong class="data">
//                 <a ng-href="{{key}}" target="_blank">{{value.surfaceForms[0].string}}</a>
//               </strong>
//               <span class="comma-period" ng-if="!$last">,</span>
//               <span class="comma-period" ng-if="$last">.</span>
//             </span>
//           </p>
//         </div>
//
//         <div ng-if="message.analyses.hashtags.hashtags">
//           <h5>Hashtags</h5>
//           <p ng-if="!message.analyses.hashtags.hashtags.length">
//             No hashtags could be extracted from your input.
//           </p>
//             <p ng-if="message.analyses.hashtags.hashtags.length === 1">
//               The only hashtag I could find was
//               <strong class="data">
//                 {{message.analyses.hashtags.hashtags[0]}}
//               </strong>
//               <span class="comma-period">.</span>
//             </p>
//             <p ng-if="message.analyses.hashtags.hashtags.length > 1">
//               The hashtags I found were
//               <span ng-repeat="hashtag in message.analyses.hashtags.hashtags track by $index">
//                 <span ng-if="$last">and</span>
//                 <strong class="data">
//                   {{hashtag}}
//                 </strong>
//                 <span class="comma-period" ng-if="!$last">,</span>
//                 <span class="comma-period" ng-if="$last">.</span>
//               </span>
//             </p>
//         </div>
//
//         <div ng-if="message.errors.length">
//           <h5>Errors</h5>
//             <p ng-if="message.errors.length === 1">
//               Error retrieving the <strong class="data">{{message.errors[0]}}</strong> analysis.
//             </p>
//             <p ng-if="message.errors.length > 1">
//               Error retriveing the
//               <span ng-repeat="error in message.errors track by $index">
//                 <span ng-if="$last">and</span>
//                 <strong class="data">{{error}}</strong>
//                 <span class="comma-period" ng-if="!$last">,</span>
//               </span>
//               analyses.
//             </p>
//         </div>
//
//       </div>
