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

    // Binding
    this.getBlockchainWords = this.getBlockchainWords.bind(this);
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

    })
    .catch(()=>{
      console.log('Error finding web3. - AllWords')
    })
  }

  getBlockchainWords(){
    console.log('Getting Blockchain Words');
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
      <div className={styles}>
        <p>All Local words</p>
        <p>Words count: {this.props.words.length}</p>
        {wordsList}
        <p>All Blockchain Worlds</p>
        <button
          onClick={this.getBlockchainWords}>Get Blockchain Words</button>
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
