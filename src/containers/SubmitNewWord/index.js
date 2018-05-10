import React, { Component } from 'react';
import { addWord} from './actions';
import { ChromePicker } from 'react-color';
import moment from 'moment';
// Import for web3
import getWeb3 from './../../utils/getWeb3'
import WordFactoryContract from './../../../build/contracts/WordFactory.json'
import SimpleStorageContract from './../../../build/contracts/SimpleStorage.json'


// styles
import {styles} from './styles.scss';

// import for Redux
import { connect } from 'react-redux';

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

  //
  // instantiateContract() {
  //   console.log('initiate contract')
  //
  //   const contract = require('truffle-contract')
  //   this.setState({
  //     contracts: {
  //       wordFactory: contract(WordFactory)
  //     }
  //   })
  //   this.state.contracts.wordFactory.setProvider(this.state.web3.currentProvider);
  //
  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     this.setState({
  //       account: accounts[0]
  //     });
  //   })
  // }

  // EXEMPLE TRUFFLE
  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0], account: accounts[0] })
      })
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
      return wordFactoryInstance.addWord('hello','blue',24, {from: account})
    }).then((result)=>{
      console.log(result);
    })

    // Local variables & state
    let word = {
      text: this.state.text,
      fontSize: this.state.size + 'px',
      fontColor: this.state.color,
      time: moment().valueOf(),
      owner: this.state.account
    }
    this.props.dispatch(addWord(word));
  }

  render(){
    return (
      <div className={styles}>
        <p>SubmitNewWord</p>
        <input
        value={this.state.storageValue}/>
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

const mapStateToProps = (state) => {
  return {
    words: state.words
  }
}

export default connect(mapStateToProps)(SubmitNewWord)
