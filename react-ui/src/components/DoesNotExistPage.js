import React, { Component } from 'react';

class DoesNotExistPage extends Component {

  render() {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>

            <div className="container">
              <h3>Ooopse ~ <span aria-label=':(' role="img">😏</span></h3>
              <h5>Sorry, this page does not exist...</h5>
              <br></br>
              <br></br>
            </div>
        </div>
    );
  }
}

export default DoesNotExistPage;