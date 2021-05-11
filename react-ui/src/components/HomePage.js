import React, { Component } from 'react';
import Typist from 'react-text-typist';
import Timer from './Timer';

class HomePage extends Component {

  render() {
    return (
        <div>
            <header className="App-header">
                <br />
                <Typist
                    sentences={[
                    'Built by enthusiasts, for professionals...',
                    'The Crypto Renaissance 🐋']}
                    loop={!true}
                    typingSpeed={15}
                    deletingSpeed={13}
                    cursorColor='rgb(35, 104, 161)'
                    cursorBlinkSpeed='500'
                    pauseTime={2400}
                />
                <Timer key={'May 30, 2021'} eventName={'Auction End'} eventDate={'May 30, 2021'} />
                <br />
                <div className="nftBorder">
                    <nft-card contractAddress="0x12f28e2106ce8fd8464885b80ea865e98b465149" tokenId="100030016"> </nft-card>
                </div>
            </header>
        </div>
    );
  }
}

export default HomePage;