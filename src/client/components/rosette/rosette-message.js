
import React from 'react';

class RosetteMessage extends React.Component {

  toggleMessageView(){
    this.props.toggleMessageView(this.props.id);
  }

  getHeader(){
    if (this.props.analyses.successes.length && !this.props.viewJson){
      return (
        <div>
          <strong>Hello! Here are my analyses of your input</strong>
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
  renderSentiment(){

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
          <strong key={entities[i].mention}> {entities[i].mention}</strong>
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

  renderRelationships(){

  }

  renderJson(analysis){
    return (
      <div key={analysis.type}>
        <h5>{analysis.type.charAt(0).toUpperCase() + analysis.type.slice(1)}</h5>
        <pre>{JSON.stringify(analysis.data, null, 2)}</pre>
      </div>
    )
  }


  render(){
    let successes = null;
    if(this.props.analyses.successes.length){
      if(!this.props.viewJson){
        successes = this.props.analyses.successes.map(success => {
          if (success.type === 'categories'){
            return this.renderCategories(success.data.categories);
          } else if (success.type === 'entities'){
            return this.renderEntities(success.data.entities);
          } else if (success.type === 'relationships'){
            return this.renderRelationships(success.data.entities);
          } else if (success.type === 'sentiment'){
            return this.renderSentiment(success.data.hashtags);
          }
        })
      } else {
        successes = this.props.analyses.successes.map(success => {
          return this.renderJson(success);
        })
      }
    }

    let errors = null;

    return (
      <div className="message rosette">

        <span className="outer-triangle"> </span>
        <span className="inner-triangle"> </span>

        <div className="message-header">
          {this.getHeader()}
        </div>


        <div>
          {successes}
        </div>

        <div>
          {errors}
        </div>

      </div>
    )

  }

}

export default RosetteMessage
