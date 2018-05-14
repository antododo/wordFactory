import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
// Import for web3
import getWeb3 from './../../utils/getWeb3'
import WordFactoryContract from './../../../build/contracts/WordFactory.json'

// styles
import {styles} from './styles.scss';

class SubmitNewWord extends Component {
  constructor(props){
    super(props);

    // Setting default State
    // used only in the form
    this.state = {
      text: 'Word',
      color: '#4a90e2',
      size: 24,
      time: 0,
      account: 'me',
      storageValue: 0
    }

    // Binding
    this.dispatchAddWord = this.dispatchAddWord.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
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

  // dispatch the word
  dispatchAddWord(event){
    event.preventDefault();

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
      <div className={styles}>
        <p>SubmitNewWord</p>
        <form onSubmit={this.dispatchAddWord}>
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
          <ChromePicker
            disableAlpha={true}
            color={this.state.color}
            onChangeComplete={this.handleChangeColor}
          />
          <button type="submit">Add Word </button>
        </form>
      </div>
    )
  }
}

export default SubmitNewWord
