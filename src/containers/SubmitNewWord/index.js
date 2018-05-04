import React, { Component } from 'react';
import { addWord} from './actions'

// styles
import {styles} from './styles.scss';

// import for Redux
import { connect } from 'react-redux';

class SubmitNewWord extends Component {

  constructor(props){
    super(props);

    //Setting State
    this.state = {
      text: 'hello',
      color: 'red',
      size: 12
    }

    // Binding
    this.DispatchAddWord = this.DispatchAddWord.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  // handle input in form field Add Word
  handleChangeText(event){
    this.setState({
      text: event.target.value});
  }

  handleChangeSize(event){
    this.setState({
      size: event.target.value});
  }

  handleChangeColor(event){
    this.setState({
      color: event.target.value});
  }

  // Dispatch the word
  DispatchAddWord(event){
    event.preventDefault();
    let word = {
      text: this.state.text,
      fontSize: this.state.size + 'px',
      fontColor: this.state.color
    }
    this.props.dispatch(addWord(word));
  }

  render(){
    return (
      <div className={styles}>
        <p>SubmitNewWord</p>
        <form onSubmit={this.DispatchAddWord}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChangeText}
          />
          <input
            type="number"
            value={this.state.size}
            onChange={this.handleChangeSize}
          />
          <input
            type="text"
            value={this.state.color}
            onChange={this.handleChangeColor}
          />
          <button type="submit">Add Word </button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    words: state.words
  }
}

export default connect(mapStateToProps)(SubmitNewWord)
