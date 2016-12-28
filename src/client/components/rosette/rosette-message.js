
import React from 'react';
import greetings from '../../greetings'


class RosetteMessage extends React.Component {

  constructor(props){
    super(props);
    this.greeting = greetings[(Math.random() * greetings.length).toFixed()];
  }

  toggleMessageView(){
    this.props.toggleMessageView(this.props.id);
  }

  renderHeader(){
    if (this.props.analyses.successes.length && !this.props.viewJson){
      return (
        <div>
          <strong>{this.greeting} Here are my analyses of your input</strong>
          <span className="json-link">
            &nbsp;- <a onClick={this.toggleMessageView.bind(this)}>view in JSON</a>
          </span>
        </div>
      )
    }
    if (this.props.analyses.successes.length && this.props.viewJson){
      return (
        <div>
          <strong>Analyses of your input in JSON</strong>
          <span className="json-link">
            &nbsp;- <a onClick={this.toggleMessageView.bind(this)}>view in English</a>
          </span>
        </div>
      )
    }
  }

  renderPercent(confidence){
    return (confidence * 100).toFixed(2);
  }

  getFullSentiment(sentiment){
    if(sentiment === 'pos'){
      return 'positive';
    }
    if(sentiment === 'neg'){
      return 'negative';
    }
    if(sentiment === 'neu'){
      return 'neutral';
    }
  }

  renderCategories(categories){

    let categoriesAnalysis = ['I\'m '];
    let i;
    for (i = 0; i < categories.length; i++) {
      if(i === categories.length - 1 && categories.length > 1){
        categoriesAnalysis.push('and ')
      }
      categoriesAnalysis.push(
        <span key={i}>
          <strong>{this.renderPercent(categories[i].confidence)}%</strong>
          <span> confident that</span>
          <strong> {categories[i].label}</strong>
          <span> is a category</span>
        </span>
      )
      if(categories.length > 2 && i !== categories.length -1){
        categoriesAnalysis.push(', ')
      }
    }

    return (
      <div key='categories'>
        <h5>Categories</h5>
        <p>{categoriesAnalysis}</p>
      </div>
    )

  }

  renderEntities(entities){

    let entitiesAnalysis;

    if (!entities.length){
      entitiesAnalysis = 'Woops! I couldn\'t find any entities in your input.'
    } else if (entities.length === 1){
      entitiesAnalysis = [
        'The only entity I could find in your input is ',
        <strong key='only'>{entities[0].mention}</strong>,
        '.'
      ]
    } else {
      entitiesAnalysis = ['The entities I found in your input are'];
      for (var i = 0; i < entities.length; i++) {
        if(i === entities.length - 1 && entities.length > 1){
          entitiesAnalysis.push(' and')
        }
        entitiesAnalysis.push(
          <strong key={i}> {entities[i].mention}</strong>
        )
        if(entities.length > 2 && i !== entities.length -1){
          entitiesAnalysis.push(',')
        }
      }
      entitiesAnalysis.push('.')
    }

    return (
      <div key='entities'>
        <h5>Entities</h5>
        <p>{entitiesAnalysis}</p>
      </div>
    )

  }

  renderRelationships(relationships){

    let length = relationships.length;
    let relationshipsAnalysis;
    if (!length){
      relationshipsAnalysis = 'Woops. No relationships could be found in your input.'
    } else {
      relationshipsAnalysis = ['I\'m']
      let i;
      for (i = 0; i < length; i++) {
        if(i === length - 1 && length > 1){
          relationshipsAnalysis.push(' and');
        }
        relationshipsAnalysis.push(
          <span key={i}>
            <strong> {this.renderPercent(relationships[i].confidence)}%</strong>
            <span> confident that the arguments</span>
            <strong> {relationships[i].arg1}</strong>
            <span> and</span>
            <strong> {relationships[i].arg2}</strong>
            <span> are related with the predicate</span>
            <strong> {relationships[i].predicate}</strong>
          </span>
        )
        if(length > 2 && i !== length -1){
          relationshipsAnalysis.push(',');
        }
      }
      relationshipsAnalysis.push('.');
    }

    return (
      <div key='relationships'>
        <h5>Relationships</h5>
        <p>{relationshipsAnalysis}</p>
      </div>
    )

  }

  renderSentiment(sentiment){
    let sentimentAnalysis = [
      'I\'m',
      <strong key={sentiment.entities.length + 1}> {this.renderPercent(sentiment.document.confidence)}%</strong>,
      ' confident that the overall sentiment of your input is',
      <strong key={sentiment.entities.length + 2}> {this.getFullSentiment(sentiment.document.label)}</strong>,
      '.'
    ];
    let length = sentiment.entities.length;
    if (length){
      sentimentAnalysis.push(' I\'m also');
      let entities = sentiment.entities;
      let i;
      for (i = 0; i < length; i++) {
        if (i === length - 1 && length > 1){
          sentimentAnalysis.push(' and');
        }
        sentimentAnalysis.push(
          <span key={i}>
            <strong> {this.renderPercent(entities[i].sentiment.confidence)}%</strong>
            <span> that the entity</span>
            <strong> {entities[i].mention}</strong>
            <span> has a sentiment of</span>
            <strong> {this.getFullSentiment(entities[i].sentiment.label)}</strong>
          </span>
        )
        if(length > 2 && i !== length - 1){
          sentimentAnalysis.push(',');
        }
      }
      sentimentAnalysis.push('.');
    }

    return (
      <div key='sentiment'>
        <h5>Sentiment</h5>
        <p>{sentimentAnalysis}</p>
      </div>
    )

  }

  renderJson(analysis){
    return (
      <div key={analysis.type}>
        <h5>{analysis.type.charAt(0).toUpperCase() + analysis.type.slice(1)}</h5>
        <pre>{JSON.stringify(analysis.data, null, 2)}</pre>
      </div>
    )
  }

  renderErrors(){
    let errors = this.props.analyses.errors;
    if (!errors.length){
      return null;
    } else {

      let errorList;

      if (errors.length === 1){

        errorList = [
          'There was an error receiving your ',
          <strong key='only'>{errors[0]}</strong>,
          ' analysis.'
        ];

      } else {

        errorList = ['There were errors retreiving your'];
        let i;
        for (i = 0; i < errors.length; i++) {
          if(i === errors.length -1){
            errorList.push(' and');
          }
          errorList.push(
            <strong key={i}> {errors[i]}</strong>
          )
          if (errors.length > 2 && i !== errors.length -1){
            errorList.push(',');
          }
        }
        errorList.push(' analyses.');

      }

      return (
        <div>
          <h5>Errors</h5>
          <p>{errorList}</p>
        </div>
      )

    }
  }

  render(){
    let successes = null;
    if(this.props.analyses.successes.length){
      if(!this.props.viewJson){
        successes = this.props.analyses.successes.map(success => {
          if (success.type === 'categories'){
            // return null;
            return this.renderCategories(success.data.categories);
          } else if (success.type === 'entities'){
            // return null;
            return this.renderEntities(success.data.entities);
          } else if (success.type === 'relationships'){
            // return null;
            return this.renderRelationships(success.data.relationships);
          } else if (success.type === 'sentiment'){
            // return null;
            return this.renderSentiment(success.data);
          }
        })
      } else {
        successes = this.props.analyses.successes.map(success => {
          return this.renderJson(success);
        })
      }
    }

    let errors = this.renderErrors();

    return (
      <div>

        <img className="avatar" src="images/rosette-icon.png"/>

        <div className="message rosette">

          <span className="outer-triangle"> </span>
          <span className="inner-triangle"> </span>

          <div className="message-header">
            {this.renderHeader()}
          </div>


          <div>
            {successes}
          </div>

          <div>
            {errors}
          </div>

        </div>

      </div>
    )

  }

}

export default RosetteMessage
