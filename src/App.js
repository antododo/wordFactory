import React, { Component } from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

// Components & containers
import AllWords from './containers/AllWords'
import SubmitNewWord from './components/SubmitNewWord'
import WordsFilters from './containers/WordsFilters'

class App extends Component {

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">My Custom App</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <SubmitNewWord></SubmitNewWord>
              <WordsFilters></WordsFilters>
              <AllWords></AllWords>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
