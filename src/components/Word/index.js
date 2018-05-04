// import React, { Component } from 'react';
import PropTypes             from 'prop-types';

// styles
// import {styles} from './styles.scss';

// class Word extends Component {
//   constructor(props){
//     super(props);
//   }
//
//   render(){
//
//     // Define the word style from props
//     let spanStyle = {
//       color: this.props.word.fontColor,
//       fontSize: this.props.word.fontSize
//     }
//
//     return (
//       <span style={spanStyle}>
//         {this.props.word.text}
//       </span>
//     )
//   }
// }

// Using a stateless functional component instead of a class component (commented above)
const Word = function (props) {

  // Define the word style from props
  let spanStyle = {
    color: props.word.fontColor,
    fontSize: props.word.fontSize
  }

  return (
    <span style={spanStyle}>
      {props.word.text}
    </span>
  )
}


Word.propTypes = {
  word: PropTypes.shape({
    text: PropTypes.string,
    fontSize: PropTypes.string,
    fontColor: PropTypes.string
  })
}


Word.defaultProps = {
  word: {
    text: 'undefined',
    fontSize: '12px',
    fontColor: 'blue'
  }
};

export default Word
