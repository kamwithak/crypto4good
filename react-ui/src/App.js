import React from 'react';
import Web3 from 'web3';
import Typist from 'react-text-typist';
import Timer from './components/Timer'
import { Navbar, Nav, Icon, Dropdown } from 'rsuite';
import './App.css';
import 'rsuite/dist/styles/rsuite-dark.css';
import { OpenSeaPort, Network } from 'opensea-js';

// import { web3Provider } from './constants';

class App extends React.Component {

  async componentWillMount() {
    this.loadWeb3()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0){
          if (this.state.authenticated) {
            console.log('switched accounts')
          } 
          this.setState({accountAddress: accounts[0]})
          this.setState({authenticated: true})
          console.log(accounts[0])
        } else {
          this.setState({account: null})
          this.setState({authenticated: false})
          console.log('disconnected all accounts')
        }
      })
      // window.ethereum.on('chainChanged', (chainId) => {
      //   if (chainId){
      //     if (chainId == 4) {
      //       this.postNotification("Connected to Rinkeby ⚡", "Interfacing with the Rinkeby Test Net", "success", 5500)
      //     } else {
      //       this.postNotification("Disconnected from Rinkeby ⚡", "Please use the Rinkeby Test Net", "danger", 5500)
      //     }
      //     this.setState({networkId: chainId})
      //   }
      // })
      window.web3 = new Web3(window.ethereum)
      const accounts = await window.web3.eth.getAccounts()
      if (accounts.length !== 0) {
        this.setState({accountAddress: accounts[0]})
        this.setState({authenticated: true})
      }
    }
    
    const seaport = new OpenSeaPort(window.ethereum, {
      networkName: Network.Main
    })
    const asset = await seaport.api.getAsset({
      tokenAddress: "0x12f28e2106ce8fd8464885b80ea865e98b465149",
      tokenId: 100030016
    })
    console.log(asset)
  }

  constructor(props) {
    super(props);
    this.state = {
      accountAddress: null,
      seaport: null,
      authenticated: false
    }
    this.loadWeb3 = this.loadWeb3.bind(this)
  }
  
  async connectWallet() {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    .then(() => {
      this.setState({authenticated: true})
      this.loadWeb3()
    })
    .catch((error) => {
      console.log('d', error.code)
      if (error.code === -32002) {                // Request of type 'wallet_requestPermissions' already pending
        console.log(error)
      }
    })
  }

  render(){
  return (
      <div className="App">
        <Navbar appearance={'subtle'}>
          <Navbar.Header>
            <a href='/' className="navbar-brand"><h3><span role="img" aria-label="CBW">🐋</span></h3></a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
              <Nav.Item>Getting Started</Nav.Item>
              <Nav.Item>NFT Auction</Nav.Item>
              <Dropdown title="Social Media">
                <Dropdown.Item>Twitter</Dropdown.Item>
                <Dropdown.Item>FaceBook</Dropdown.Item>
                <Dropdown.Item>LinkedIn</Dropdown.Item>
              </Dropdown>
            </Nav>
            <Nav pullRight>
              { this.state.authenticated ?
                  <Nav.Item icon={<Icon icon="" />}><span role='img' aria-labelledby='...'>🌿</span>  &nbsp;Wallet Connected</Nav.Item>
                : <Nav.Item icon={<Icon icon="codepen" />} onClick={() => {
                  this.connectWallet()
                }} > Connect Wallet</Nav.Item>
              }
            </Nav>
          </Navbar.Body>
        </Navbar>
        <header className="App-header">
          <br />
          <Typist
            sentences={[
              '100% of proceeds will go to vulnerable communities in Africa! 🌍',
              'Welcome to CryptosBiggestWhale.com 🐋']}
            loop={!true}
            typingSpeed={15}
            deletingSpeed={13}
            cursorColor='rgb(35, 104, 161)'
            cursorBlinkSpeed='500'
            pauseTime={2400}
          />
          <Timer key={'April 30, 2021'} eventName={'Auction End'} eventDate={'April 30, 2021'} />
          <br />
          <div className="nftBorder">
            <nft-card contractAddress="0x12f28e2106ce8fd8464885b80ea865e98b465149" tokenId="100030016"> </nft-card>
          </div>
        </header>
      </div>
    );
  }

}

export default App;
