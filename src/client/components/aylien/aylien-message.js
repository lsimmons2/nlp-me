
import React from 'react';

class AylienMessage extends React.Component {

  getPerc(confidence){
    return (confidence * 100).toFixed(2);
  }

  renderClassify(categories){
    let classifyAnalysis = [];
    if (categories.length){

      classifyAnalysis.push(
        <span key='first'>I'm </span>
      )

      let category;
      let length = categories.length;

      let i;
      for (i = 0; i < length; i++) {
        if (i === length - 1 && length > 1){
          classifyAnalysis.push(' and')
        }
        category = categories[i];
        classifyAnalysis.push(
          <span key={i}>
            <strong> {this.getPerc(category.confidence)}%</strong>
            <span> confident that</span>
            <strong> {category.label}</strong>
            <span> is a category</span>
          </span>
        )
        if (length > 2 && i !== length - 1){
          classifyAnalysis.push(',')
        }
      }

      classifyAnalysis.push('.')

    } else {
      classifyAnalysis = (
        'No categories categories could be extracted from your input.'
      )
    }
    return (
      <div key='classify'>
        <h5>Classify</h5>
        <p>{classifyAnalysis}</p>
      </div>
    )
  }

  renderSentiment(sentiment){
    let sentimentAnalysis = [
      'I\'m',
      <strong key='subjectivity_confidence'> {this.getPerc(sentiment.subjectivity_confidence)}%</strong>,
      ' confident that the subjectivity is',
      <strong key='subjectivity'> {sentiment.subjectivity}</strong>,
      ' and',
      <strong key='polarity_confidence'> {this.getPerc(sentiment.polarity_confidence)}%</strong>,
      ' confident that the polarity is',
      <strong key='polarity'> {sentiment.polarity}</strong>,
      '.'
    ];
    return (
      <div key='sentiment'>
        <h5>Sentiment</h5>
        <p>{sentimentAnalysis}</p>
      </div>
    )
  }

  renderConcepts(concepts){
    let conceptsAnalysis = [];
    let keys = Object.keys(concepts);
    if (keys.length > 1){
      conceptsAnalysis.push('The concepts I found are ');
      let i;
      for (i = 0; i < keys.length; i++) {
        if (i === keys.length - 1 && keys.length > 2){
          conceptsAnalysis.push('and ')
        }
        if (i === 1 && keys.length === 2){
          conceptsAnalysis.push(' and ')
        }
        conceptsAnalysis.push(
          <strong key={concepts[keys[i]].surfaceForms[0].string}>
            <a href={concepts[keys[i]]} target="_blank">
              {concepts[keys[i]].surfaceForms[0].string}
            </a>
          </strong>
        )
        if (keys.length > 2 && i !== keys.length - 1){
          conceptsAnalysis.push(', ')
        }
      }
      conceptsAnalysis.push('.')
    } else if (keys.length === 1){
      conceptsAnalysis = [
        'The only concept I could find is ',
        <strong key={concepts[keys[0]].surfaceForms[0].string}>
          <a href={concepts[keys[0]]} target="_blank">
            {concepts[keys[0]].surfaceForms[0].string}
          </a>
        </strong>,
        '.'
      ];
    } else {
      conceptsAnalysis = (
        'No concepts could be extracted from your input.'
      )
    }
    return (
      <div key='concepts'>
        <h5>Concepts</h5>
        <p>{conceptsAnalysis}</p>
      </div>
    )
  }

  renderHashtags(hashtags){

    let hashtagsAnalysis;

    if (hashtags.length === 1){
      hashtagsAnalysis = [
        'The only hashtag I could find is ',
        <strong key={hashtags[0]}>{hashtags[0]}</strong>
      ]
    } else if (!hashtags.length){
      hashtagsAnalysis = 'Sorry! I couldn\'t find any hashtags in your input.';
    } else {
      hashtagsAnalysis = ['The hashtags I found were'];
      let i;
      for (i = 0; i < hashtags.length; i++) {
        if(i === hashtags.length - 1){
          hashtagsAnalysis.push(' and')
        }
        hashtagsAnalysis.push(
          <strong key={hashtags[i]}>
            &nbsp;{hashtags[i]}
          </strong>
        )
        if(i !== hashtags.length - 1 && hashtags.length !== 2){
          hashtagsAnalysis.push(',')
        }
        if(i === hashtags.length - 1){
          hashtagsAnalysis.push('.')
        }
      }
    }
    return (
      <div key='hashtags'>
        <h5>Hashtags</h5>
        <p>{hashtagsAnalysis}</p>
      </div>
    )
  }

  render(){

    let successes = null;
    if(this.props.analyses.successes.length){

      successes = this.props.analyses.successes.map(success => {

        if (success.type === 'classify'){
          return this.renderClassify(success.data.categories);
        }

        if (success.type === 'sentiment'){
          return this.renderSentiment(success.data);
        }
        if (success.type === 'concepts'){
          return this.renderConcepts(success.data.concepts);
        }
        if (success.type === 'hashtags'){
          return this.renderHashtags(success.data.hashtags);
        }

      })

    }

    let errors = null;

    return (
      <div className="message aylien">

        <span className="outer-triangle"> </span>
        <span className="inner-triangle"> </span>

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

export default AylienMessage
