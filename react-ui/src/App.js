import React, { Component }  from 'react';
import Web3 from 'web3';
import { Switch, Route } from 'react-router-dom';
import {Navbar, Nav, Icon, Dropdown} from 'rsuite';

import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import WhaleTokensPage from './components/WhaleTokensPage';
import DoesNotExistPage from './components/DoesNotExistPage';

// heyy
class App extends Component {

  async componentWillMount() {
    this.loadWeb3()
  }

  async componentDidMount() {
    const url = "https://api.randomuser.me/";
    const resp = await fetch(url);
    const data = await resp.json();
    this.setState({person: data.results[0], loading: false})
    console.log(this.state.person)
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

      window.web3 = new Web3(window.ethereum)
      const accounts = await window.web3.eth.getAccounts()
      if (accounts.length !== 0) {
        this.setState({accountAddress: accounts[0]})
        this.setState({authenticated: true})
      }
    
    }  
  }

  constructor(props) {
    super(props);
    this.state = {
      accountAddress: null,
      seaport: null,
      authenticated: false,
      loading: true,
      person: null
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
              <Nav.Item href="/" icon={<Icon icon="home" />} >Home</Nav.Item>
              <Nav.Item href="/videos" >Videos</Nav.Item>
              <Nav.Item href="/whale-tokens" >WhaleTokens</Nav.Item>
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
            
        <Switch>
          <Route exact path={'/'} component={() =>  <HomePage/>} />
          <Route path='/videos' component={() => <CatalogPage/>} />
          <Route path='/whale-tokens' component={() => <WhaleTokensPage person={this.state.person} loading={this.state.loading}/>} />
          <Route path='/*' component={() => <DoesNotExistPage />} />
        </Switch>
      
      </div>
    );
  }

}

export default App;
