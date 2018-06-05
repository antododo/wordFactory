import React, { Component } from 'react';
import {connect} from 'react-redux';
import { TwitterPicker } from 'react-color';
// Import for web3
import getWeb3 from './../../utils/getWeb3'
import WordFactoryContract from './../../../build/contracts/WordFactory.json'

//actions
import {submitingWord} from './actions';

// styles
import './styles.css';

class SubmitNewWord extends Component {
  constructor(props){
    super(props);

    // Setting default State
    // used only in the form
    this.state = {
      text: '',
      color: '#4a90e2',
      size: 24,
      time: 0,
      account: 'me',
      storageValue: 0,
      colorPickerVisible: false
    }

    // Binding
    this.dispatchAddWord = this.dispatchAddWord.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    // TODO Remove getWeb3 from containers and put it on Redux store
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      //Instantiate contracts once web3 provided
      this.instantiateContract()
    })
    .catch(()=>{
      console.log('Error finding web3.')
    })
  }


  instantiateContract() {
    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
        // Update state with the result.
        return this.setState({account: accounts[0] })
      })
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

  handleChangeColor(color){
    this.setState({
      color: color.hex});
  }

  toggleColorPicker(){
    this.setState({
      colorPickerVisible: !this.state.colorPickerVisible
    })
  }

  // dispatch the word
  dispatchAddWord(event){
    event.preventDefault();


    //When a word is dispatch, replace the button with the spinner
    this.props.dispatch(submitingWord());

    // Web3
    var wordFactoryInstance;
    var account = this.state.account;
    const contract = require('truffle-contract');
    var wordFactory = contract(WordFactoryContract);
    wordFactory.setProvider(this.state.web3.currentProvider);
    wordFactory.deployed().then((instance)=>{
      wordFactoryInstance = instance;
      return wordFactoryInstance.addWord(
          this.state.text,
          this.state.color,
          this.state.size,
          this.state.account,
          {from: account})
    })
  }

  render(){
    return (
      <div className="SubmitNewWord container">
        <form onSubmit={this.dispatchAddWord}>
          <div>
            <div className="row">
              <div className="col-12">
                  <input
                    className="form-control-lg form-control"
                    type="text"
                    placeholder="What do you want to say?"
                    value={this.state.text}
                    onChange={this.handleChangeText}
                  />
                  <br/>
              </div>
            </div>
            <div className="row">
              <div className="col-3" align="center">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Size</span>
                  </div>
                  <input
                    placeholder="Font Size"
                    step="1" min="0" max="60"
                    className="form-control-lg form-control"
                    type="number"
                    value={this.state.size}
                    onChange={this.handleChangeSize}
                  />
                </div>
              </div>
              <div className="col-3" align="center">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      onClick={this.toggleColorPicker}
                      >Color
                    </span>
                  </div>
                  <input
                    className="form-control-lg form-control"
                    type="button"
                    style={{backgroundColor: this.state.color}}
                    color={this.state.color}
                    onClick={this.toggleColorPicker}
                  />
                </div>
                {this.state.colorPickerVisible && <TwitterPicker
                  disableAlpha={true}
                  color={this.state.color}
                  onChangeComplete={this.handleChangeColor}
                  className="colorPicker"
                />}
              </div>
              <div className="ColAddWordButton col-6">
                {this.props.submitingWord.submitingWord && <div className="lds-ring-SubmitNewWord"><div></div><div></div><div></div><div></div></div>
                }
                {!this.props.submitingWord.submitingWord && <button
                  type="submit"
                  className="btn-lg addWordButton btn btn-primary"
                  >Add Your Word
                </button>}
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    submitingWord: state.submitingWord
  }
}

export default connect(mapStateToProps)(SubmitNewWord);
