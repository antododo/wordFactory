import React from 'react';

import './styles.css'

const Header = function(props){
  return (
    <nav className="navbar navbar-dark bg-dark box-shadow" >
      <span className="navbar-brand h1 text-white">Infinite Word Factory</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span>How Does it work?</span>
</button>

<div className="collapse navbar-collapse text-white text-right" id="navbarNav">
  <hr/>
  <p>Infinite Word Factory is a DApp project that let you write any words want to the blockchain with custom size and color.</p>
  <p>All those words are store permanently on the Ethereum Rinkeby network.</p>
  <p><i>Rinkey is a Testnet, so you can use this DApp with fake ETH that you can obtain <a href="https://www.rinkeby.io/#faucet" target="_blank">here</a>.</i>
  </p>
</div>

    </nav>
  )
}

export default Header
