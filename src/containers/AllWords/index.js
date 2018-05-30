import React, { Component } from 'react';
import { connect } from 'react-redux';
import getWeb3 from './../../utils/getWeb3'
import WordFactoryContract from './../../../build/contracts/WordFactory.json'
import { addWord, resetWord} from './actions';


// styles
import {styles} from './styles.scss';

// Components
import Word from './../../components/Word'

//selectors
import selectWords from './../WordsFilters/selector'

class AllWords extends Component {

  constructor(props){
    super(props);

    this.state = {
      timer: 0
    }

    // Binding
    this.getBlockchainWords = this.getBlockchainWords.bind(this);
    this.newWordListener = this.newWordListener.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    // TODO Remove getWeb3 from containers and put it on Redux store
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })

      this.state.web3.eth.getAccounts((error, accounts)=>{
        this.setState({account: accounts[0]})
      })

      this.newWordListener();
      // Refresh automatically the words because it's emitting an event as soon
      // as it's configured
    })
    .catch(()=>{
      console.log('Error finding web3. - AllWords')
    })

  }

  // Setting Up an Event listener
  newWordListener(){

  const contract = require('truffle-contract');
  const wordFactory = contract(WordFactoryContract);
  wordFactory.setProvider(this.state.web3.currentProvider);

  var wordFactoryInstance;

  wordFactory.deployed().then((instance)=>{
    wordFactoryInstance = instance;
    wordFactoryInstance.NewWord({},{fromBlock:'latest', toBlock: 'latest'}, (error,result)=>{
      if(!error){
        this.getBlockchainWords();
      }
      else {
       console.log('event error is : ')
       console.log(error);
     }
    });
  })
  }


  // Update Words from Blockchain
  getBlockchainWords(){
    // TODO Workaround because event is firing 2 times in a row?? Last 2 events firing.
    // Adding a timer to not refresh to often
    if (Date.now() < this.state.timer + 2000){return;} // if less then 2 sec, don't refresh, 'return' to quit
    this.setState({timer: Date.now()}); // if more then 2 sec, refresh timer


    // Cleaning redux store
    this.props.dispatch(resetWord());

    //Calling Blockchain function
    const contract = require('truffle-contract');
    const wordFactory = contract(WordFactoryContract);
    wordFactory.setProvider(this.state.web3.currentProvider);

    var wordFactoryInstance;
    var account = this.state.account;

    wordFactory.deployed().then((instance) => {
      wordFactoryInstance = instance
      return wordFactoryInstance.getWordByOwner.call(account)
    }).then((ids) => {
      // Get the ids from the contract.
      // for each id, get word details
      for(let id of ids){
        getWordDetails(id.c[0])
        .then((word)=>{
          // Adding to redux store
          this.props.dispatch(addWord({
            owner: word[0],
            text: word[1],
            fontColor: word[2],
            fontSize: word[3].c[0] + 'px',
            time: word[4].c[0]
          }))
        })
      }
    })

    function getWordDetails(id){
        return wordFactoryInstance.words(id);
    }
  }

  render(){
    // for each word in words, return a <Word> component with props.word = word.word
    // this.props.words from redux store
    var wordsList = this.props.words.map(function(word,index){
      return <Word key={index} word={word}></Word>;
    });

    return (
      <div className="pure-g">
        <div className="pure-u-1-1">
          <div className={styles}>
            {/* <p>Words count: {this.props.words.length}</p> */}
            {wordsList}
          </div>
        </div>
        <div className="pure-u-1-1">
          <button
            className="pure-button pure-button-primary" type="submit"
            onClick={this.getBlockchainWords}>
            Get all words from Blockchain!
          </button>
        </div>
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
