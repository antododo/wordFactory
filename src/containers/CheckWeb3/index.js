import React from 'react';
import getWeb3 from './../../utils/getWeb3'


class CheckWeb3 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      web3: '',
      account: '',
      rinkeby: false,
      initTime: Date.now(),
      timer: false
    }
  }

  componentWillMount(){

    getWeb3.then((results)=>{
      this.setState({
        web3: results.web3
      })
      //
    }).catch(()=>{
      console.log('Error finding web3.')
    })
  }

  componentDidMount(){

    if(this.state.web3){
      this.setState({
        account : this.state.web3.eth.accounts[0]
      });
    }

    // Arrow function used
    // Other option
    // var self = this;
    // setInterval(function(){
    // and replace this by self
    setInterval(()=> {
      // Looking for account change
      if (this.state.web3.eth && this.state.web3.eth.accounts[0] !== this.state.account) {
        this.setState({
          account : this.state.web3.eth.accounts[0]
        });
        console.log('new account is :' + this.state.account)
      }

      // Checking witch web3 network is used
      if(this.state.web3){
        this.state.web3.version.getNetwork((err, netId) => {
          switch (netId) {
            case "1":
              console.log('This is mainnet')
              break
            case "2":
              console.log('This is the deprecated Morden test network.')
              break
            case "3":
              console.log('This is the ropsten test network.')
              break
            case "4":
              console.log('This is the Rinkeby test network.')
              this.setState({rinkeby: true})
              break
            case "42":
              console.log('This is the Kovan test network.')
              break
            default:
              console.log('This is an unknown network.')
          }
        })
      }else{console.log('web3 not detected')}

      // Add a timer to let time for web3 to load
      // timer is false until
      this.setState({
        timer: (this.state.initTime + 1500 < (Date.now()))
      })

    }, 500);
  }



  render(){



    return(
      <div>
        {this.state.timer && !this.state.web3 && <div className="alert alert-danger show" role="alert">
          <h4 className="alert-heading">Oops! No web3 detected :(</h4>
          <p>In order to use this DApp, you need an web3 provider. You should consider trying <a href="https://metamask.io/" className="alert-link" target="_blank">Metamask</a>.</p>
          <hr/>
          <p className="mb-0">
            <i>You don't know what is a web3 or Metamask? Check this <a href="https://www.youtube.com/watch?v=6Gf_kRE4MJU" className="alert-link" target="_blank">video</a> for more info.</i>
          </p>
        </div>}
        {this.state.timer && this.state.web3 && !this.state.rinkeby && <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">You need to use to Rinkeby network</h4>
          <p>This DApp is still in beta, so please use Rinkeby network to use it!</p>
        </div>}
      </div>
    )}
}

export default CheckWeb3
