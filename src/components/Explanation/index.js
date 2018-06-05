import React from 'react';

class Explanation extends React.Component {
  render(){
    return(
      <div className="alert alert-primary alert-dismissible fade show" role="alert">
        <h4 className="alert-heading">How does it work?</h4>
        <p>Infinite Word Factory is a DApp project that let you write anything you want to the blockchain with custom size and color.</p>
        <p>All those words are store permanently on the Ethereum Rinkeby network.</p>
        <hr/>
        <p className="mb-0">
          <i>Rinkey is a Testnet, so you can use this DApp with fake ETH that you can obtain <a href="https://www.rinkeby.io/#faucet" target="_blank">here</a>.</i>
        </p>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

export default Explanation
