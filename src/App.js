import React, { Component, PropTypes } from 'react';
import './App.css';
import { ProgressBar, ButtonToolbar, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    const response = await fetch('/api/test');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('server response = ', body);
  };

  render() {
    return (
      <div className="App">
        <header>
          <p className="title">Devis</p>
        </header>

        <body>
          <div className="container">
            <h>Overall Code Rating</h>
            <ProgressBar now={60} />
            <br></br>
            <ButtonToolbar>
              <Button onClick={this.handleClick} variant="primary">
                Analyze Complexity
              </Button>
            </ButtonToolbar>
            <br></br>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
