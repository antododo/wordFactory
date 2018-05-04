import React, { Component } from 'react';
import PropTypes             from 'prop-types';

// styles
import {styles} from './styles.scss';

class Word extends Component {

  constructor(props){
    super(props);
  }

  render(){

    return (
      <div className={styles}>
        <p>{this.props.word}</p>
      </div>
    )
  }
}

Word.propTypes = {word: PropTypes.string};
Word.defaultProps = {word: 'undefined'};

export default Word
