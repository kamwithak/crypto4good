import React from 'react';
import Typist from 'react-text-typist';
import { Navbar, Nav, Icon, Dropdown } from 'rsuite';
import './App.css';
import 'rsuite/dist/styles/rsuite-dark.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  componentDidMount() {
    this.getTimeDifference(this.props.eventDate);
    setInterval(() => this.getTimeDifference(this.props.eventDate), 1000);
  }

  leadingZero(num) {
    return (num < 10 && num > 0) ? "0" + num : num;
  }

  getTimeDifference(eventDate) {
    const time = Date.parse(eventDate) - Date.parse(new Date());
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    this.setState({ days, hours, minutes, seconds });
  }

  render() {
    return (
      <div>
        <br />
        🎉
        <div className="clock">
        {this.leadingZero(this.state.days)} {this.state.days === 1 ? 'Day' : 'Days'}
        </div>
        <div className="clock">
          {this.leadingZero(this.state.hours)} {this.state.hours === 1 ? 'Hour' : 'Hours'}
        </div>
        <div className="clock">
          {this.leadingZero(this.state.minutes)} {this.state.minutes === 1 ? 'Minute' : 'Minutes'}
        </div>
        <div className="clock">
          {this.leadingZero(this.state.seconds)} {this.state.seconds === 1 ? 'Second' : 'Seconds'}
        </div>
        🎉
      </div>
    );
  }
}

function App() {
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
            <Nav.Item icon={<Icon icon="cog" />} ></Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
      <header className="App-header">
        <br />
        <Typist
          sentences={[
            'Interested in making a donation? 💸',
            '100% of proceeds go to the Red-Cross Organization! 🎗️',
            'Welcome to CryptosBiggestWhale.com 🐋']}
          loop={!true}
          typingSpeed={25}
          deletingSpeed={25}
          cursorColor='rgb(35, 104, 161)'
          cursorBlinkSpeed='500'
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

export default App;
