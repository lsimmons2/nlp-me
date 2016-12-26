import React from 'react';

class MeaningcloudMessage extends React.Component {


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

  renderJson(analysis){
    return (
      <div key={analysis.type}>
        <h5>{analysis.type.charAt(0).toUpperCase() + analysis.type.slice(1)}</h5>
        <pre>{JSON.stringify(analysis.data, null, 2)}</pre>
      </div>
    )
  }

  renderClassification(categories){
    let classificationAnalysis;
    let length = categories.length;
    if (!length){
      classificationAnalysis = 'Woops, I couldn\'t find any categories in your input.'
    } else if (length === 1){
      classificationAnalysis = [
        'The only category I could find in your input is',
        <strong key='only'> {categories[0].label}</strong>,
        '.'
      ];
    } else {
      classificationAnalysis = ['The categories I found in your input are'];
      let i;
      for (i = 0; i < length; i++) {
        if(i === length -1 && length > 1){
          classificationAnalysis.push(' and');
        }
        classificationAnalysis.push(<strong key={i}> {categories[i].label}</strong>);
        if(i !== length -1 && length > 2){
          classificationAnalysis.push(',');
        }
      }
      classificationAnalysis.push('.');
    }
    return (
      <div key='classification'>
        <h5>Classification</h5>
        <p>{classificationAnalysis}</p>
      </div>
    )

  }

  renderSentiment(sentiment){
    return (
      <div key='sentiment'>
        <h5>Sentiment</h5>
        <p>
          I calculated the <strong>subjectivity</strong> in your input to be <strong>{sentiment.subjectivity.toLowerCase()}</strong> and the <strong>irony</strong> to be <strong>{sentiment.irony.toLowerCase()}</strong>.
        </p>
      </div>
    )
  }

  renderTopics(topics){

    let topicsAnalysis;
    let length = topics.length;

    if(!length){
      topicsAnalysis = 'Woops, I couldn\'t find any topics in your input.'
    } else if (length === 1){
      topicsAnalysis = [
        'The only topic I could find in your input is',
        <strong key='only'> {topics[0].form}</strong>,
        '.'
      ];
    } else {
      topicsAnalysis = ['The topics I found in your input are'];
      let i;
      for (i = 0; i < length; i++) {
        if (i === length - 1 && length > 1){
          topicsAnalysis.push(' and');
        }
        topicsAnalysis.push(<strong key={i}> {topics[i].form}</strong>);
        if (i !== length - 1 && length > 2){
          topicsAnalysis.push(',');
        }
      }
      topicsAnalysis.push('.');
    }


    return (
      <div key='topics'>
        <h5>Topics</h5>
        <p>{topicsAnalysis}</p>
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
          if (success.type === 'classification'){
            return this.renderClassification(success.data.category_list);
          } else if (success.type === 'sentiment'){
            return this.renderSentiment(success.data);
          } else if (success.type === 'topics'){
            return this.renderTopics(success.data.concept_list);
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

        <img className="avatar" src="images/meaningcloud-icon.png"/>

        <div className="message meaningcloud">

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

      </div>
    )

  }

}

export default MeaningcloudMessage
