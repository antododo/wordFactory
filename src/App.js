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

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header></Header>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <AllWords></AllWords>
              <SubmitNewWord></SubmitNewWord>
              <WordsFilters></WordsFilters>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App
