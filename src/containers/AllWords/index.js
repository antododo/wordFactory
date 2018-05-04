import React, { Component } from 'react';
import { connect } from 'react-redux';

// styles
import {styles} from './styles.scss';

// Components
import Word from 'components/Word'

class AllWords extends Component {


  render(){

    return (
      <div className={styles}>
        <p>All worlds</p>
        <p>{this.props.words[0] && this.props.words[0].word}</p>
        <Word word="hello"></Word>
        <Word word="second"></Word>
        <Word word="33"></Word>
        <Word></Word>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    words: state.words
  }
}

export default connect(mapStateToProps)(AllWords)
