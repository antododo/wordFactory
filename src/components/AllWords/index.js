import React, { Component } from 'react';

// styles
import {styles} from './styles.scss';

// Components
import Word from 'components/Word'

class AllWords extends Component {


  render(){
    return (
      <div className={styles}>
        <p>All worlds</p>

        <Word></Word>
        <Word></Word>
        <Word></Word>
      </div>
    )
  }

}

export default AllWords
