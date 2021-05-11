import React, { Component } from 'react';
import { Button, Loader } from 'rsuite';

class WhaleTokensPage extends Component {

    // constructor(props) {
    //     super(props);
    // }

    async postRequest() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.props.person)
        };
        const respd = await fetch('/payload', requestOptions);
        const datas = await respd.json();
        console.log(datas)
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <br />
                    {
                        this.props.loading || !this.props.person ? (
                            <div><Loader size="lg" content="Loading..." /></div>
                        ) : (
                            <div>
                                <div>{this.props.person.name.title}</div>
                                <div>{this.props.person.name.first}</div>
                                <div>{this.props.person.name.last}</div>
                                <br />
                                <img alt='...' src={this.props.person.picture.large}/>
                                <br />
                                <Button  appearance={'ghost'} color={'cyan'} onClick={() => this.postRequest()}>Send to Backend</Button>                        
                            </div>
                        )
                    }
                </header>
            </div>
        );
    }
}

export default WhaleTokensPage;