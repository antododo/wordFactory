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
      formAddWordInput: 'hello'
    }

    // Binding
    this.DispatchAddWord = this.DispatchAddWord.bind(this);
    this.handleChangeAddWord = this.handleChangeAddWord.bind(this);
  }

  // handle input in form field Add Word
  handleChangeAddWord(event){
    this.setState({formAddWordInput: event.target.value});
  }

  // Dispatch the word
  DispatchAddWord(event){
    event.preventDefault();
    this.props.dispatch(addWord(this.state.formAddWordInput));
  }

  render(){
    return (
      <div className={styles}>
        <p>SubmitNewWord</p>
        <form onSubmit={this.DispatchAddWord}>
          <input
            type="text"
            value={this.state.formAddWordInput}
            onChange={this.handleChangeAddWord}
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
