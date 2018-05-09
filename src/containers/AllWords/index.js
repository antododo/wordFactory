import React, { Component } from 'react';
import { connect } from 'react-redux';

// styles
import {styles} from './styles.scss';

// Components
import Word from './../../components/Word'

//selectors
import selectWords from './../WordsFilters/selector'

class AllWords extends Component {


  render(){

    // for each word in words, return a <Word> component with props.word = word.word
    // this.props.words from redux store
    var wordsList = this.props.words.map(function(word,index){
      return <Word key={index} word={word}></Word>;
    });

    return (
      <div className={styles}>
        <p>All worlds</p>
        <p>Words count: {this.props.words.length}</p>
        {wordsList}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    words: selectWords(state.words,state.filters)
  }
}

export default connect(mapStateToProps)(AllWords)
