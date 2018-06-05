import React, { Component } from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

// Components & containers
import Header from './components/Header'
import Footer from './components/Footer'
import AllWords from './containers/AllWords'
import SubmitNewWord from './containers/SubmitNewWord'
import WordsFilters from './containers/WordsFilters'
import CheckWeb3 from './containers/CheckWeb3'
// import Explanation from './components/Explanation'

class App extends Component {

  render() {
    return (
      <div className="App main">
        <Header></Header>
        <CheckWeb3></CheckWeb3>
        {/* <Explanation></Explanation> */}
        <main className="container">
          <div>
            <SubmitNewWord></SubmitNewWord>
            <AllWords></AllWords>
            <WordsFilters></WordsFilters>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App
